import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, ChevronRight, Filter } from 'lucide-react-native';

// Mock data for patients
const MOCK_PATIENTS = [
  { id: '1', name: 'María González', age: 45, gender: 'F', lastVisit: '15/05/2023', condition: 'Hipertensión' },
  { id: '2', name: 'Carlos Rodríguez', age: 32, gender: 'M', lastVisit: '22/06/2023', condition: 'Diabetes Tipo 2' },
  { id: '3', name: 'Ana Martínez', age: 28, gender: 'F', lastVisit: '10/07/2023', condition: 'Asma' },
  { id: '4', name: 'Luis Hernández', age: 56, gender: 'M', lastVisit: '05/08/2023', condition: 'Artritis' },
  { id: '5', name: 'Elena Díaz', age: 39, gender: 'F', lastVisit: '18/08/2023', condition: 'Migraña' },
  { id: '6', name: 'Roberto Sánchez', age: 42, gender: 'M', lastVisit: '01/09/2023', condition: 'Colesterol Alto' },
  { id: '7', name: 'Carmen López', age: 51, gender: 'F', lastVisit: '12/09/2023', condition: 'Hipotiroidismo' },
  { id: '8', name: 'Javier Torres', age: 35, gender: 'M', lastVisit: '25/09/2023', condition: 'Gastritis' },
];

export default function PatientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(MOCK_PATIENTS);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = MOCK_PATIENTS.filter(
        patient => patient.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(MOCK_PATIENTS);
    }
  };

  const renderPatientItem = ({ item }: { item: typeof MOCK_PATIENTS[0] }) => (
    <TouchableOpacity style={styles.patientCard}>
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.name}</Text>
        <View style={styles.patientDetails}>
          <Text style={styles.patientDetail}>{item.age} años</Text>
          <Text style={styles.patientDetail}>•</Text>
          <Text style={styles.patientDetail}>{item.gender === 'M' ? 'Masculino' : 'Femenino'}</Text>
        </View>
        <Text style={styles.patientCondition}>{item.condition}</Text>
        <Text style={styles.patientLastVisit}>Última visita: {item.lastVisit}</Text>
      </View>
      <ChevronRight size={20} color="#64748B" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar paciente..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{MOCK_PATIENTS.length}</Text>
          <Text style={styles.statLabel}>Total Pacientes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Nuevos (Mes)</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Citas Pendientes</Text>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Lista de Pacientes</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Nuevo Paciente</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPatients}
        renderItem={renderPatientItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.patientsList}
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
  filterButton: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0077B6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  patientsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  patientDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  patientDetail: {
    fontSize: 14,
    color: '#64748B',
    marginRight: 8,
  },
  patientCondition: {
    fontSize: 14,
    color: '#0077B6',
    fontWeight: '500',
    marginBottom: 4,
  },
  patientLastVisit: {
    fontSize: 12,
    color: '#94A3B8',
  },
});