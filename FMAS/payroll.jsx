import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function Payroll() {
  const [payrollData, setPayrollData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [availableYears, setAvailableYears] = useState([]); 
  const [availablePositions, setAvailablePositions] = useState([]); // To store available official positions
  const [selectedPosition, setSelectedPosition] = useState(''); // Selected official position
  const navigation = useNavigation();

  // Fetch payroll data
  const fetchPayrollData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://brgyapp.lesterintheclouds.com/api/fetch_payroll.php', {
        username: 'IT112-24-M',
        password: 'W2Bq@EV[SFEV',
      });

      const data = response.data;
      if (data.success === false) {
        setPayrollData([]);
        return;
      }

      if (Array.isArray(data)) {
        setPayrollData(data);
        // Extract years from the data (e.g., based on the 'end' field)
        const years = [...new Set(data.map(item => new Date(item.date).getFullYear()))];
        setAvailableYears(years);

        // Extract official positions from the data
        const positions = [...new Set(data.map(item => item.official_position))];
        setAvailablePositions(positions);
      }
    } catch (error) {
      console.error('Error fetching payroll data:', error);
      setPayrollData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrollData(); 
  }, [selectedYear]); 

  const filteredData = payrollData.filter(item => 
    new Date(item.date).getFullYear() === selectedYear &&
    (selectedPosition ? item.official_position === selectedPosition : true)
  );

  return (
    <View style={styles.container}>
      <View style={styles.yearPickerContainer}>
        <Text style={styles.yearPickerLabel}>Select Year:</Text>
        <RNPickerSelect
          items={availableYears.map(year => ({ label: year.toString(), value: year }))} 
          onValueChange={setSelectedYear}
          value={selectedYear}
          style={pickerSelectStyles}
        />
      </View>

      <View style={styles.positionPickerContainer}>
        <Text style={styles.positionPickerLabel}>Select Official Position:</Text>
        <RNPickerSelect
          items={availablePositions.map(position => ({ label: position, value: position }))} 
          onValueChange={setSelectedPosition}
          value={selectedPosition}
          style={pickerSelectStyles}
        />
      </View>

      <ScrollView horizontal contentContainerStyle={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Official Position</Text>
            <Text style={styles.headerCell}>Compensation</Text>
            <Text style={styles.headerCell}>Salary</Text>
            <Text style={styles.headerCell}>Deduction</Text>
            <Text style={styles.headerCell}>Date</Text>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#710808" />
          ) : (
            <FlatList
              data={filteredData}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.official_position || 'N/A'}</Text>
                  <Text style={styles.cell}>{item.compensation || 'N/A'}</Text>
                  <Text style={styles.cell}>{item.salary || 'N/A'}</Text>
                  <Text style={styles.cell}>{item.deduction || 'N/A'}</Text>
                  <Text style={styles.cell}>{item.date || 'N/A'}</Text>
                </View>
              )}
              keyExtractor={(item, index) => `${item.payrollID}-${index}`}
            />
          )}
        </View>
      </ScrollView>

      {/* Add Transaction */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation?.navigate('payrolladd')}>
          <Text style={styles.addButtonText}>Add Payroll</Text>
        </TouchableOpacity>
      </View>

      {/* Print */}            
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.printButton}>
          <Icon name="print" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Print</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  yearPickerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#710808',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearPickerLabel: {
    fontSize: 16,
    marginLeft: 50,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  positionPickerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#710808',
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionPickerLabel: {
    fontSize: 16,
    marginLeft: 50,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  tableContainer: {
    width: '100%',
    flex: 1,
    marginTop: 10,
    paddingBottom: 70,
  },
  table: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#710808',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  headerCell: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  cell: {
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#710808',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%', // Adjust width for alignment
    alignItems: 'center',
  },
  printButton: {
    backgroundColor: '#710808',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%', // Adjust width for alignment
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    width: 150,
  },
  inputIOS: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    width: 150,
  },
});
