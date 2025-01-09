import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const screenWidth = Dimensions.get('window').width;

export default function Transactions() {
  const [selectedTransactionType, setSelectedTransactionType] = useState('Revenue');
  const [transactionData, setTransactionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Use the navigation hook

  // Fetch transaction data based on selected transaction type
  const fetchTransactionData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://brgyapp.lesterintheclouds.com/api/fetch_transacts.php', {
        username: 'IT112-24-M',
        password: 'W2Bq@EV[SFEV',
      });

      if (response.data.success && response.data.data.length > 0) {
        setTransactionData(response.data.data);
        setError(null);
        filterData(response.data.data); // Filter data based on initial transaction type
      } else {
        setError('No transaction data found');
        setTransactionData([]);
      }
    } catch (error) {
      setError('Error fetching data');
      setTransactionData([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on selected transaction type
  const filterData = (data) => {
    const filtered = data.filter((item) => item.transactionType === selectedTransactionType);
    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  useEffect(() => {
    if (transactionData.length > 0) {
      filterData(transactionData); // Re-filter data when transaction type changes
    }
  }, [selectedTransactionType]);

  // Prepare data for the bar graph
  const prepareBarChartData = () => {
    const labels = filteredData.map((item) => item.category);
    const data = filteredData.map((item) => parseFloat(item.amount));

    return {
      labels,
      datasets: [
        {
          data,
        },
      ],
    };
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={[{}]} // Dummy data to render the component
      keyExtractor={() => '1'} // Fallback key for FlatList when using dummy data
      renderItem={() => (
        <>
          {/* Transaction Type Picker */}
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Type:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedTransactionType(value)}
              items={[
                { label: 'Revenue', value: 'Revenue' },
                { label: 'Expense', value: 'Expense' },
              ]}
              value={selectedTransactionType}
              style={pickerSelectStyles}
            />
          </View>

          {/* Loading or Error Handling */}
          {loading ? (
            <ActivityIndicator size="large" color="#710808" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <Text style={styles.chartTitle}>Transaction Summary</Text>

              {/* Bar Chart */}
              <View style={styles.chartCard}>
                <BarChart
                  data={prepareBarChartData()}
                  width={screenWidth - 40}
                  height={220}
                  chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(113, 8, 8, ${opacity})`,
                  }}
                  style={styles.chart}
                />
              </View>

              {/* Legend with Descriptions */}
              <View style={styles.descriptionContainer}>
                <Text style={styles.legendTitle}>Descriptions</Text>
                <FlatList
                  data={filteredData}
                  keyExtractor={(item) => item.transactionID.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.descriptionItem}>
                      <Text style={styles.legendCategory}>
                        {item.category} - {item.amount}
                      </Text>
                      <Text style={styles.legendDescription}>{item.description}</Text>
                    </View>
                  )}
                />
              </View>
            </>
          )}

          {/* Add Transaction */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation?.navigate('transactadd')}>
              <Text style={styles.addButtonText}>Add Transaction</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', backgroundColor: '#f0f0f0', padding: 20 },
  pickerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#710808',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerLabel: {
    fontSize: 16,
    marginLeft: 50,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  errorText: { color: 'red', fontSize: 16, marginTop: 10 },
  chartTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  chartCard: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 20 },
  chart: { marginVertical: 10, borderRadius: 10 },
  legendTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  descriptionContainer: { width: '100%' },
  descriptionItem: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  legendCategory: { fontSize: 16, fontWeight: 'bold', color: '#710808' },
  legendDescription: { fontSize: 14, color: '#555' },
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
