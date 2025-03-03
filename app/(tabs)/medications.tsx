import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Filter, CircleAlert as AlertCircle } from 'lucide-react-native';

// Mock data for medications
const MOCK_MEDICATIONS = [
  { id: '1', name: 'Paracetamol', category: 'Analgésico', stock: 120, unit: 'tabletas', expiry: '12/2024', critical: false },
  { id: '2', name: 'Amoxicilina', category: 'Antibiótico', stock: 45, unit: 'cápsulas', expiry: '06/2024', critical: false },
  { id: '3', name: 'Ibuprofeno', category: 'Antiinflamatorio', stock: 80, unit: 'tabletas', expiry: '09/2024', critical: false },
  { id: '4', name: 'Loratadina', category: 'Antihistamínico', stock: 30, unit: 'tabletas', expiry: '11/2023', critical: false },
  { id: '5', name: 'Omeprazol', category: 'Antiácido', stock: 15, unit: 'cápsulas', expiry: '08/2024', critical: true },
  { id: '6', name: 'Metformina', category: 'Antidiabético', stock: 60, unit: 'tabletas', expiry: '10/2024', critical: false },
  { id: '7', name: 'Enalapril', category: 'Antihipertensivo', stock: 10, unit: 'tabletas', expiry: '07/2024', critical: true },
  { id: '8', name: 'Salbutamol', category: 'Broncodilatador', stock: 5, unit: 'inhaladores', expiry: '05/2024', critical: true },
];

export default function MedicationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMedications, setFilteredMedications] = useState(MOCK_MEDICATIONS);
  const [activeTab, setActiveTab] = useState('all');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    filterMedications(text, activeTab);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    filterMedications(searchQuery, tab);
  };

  const filterMedications = (query: string, tab: string) => {
    let filtered = MOCK_MEDICATIONS;
    
    // Apply search filter
    if (query) {
      filtered = filtered.filter(
        med => med.name.toLowerCase().includes(query.toLowerCase()) ||
               med.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (tab === 'critical') {
      filtered = filtered.filter(med => med.critical);
    } else if (tab === 'expiring') {
      // Assuming expiring means within 3 months
      const currentDate = new Date();
      const threeMonthsLater = new Date();
      threeMonthsLater.setMonth(currentDate.getMonth() + 3);
      
      filtered = filtered.filter(med => {
        const [month, year] = med.expiry.split('/');
        const expiryDate = new Date(parseInt(year), parseInt(month) - 1);
        return expiryDate <= threeMonthsLater;
      });
    }
    
    setFilteredMedications(filtered);
  };

  const renderMedicationItem = ({ item }: { item: typeof MOCK_MEDICATIONS[0] }) => (
    <TouchableOpacity style={styles.medicationCard}>
      <View style={styles.medicationHeader}>
        <Text style={styles.medicationName}>{item.name}</Text>
        {item.critical && <AlertCircle size={16} color="#EF4444" />}
      </View>
      <Text style={styles.medicationCategory}>{item.category}</Text>
      <View style={styles.medicationDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Stock:</Text>
          <Text style={[
            styles.detailValue, 
            item.stock <= 15 ? styles.criticalStock : null
          ]}>
            {item.stock} {item.unit}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Vencimiento:</Text>
          <Text style={styles.detailValue}>{item.expiry}</Text>
        </View>
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
            placeholder="Buscar medicamento..."
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
          <Text style={styles.statNumber}>{MOCK_MEDICATIONS.length}</Text>
          <Text style={styles.statLabel}>Total Medicamentos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Stock Crítico</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Por Vencer</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' ? styles.activeTab : null]}
          onPress={() => handleTabChange('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' ? styles.activeTabText : null]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'critical' ? styles.activeTab : null]}
          onPress={() => handleTabChange('critical')}
        >
          <Text style={[styles.tabText, activeTab === 'critical' ? styles.activeTabText : null]}>Stock Crítico</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'expiring' ? styles.activeTab : null]}
          onPress={() => handleTabChange('expiring')}
        >
          <Text style={[styles.tabText, activeTab === 'expiring' ? styles.activeTabText : null]}>Por Vencer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Inventario de Medicamentos</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMedications}
        renderItem={renderMedicationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.medicationsList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
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
  medicationsList: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  medicationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    width: '46%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
  },
  medicationCategory: {
    fontSize: 14,
    color: '#0077B6',
    marginBottom: 8,
  },
  medicationDetails: {
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E293B',
  },
  criticalStock: {
    color: '#EF4444',
  },
});