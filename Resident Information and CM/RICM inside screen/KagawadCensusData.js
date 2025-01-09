import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const KagawadCensusData = () => {
  const navigation = useNavigation();

  const [residentsData, setResidentsData] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', middleName: 'A', suffix: 'Jr.', age: '60', purok: 'Purok 1', barangay: 'Barangay 1', sex: 'Male', contactNumber: '0965874126852', isHouseholdHead: 'No', householdHeadName: 'Jay Doe', relationship: 'Son', householdNumber: '2024-25698', lmp: null },
    { id: 2, firstName: 'Jane', lastName: 'Smith', middleName: '', suffix: '', age: '20', purok: 'Purok 2', barangay: 'Barangay 2', sex: 'Female', contactNumber: '0965874126984', isHouseholdHead: 'Yes', householdHeadName: '', householdNumber: '2024-25698', lmp: '2024-06-01' },
  ]);

  const headers = ['Name', 'Age', 'Address', 'Sex'];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterByCategory, setFilterByCategory] = useState(null);

  const navigateToDetails = (resident) => {
    navigation.navigate('KagawadCensusDetails', { resident });
  };

  const handleSearch = (text) => {
    setSearchQuery(text.toLowerCase());
  };

  const isPregnant = (lmp) => {
    if (!lmp) return false;

    const lmpDate = new Date(lmp);
    const currentDate = new Date();
    const diffInMonths = (currentDate.getFullYear() - lmpDate.getFullYear()) * 12 + currentDate.getMonth() - lmpDate.getMonth();
    
    return diffInMonths > 3;
  };

  const applyFilters = (resident) => {
    const name = `${resident.firstName} ${resident.middleName} ${resident.lastName} ${resident.suffix}`.replace(/\s+/g, ' ').trim();
    const address = `${resident.purok}, ${resident.barangay}`;
    if (searchQuery && !name.toLowerCase().includes(searchQuery)) {
      return false;
    }
    if (filterByCategory) {
      const age = parseInt(resident.age, 10);
      const isResidentPregnant = resident.sex === 'Female' && isPregnant(resident.lmp);
      if (filterByCategory === 'Pregnant Women' && !isResidentPregnant) {
        return false;
      }
      if (filterByCategory === 'Infant' && (age < 0 || age > 2)) {
        return false;
      }
      if (filterByCategory === 'Adult' && (age < 18 || age > 59)) {
        return false;
      }
      if (filterByCategory === 'Senior Citizens' && age < 60) {
        return false;
      }
    }
    return true;
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const setCategoryFilter = (category) => {
    setFilterByCategory(category);
    toggleFilterModal();
  };

  const clearFilters = () => {
    setFilterByCategory(null);
    setSearchQuery('');
    toggleFilterModal();
  };

  const filteredResidents = residentsData.filter(applyFilters);

  const sortedResidentsData = filteredResidents.sort((a, b) => {
    if (a.isHouseholdHead === 'Yes' && b.isHouseholdHead === 'Yes') {
      return a.householdHeadName.localeCompare(b.householdHeadName);
    }
    if (a.isHouseholdHead === 'Yes') {
      return -1;
    }
    if (b.isHouseholdHead === 'Yes') {
      return 1;
    }
    return 0;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search residents..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter By:</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleFilterModal}>
          <Text style={styles.dropdownButtonText}>{filterByCategory || 'All'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.box}>
        <View style={styles.tableHeader}>
          {headers.map((header, index) => (
            <Text key={index} style={[styles.headerCell, index === headers.length - 1 && { flex: 1 }]}>
              {header}
            </Text>
          ))}
        </View>
        {sortedResidentsData.map((item, index) => {
          const name = `${item.firstName} ${item.middleName} ${item.lastName} ${item.suffix}`.replace(/\s+/g, ' ').trim();
          const address = `${item.purok}, ${item.barangay}`;
          return (
            <TouchableOpacity key={index} style={styles.residentRow} onPress={() => navigateToDetails(item)}>
              <Text style={[styles.cell, { borderRightWidth: 1, borderRightColor: '#ccc' }]}>{name}</Text>
              <Text style={[styles.cell, { borderRightWidth: 1, borderRightColor: '#ccc' }]}>{item.age}</Text>
              <Text style={[styles.cell, { borderRightWidth: 1, borderRightColor: '#ccc' }]}>{address}</Text>
              <Text style={styles.cell}>{item.sex}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={filterModalVisible} onRequestClose={toggleFilterModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalItem} onPress={() => setCategoryFilter('Infant')}>
              <Text style={styles.modalText}>Infant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => setCategoryFilter('Adult')}>
              <Text style={styles.modalText}>Adult</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => setCategoryFilter('Senior Citizens')}>
              <Text style={styles.modalText}>Senior Citizens</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => setCategoryFilter('Pregnant Women')}>
              <Text style={styles.modalText}>Pregnant Women</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={clearFilters}>
              <Text style={styles.modalText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={toggleFilterModal}>
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  searchInput: {
    height: 50,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 5,
  },
  filterLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  dropdownButton: {
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  residentRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalItem: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
  },
});

export default KagawadCensusData;
