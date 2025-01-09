import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CensusData = () => {
  const navigation = useNavigation();

  const [residentsData, setResidentsData] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', middleName: 'A', suffix: 'Jr.', age: '60', purok: 'Purok 1', barangay: 'Barangay 1', sex: 'Male', contactNumber: '0965874126852', isHouseholdHead: 'No', householdHeadName: 'Jay Doe', relationship: 'Son', householdNumber: '2024-25698', lmp: null },
    { id: 2, firstName: 'Jane', lastName: 'Smith', middleName: '', suffix: '', age: '20', purok: 'Purok 2', barangay: 'Barangay 2', sex: 'Female', contactNumber: '0965874126984', isHouseholdHead: 'Yes', householdHeadName: '', householdNumber: '2024-25698', lmp: '2024-06-01' },
    { id: 3, firstName: 'Jay', lastName: 'Doe', middleName: '', suffix: '', age: '40', purok: 'Purok 1', barangay: 'Barangay 1', sex: 'Male', contactNumber: '0965874126852', isHouseholdHead: 'Yes', householdHeadName: '', householdNumber: '2024-25698', lmp: null },
  ]);

  const headers = ['Name', 'Age', 'Address', 'Sex'];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterByCategory, setFilterByCategory] = useState(null);

  const navigateToDetails = (resident) => {
    navigation.navigate('CensusDetails', { resident });
  };

  const navigateToCensusHistory = () => {
    const historyData = [
      {
        date: '2023-07-15',
        changes: {
          Name: { oldValue: 'John Doe', newValue: 'John Smith' },
          Age: { oldValue: '30', newValue: '31' },
        },
      },
      {
        date: '2023-06-20',
        changes: {
          Address: { oldValue: '123 Main St', newValue: '456 Elm St' },
        },
      },
    ];
  
    navigation.navigate('CensusHistory', { history: historyData });
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

  // Sorting the residents data
  const sortedResidentsData = filteredResidents
    .filter(resident => resident.isHouseholdHead === 'Yes')
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
    .map(head => {
      const members = filteredResidents
        .filter(resident => resident.householdHeadName === head.firstName + ' ' + head.lastName)
        .sort((a, b) => a.age - b.age);
      return [head, ...members];
    })
    .flat();

  // Function to add a new resident to the list
  const addNewCensusData = (newCensusData) => {
    setResidentsData([...residentsData, newCensusData]);
  };

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
        <TouchableOpacity 
          style={styles.historyButton} 
          onPress={navigateToCensusHistory}>
          <Text style={styles.historyButtonText}>View Census History</Text>
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCensusData', { addNewCensusData })}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>

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
  historyButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  historyButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',

  },
  residentRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  addText: {
    fontSize: 24,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CensusData;