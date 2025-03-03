import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Calendar, Pill, FileText, Activity, User } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }} 
            style={styles.headerImage} 
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>Gestor de Salud Comunal TAMARE</Text>
            <Text style={styles.subtitle}>Sistema de Administración Médica</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Activity size={24} color="#0077B6" />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Citas Hoy</Text>
          </View>
          <View style={styles.statCard}>
            <User size={24} color="#0077B6" />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Médicos</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={24} color="#0077B6" />
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Pacientes</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Acceso Rápido</Text>
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity style={styles.quickAccessCard}>
            <Users size={32} color="#0077B6" />
            <Text style={styles.quickAccessText}>Pacientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessCard}>
            <Calendar size={32} color="#0077B6" />
            <Text style={styles.quickAccessText}>Citas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessCard}>
            <Pill size={32} color="#0077B6" />
            <Text style={styles.quickAccessText}>Medicamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessCard}>
            <FileText size={32} color="#0077B6" />
            <Text style={styles.quickAccessText}>Reportes</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Próximas Citas</Text>
        <View style={styles.appointmentsList}>
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentTime}>
              <Text style={styles.appointmentHour}>09:00</Text>
              <Text style={styles.appointmentDate}>Hoy</Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.patientName}>María González</Text>
              <Text style={styles.appointmentType}>Consulta General</Text>
              <Text style={styles.doctorName}>Dr. Juan Pérez</Text>
            </View>
          </View>
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentTime}>
              <Text style={styles.appointmentHour}>10:30</Text>
              <Text style={styles.appointmentDate}>Hoy</Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.patientName}>Carlos Rodríguez</Text>
              <Text style={styles.appointmentType}>Control Mensual</Text>
              <Text style={styles.doctorName}>Dra. Ana Martínez</Text>
            </View>
          </View>
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentTime}>
              <Text style={styles.appointmentHour}>14:15</Text>
              <Text style={styles.appointmentDate}>Hoy</Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.patientName}>Luis Hernández</Text>
              <Text style={styles.appointmentType}>Seguimiento</Text>
              <Text style={styles.doctorName}>Dr. Roberto Díaz</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 119, 182, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  quickAccessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '46%',
    marginHorizontal: '2%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginTop: 8,
  },
  appointmentsList: {
    paddingHorizontal: 16,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentTime: {
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    width: 70,
  },
  appointmentHour: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077B6',
  },
  appointmentDate: {
    fontSize: 12,
    color: '#0077B6',
  },
  appointmentDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  appointmentType: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 14,
    color: '#0077B6',
    fontWeight: '500',
  },
});