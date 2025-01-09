import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DetailedView = ({ route }) => {
  const { item } = route.params;
  const [filter, setFilter] = useState('All');
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Example data (replace with your actual data)
  const data = [
    { name: 'CRUZ, Sofia M.', status: 'APPROVED', date: '06/14/2024' },
    { name: 'SMITH, John D.', status: 'PENDING', date: '06/15/2024' },
    { name: 'DOE, Jane A.', status: 'REJECTED', date: '06/16/2024' },
  ];

  useEffect(() => {
    // Function to filter data based on search input and filter
    const filtered = data.filter(item => {
      if (filter !== 'All' && item.status !== filter) {
        return false;
      }
      return item.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFilteredData(filtered);
  }, [searchInput, filter]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{item.title}</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchInput}
          onChangeText={setSearchInput}
        />
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter:</Text>
          <RNPickerSelect
            onValueChange={(value) => setFilter(value)}
            items={[
              { label: 'All', value: 'All' },
              { label: 'Approved', value: 'APPROVED' },
              { label: 'Pending', value: 'PENDING' },
              { label: 'Rejected', value: 'REJECTED' },
            ]}
            style={pickerSelectStyles}
            value={filter}
            placeholder={{}}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>NAME</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>STATUS</Text>
          <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>DATE OF SUBMISSION</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>ACTION</Text>
        </View>
        {filteredData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableRowText, { flex: 1 }]}>{item.name}</Text>
            <Text style={[styles.tableRowText, { flex: 1 }]}>{item.status}</Text>
            <Text style={[styles.tableRowText, { flex: 1.5 }]}>{item.date}</Text>
            <TouchableOpacity style={[styles.tableRowText, { flex: 1 }]}>
              <Text style={styles.actionText}>View Requirements</Text>
            </TouchableOpacity>
          </View>
        ))}
        {filteredData.length === 0 && (
          <Text style={styles.noDataText}>No matching records found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#710808',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  filterLabel: {
    marginRight: 10,
    color: '#710808',
  },
  scrollContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#A52A2A',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableRowText: {
    fontSize: 13.5,
    color: '#333',
    textAlign: 'center',
  },
  actionText: {
    color: '#A52A2A',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#710808',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    color: 'black',
  },
  inputAndroid: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    color: 'black',
  },
});

export default DetailedView;
