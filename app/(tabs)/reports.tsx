import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Download, Printer, Share2, ChartBar as BarChart, ChartPie as PieChart, Calendar, Users, Pill } from 'lucide-react-native';

export default function ReportsScreen() {
  const [activeTab, setActiveTab] = useState('patients');

  const renderReportCard = (title: string, description: string, icon: JSX.Element, date: string) => (
    <TouchableOpacity style={styles.reportCard}>
      <View style={styles.reportIconContainer}>
        {icon}
      </View>
      <View style={styles.reportInfo}>
        <Text style={styles.reportTitle}>{title}</Text>
        <Text style={styles.reportDescription}>{description}</Text>
        <Text style={styles.reportDate}>{date}</Text>
      </View>
      <View style={styles.reportActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Download size={16} color="#0077B6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Printer size={16} color="#0077B6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={16} color="#0077B6" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderPatientReports = () => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Reportes de Pacientes</Text>
      </View>
      {renderReportCard(
        'Registro de Pacientes',
        'Lista completa de pacientes registrados en el sistema',
        <Users size={24} color="#0077B6" />,
        'Actualizado: Hoy'
      )}
      {renderReportCard(
        'Pacientes por Condición',
        'Distribución de pacientes según condición médica',
        <PieChart size={24} color="#0077B6" />,
        'Actualizado: Ayer'
      )}
      {renderReportCard(
        'Nuevos Pacientes',
        'Pacientes registrados en el último mes',
        <BarChart size={24} color="#0077B6" />,
        'Actualizado: 15/10/2023'
      )}
    </View>
  );

  const renderAppointmentReports = () => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Reportes de Citas</Text>
      </View>
      {renderReportCard(
        'Citas por Médico',
        'Distribución de citas por médico y especialidad',
        <Calendar size={24} color="#0077B6" />,
        'Actualizado: Hoy'
      )}
      {renderReportCard(
        'Citas Mensuales',
        'Estadísticas de citas del mes actual',
        <BarChart size={24} color="#0077B6" />,
        'Actualizado: Ayer'
      )}
      {renderReportCard(
        'Citas Canceladas',
        'Análisis de citas canceladas y motivos',
        <PieChart size={24} color="#0077B6" />,
        'Actualizado: 18/10/2023'
      )}
    </View>
  );

  const renderMedicationReports = () => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Reportes de Medicamentos</Text>
      </View>
      {renderReportCard(
        'Inventario Actual',
        'Estado actual del inventario de medicamentos',
        <Pill size={24} color="#0077B6" />,
        'Actualizado: Hoy'
      )}
      {renderReportCard(
        'Medicamentos por Vencer',
        'Lista de medicamentos próximos a vencer',
        <FileText size={24} color="#0077B6" />,
        'Actualizado: Ayer'
      )}
      {renderReportCard(
        'Consumo Mensual',
        'Estadísticas de consumo de medicamentos',
        <BarChart size={24} color="#0077B6" />,
        'Actualizado: 16/10/2023'
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Generación de Reportes</Text>
        <TouchableOpacity style={styles.newReportButton}>
          <FileText size={16} color="#FFFFFF" />
          <Text style={styles.newReportText}>Nuevo Reporte</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'patients' ? styles.activeTab : null]}
          onPress={() => setActiveTab('patients')}
        >
          <Text style={[styles.tabText, activeTab === 'patients' ? styles.activeTabText : null]}>Pacientes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'appointments' ? styles.activeTab : null]}
          onPress={() => setActiveTab('appointments')}
        >
          <Text style={[styles.tabText, activeTab === 'appointments' ? styles.activeTabText : null]}>Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'medications' ? styles.activeTab : null]}
          onPress={() => setActiveTab('medications')}
        >
          <Text style={[styles.tabText, activeTab === 'medications' ? styles.activeTabText : null]}>Medicamentos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'patients' && renderPatientReports()}
        {activeTab === 'appointments' && renderAppointmentReports()}
        {activeTab === 'medications' && renderMedicationReports()}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  newReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0077B6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newReportText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#0077B6',
  },
  tabText: {
    fontSize: 14,
    color: '#64748B',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reportIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportInfo: {
    marginBottom: 16,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  reportDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});