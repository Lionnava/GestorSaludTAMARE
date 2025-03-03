import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, ChevronDown } from 'lucide-react-native';

type DoctorFormProps = {
  onClose: () => void;
  onSave: (doctor: any) => void;
  doctor?: any;
};

// Mock data for specialties
const SPECIALTIES = [
  'Medicina General',
  'Pediatría',
  'Cardiología',
  'Dermatología',
  'Ginecología',
  'Neurología',
  'Oftalmología',
  'Ortopedia',
  'Psiquiatría',
  'Urología',
  'Otra',
];

export default function DoctorForm({ onClose, onSave, doctor }: DoctorFormProps) {
  const [formData, setFormData] = useState({
    name: doctor?.name || '',
    specialty: doctor?.specialty || SPECIALTIES[0],
    licenseNumber: doctor?.licenseNumber || '',
    phone: doctor?.phone || '',
    email: doctor?.email || '',
    address: doctor?.address || '',
    schedule: doctor?.schedule || '',
    notes: doctor?.notes || '',
  });

  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialty,
    }));
    setShowSpecialtyDropdown(false);
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{doctor ? 'Editar Médico' : 'Nuevo Médico'}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
            placeholder="Nombre y apellidos"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Especialidad</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowSpecialtyDropdown(!showSpecialtyDropdown)}
          >
            <Text style={styles.dropdownButtonText}>{formData.specialty}</Text>
            <ChevronDown size={20} color="#64748B" />
          </TouchableOpacity>
          
          {showSpecialtyDropdown && (
            <View style={styles.dropdown}>
              <ScrollView style={{ maxHeight: 200 }}>
                {SPECIALTIES.map(specialty => (
                  <TouchableOpacity 
                    key={specialty}
                    style={styles.dropdownItem}
                    onPress={() => selectSpecialty(specialty)}
                  >
                    <Text style={styles.dropdownItemText}>{specialty}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Número de Licencia</Text>
          <TextInput
            style={styles.input}
            value={formData.licenseNumber}
            onChangeText={(value) => handleChange('licenseNumber', value)}
            placeholder="Número de licencia médica"
          />
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleChange('phone', value)}
              placeholder="Número de teléfono"
              keyboardType="phone-pad"
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.input}
            value={formData.address}
            onChangeText={(value) => handleChange('address', value)}
            placeholder="Dirección completa"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Horario de Atención</Text>
          <TextInput
            style={styles.input}
            value={formData.schedule}
            onChangeText={(value) => handleChange('schedule', value)}
            placeholder="Ej: Lunes a Viernes 8:00 - 16:00"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notas Adicionales</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.notes}
            onChangeText={(value) => handleChange('notes', value)}
            placeholder="Información adicional"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
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