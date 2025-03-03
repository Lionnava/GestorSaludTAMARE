import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, ChevronDown, Plus, Minus } from 'lucide-react-native';

type MedicationTransactionProps = {
  onClose: () => void;
  onSave: (transaction: any) => void;
  medications: any[];
  transactionType: 'entry' | 'exit';
};

export default function MedicationTransaction({ 
  onClose, 
  onSave, 
  medications, 
  transactionType 
}: MedicationTransactionProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    notes: '',
    items: [{ medicationId: '', quantity: '1', reason: '' }],
  });

  const [showMedicationDropdowns, setShowMedicationDropdowns] = useState<boolean[]>([false]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const toggleMedicationDropdown = (index: number) => {
    const newDropdowns = [...showMedicationDropdowns];
    newDropdowns[index] = !newDropdowns[index];
    setShowMedicationDropdowns(newDropdowns);
  };

  const selectMedication = (index: number, medicationId: string) => {
    handleItemChange(index, 'medicationId', medicationId);
    const newDropdowns = [...showMedicationDropdowns];
    newDropdowns[index] = false;
    setShowMedicationDropdowns(newDropdowns);
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { medicationId: '', quantity: '1', reason: '' }],
    }));
    setShowMedicationDropdowns([...showMedicationDropdowns, false]);
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const newItems = [...formData.items];
      newItems.splice(index, 1);
      setFormData(prev => ({ ...prev, items: newItems }));

      const newDropdowns = [...showMedicationDropdowns];
      newDropdowns.splice(index, 1);
      setShowMedicationDropdowns(newDropdowns);
    }
  };

  const handleSubmit = () => {
    onSave({
      ...formData,
      type: transactionType,
      items: formData.items.map(item => ({
        ...item,
        quantity: parseInt(item.quantity, 10),
      })),
    });
  };

  const getMedicationNameById = (id: string) => {
    const medication = medications.find(med => med.id === id);
    return medication ? medication.name : 'Seleccionar medicamento';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {transactionType === 'entry' ? 'Entrada de Medicamentos' : 'Salida de Medicamentos'}
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha</Text>
          <TextInput
            style={styles.input}
            value={formData.date}
            onChangeText={(value) => handleChange('date', value)}
            placeholder="DD/MM/AAAA"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Medicamentos</Text>
        </View>

        {formData.items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>Medicamento {index + 1}</Text>
              {formData.items.length > 1 && (
                <TouchableOpacity 
                  style={styles.removeButton} 
                  onPress={() => removeItem(index)}
                >
                  <Minus size={16} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Medicamento</Text>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => toggleMedicationDropdown(index)}
              >
                <Text style={styles.dropdownButtonText}>
                  {item.medicationId ? getMedicationNameById(item.medicationId) : 'Seleccionar medicamento'}
                </Text>
                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>
              
              {showMedicationDropdowns[index] && (
                <View style={styles.dropdown}>
                  <ScrollView style={{ maxHeight: 200 }}>
                    {medications.map(medication => (
                      <TouchableOpacity 
                        key={medication.id}
                        style={styles.dropdownItem}
                        onPress={() => selectMedication(index, medication.id)}
                      >
                        <Text style={styles.dropdownItemText}>{medication.name}</Text>
                        <Text style={styles.dropdownItemSubtext}>
                          Stock: {medication.stock} {medication.unit}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Cantidad</Text>
                <TextInput
                  style={styles.input}
                  value={item.quantity}
                  onChangeText={(value) => handleItemChange(index, 'quantity', value)}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Motivo</Text>
              <TextInput
                style={styles.input}
                value={item.reason}
                onChangeText={(value) => handleItemChange(index, 'reason', value)}
                placeholder={transactionType === 'entry' ? "Compra, donación, etc." : "Prescripción, vencimiento, etc."}
              />
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
          <Plus size={16} color="#FFFFFF" />
          <Text style={styles.addItemText}>Agregar Medicamento</Text>
        </TouchableOpacity>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notas Adicionales</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.notes}
            onChangeText={(value) => handleChange('notes', value)}
            placeholder="Notas sobre la transacción"
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
    justifyContent: 'space-between',
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
  sectionHeader: {
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  itemContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077B6',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  addItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: 8,
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