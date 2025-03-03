import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Clock, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react-native';

// Mock data for appointments
const MOCK_APPOINTMENTS = [
  { id: '1', time: '09:00', patient: 'María González', doctor: 'Dr. Juan Pérez', type: 'Consulta General', status: 'confirmed' },
  { id: '2', time: '10:30', patient: 'Carlos Rodríguez', doctor: 'Dra. Ana Martínez', type: 'Control Mensual', status: 'confirmed' },
  { id: '3', time: '11:45', patient: 'Elena Díaz', doctor: 'Dr. Roberto Díaz', type: 'Primera Consulta', status: 'pending' },
  { id: '4', time: '14:15', patient: 'Luis Hernández', doctor: 'Dr. Roberto Díaz', type: 'Seguimiento', status: 'confirmed' },
  { id: '5', time: '15:30', patient: 'Carmen López', doctor: 'Dra. Ana Martínez', type: 'Consulta General', status: 'confirmed' },
  { id: '6', time: '16:45', patient: 'Javier Torres', doctor: 'Dr. Juan Pérez', type: 'Control Mensual', status: 'cancelled' },
];

export default function AppointmentsScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState(MOCK_APPOINTMENTS);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = MOCK_APPOINTMENTS.filter(
        appointment => 
          appointment.patient.toLowerCase().includes(text.toLowerCase()) ||
          appointment.doctor.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAppointments(filtered);
    } else {
      setFilteredAppointments(MOCK_APPOINTMENTS);
    }
  };

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      default: return '#64748B';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      default: return 'Desconocido';
    }
  };

  const renderAppointmentItem = ({ item }: { item: typeof MOCK_APPOINTMENTS[0] }) => (
    <TouchableOpacity style={styles.appointmentCard}>
      <View style={styles.timeContainer}>
        <Clock size={16} color="#0077B6" />
        <Text style={styles.appointmentTime}>{item.time}</Text>
      </View>
      <View style={styles.appointmentInfo}>
        <Text style={styles.patientName}>{item.patient}</Text>
        <Text style={styles.doctorName}>{item.doctor}</Text>
        <Text style={styles.appointmentType}>{item.type}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
          {getStatusText(item.status)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cita..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={handlePrevDay} style={styles.calendarNavButton}>
          <ChevronLeft size={24} color="#0077B6" />
        </TouchableOpacity>
        <View style={styles.dateContainer}>
          <CalendarIcon size={20} color="#0077B6" style={styles.calendarIcon} />
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </View>
        <TouchableOpacity onPress={handleNextDay} style={styles.calendarNavButton}>
          <ChevronRight size={24} color="#0077B6" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{MOCK_APPOINTMENTS.length}</Text>
          <Text style={styles.statLabel}>Total Citas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Confirmadas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Canceladas</Text>
        </View>
      </View>

      <FlatList
        data={filteredAppointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.appointmentsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#1E293B',
  },
  addButton: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#0077B6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  calendarNavButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  appointmentsList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    width: 60,
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0077B6',
    marginLeft: 4,
  },
  appointmentInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  doctorName: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  appointmentType: {
    fontSize: 12,
    color: '#94A3B8',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
});