import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Calendar, Clock, ChevronDown } from 'lucide-react-native';

type AppointmentFormProps = {
  onClose: () => void;
  onSave: (appointment: any) => void;
  appointment?: any;
};

// Mock data for doctors
const MOCK_DOCTORS = [
  { id: '1', name: 'Dr. Juan Pérez', specialty: 'Medicina General' },
  { id: '2', name: 'Dra. Ana Martínez', specialty: 'Pediatría' },
  { id: '3', name: 'Dr. Roberto Díaz', specialty: 'Cardiología' },
];

// Mock data for appointment types
const APPOINTMENT_TYPES = [
  'Consulta General',
  'Control Mensual',
  'Primera Consulta',
  'Seguimiento',
  'Emergencia',
];

export default function AppointmentForm({ onClose, onSave, appointment }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientName: appointment?.patientName || '',
    patientId: appointment?.patientId || '',
    doctorId: appointment?.doctorId || '1',
    doctorName: appointment?.doctorName || MOCK_DOCTORS[0].name,
    date: appointment?.date || new Date().toISOString().split('T')[0],
    time: appointment?.time || '09:00',
    type: appointment?.type || APPOINTMENT_TYPES[0],
    notes: appointment?.notes || '',
    status: appointment?.status || 'pending',
  });

  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectDoctor = (doctor: typeof MOCK_DOCTORS[0]) => {
    setFormData(prev => ({
      ...prev,
      doctorId: doctor.id,
      doctorName: doctor.name,
    }));
    setShowDoctorDropdown(false);
  };

  const selectType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      type,
    }));
    setShowTypeDropdown(false);
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{appointment ? 'Editar Cita' : 'Nueva Cita'}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre del Paciente</Text>
          <TextInput
            style={styles.input}
            value={formData.patientName}
            onChangeText={(value) => handleChange('patientName', value)}
            placeholder="Nombre completo del paciente"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>ID del Paciente</Text>
          <TextInput
            style={styles.input}
            value={formData.patientId}
            onChangeText={(value) => handleChange('patientId', value)}
            placeholder="Número de identificación"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Médico</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowDoctorDropdown(!showDoctorDropdown)}
          >
            <Text style={styles.dropdownButtonText}>{formData.doctorName}</Text>
            <ChevronDown size={20} color="#64748B" />
          </TouchableOpacity>
          
          {showDoctorDropdown && (
            <View style={styles.dropdown}>
              {MOCK_DOCTORS.map(doctor => (
                <TouchableOpacity 
                  key={doctor.id}
                  style={styles.dropdownItem}
                  onPress={() => selectDoctor(doctor)}
                >
                  <Text style={styles.dropdownItemText}>{doctor.name}</Text>
                  <Text style={styles.dropdownItemSubtext}>{doctor.specialty}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Fecha</Text>
            <View style={styles.dateTimeInput}>
              <Calendar size={20} color="#64748B" style={styles.dateTimeIcon} />
              <TextInput
                style={styles.dateTimeText}
                value={formData.date}
                onChangeText={(value) => handleChange('date', value)}
                placeholder="DD/MM/AAAA"
              />
            </View>
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Hora</Text>
            <View style={styles.dateTimeInput}>
              <Clock size={20} color="#64748B" style={styles.dateTimeIcon} />
              <TextInput
                style={styles.dateTimeText}
                value={formData.time}
                onChangeText={(value) => handleChange('time', value)}
                placeholder="HH:MM"
              />
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo de Cita</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowTypeDropdown(!showTypeDropdown)}
          >
            <Text style={styles.dropdownButtonText}>{formData.type}</Text>
            <ChevronDown size={20} color="#64748B" />
          </TouchableOpacity>
          
          {showTypeDropdown && (
            <View style={styles.dropdown}>
              {APPOINTMENT_TYPES.map(type => (
                <TouchableOpacity 
                  key={type}
                  style={styles.dropdownItem}
                  onPress={() => selectType(type)}
                >
                  <Text style={styles.dropdownItemText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notas</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.notes}
            onChangeText={(value) => handleChange('notes', value)}
            placeholder="Notas adicionales sobre la cita"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Estado</Text>
          <View style={styles.statusContainer}>
            <TouchableOpacity
              style={[
                styles.statusOption,
                formData.status === 'pending' && styles.statusOptionSelected,
                { backgroundColor: formData.status === 'pending' ? '#F59E0B20' : '#F8FAFC' },
                { borderColor: formData.status === 'pending' ? '#F59E0B' : '#E2E8F0' },
              ]}
              onPress={() => handleChange('status', 'pending')}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: formData.status === 'pending' ? '#F59E0B' : '#64748B' },
                ]}
              >
                Pendiente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusOption,
                formData.status === 'confirmed' && styles.statusOptionSelected,
                { backgroundColor: formData.status === 'confirmed' ? '#10B98120' : '#F8FAFC' },
                { borderColor: formData.status === 'confirmed' ? '#10B981' : '#E2E8F0' },
              ]}
              onPress={() => handleChange('status', 'confirmed')}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: formData.status === 'confirmed' ? '#10B981' : '#64748B' },
                ]}
              >
                Confirmada
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusOption,
                formData.status === 'cancelled' && styles.statusOptionSelected,
                { backgroundColor: formData.status === 'cancelled' ? '#EF444420' : '#F8FAFC' },
                { borderColor: formData.status === 'cancelled' ? '#EF4444' : '#E2E8F0' },
              ]}
              onPress={() => handleChange('status', 'cancelled')}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: formData.status === 'cancelled' ? '#EF4444' : '#64748B' },
                ]}
              >
                Cancelada
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1E293B',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateTimeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateTimeIcon: {
    marginRight: 8,
  },
  dateTimeText: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#1E293B',
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1E293B',
  },
  dropdownItemSubtext: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  statusOptionSelected: {
    borderWidth: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#0077B6',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});