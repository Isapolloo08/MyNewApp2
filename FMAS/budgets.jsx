import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import axios from 'axios';
import { PieChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function Budgets() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());  // Default to current year
  const [programData, setProgramData] = useState([]);  // Data for selected year
  const [totalBudget, setTotalBudget] = useState(0);  // Store total budget for the selected year
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [years, setYears] = useState([]);  // List of available years
  const [alloted, setAlloted] = useState(0);  // Balance calculation (total - used budget)
  const [balance, setBalance] = useState(0);  // Balance calculation (total - used budget)
  const [groupedData, setGroupedData] = useState({});  // Data grouped by year
  const navigation = useNavigation();

  // Ensure valid number for budget calculations
  const toValidNumber = (value) => {
    return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
  };

  const fetchAvailableYears = async () => {
    try {
      const response = await axios.post('http://brgyapp.lesterintheclouds.com/api/fetch_programs.php', {
        username: 'IT112-24-M',
        password: 'W2Bq@EV[SFEV',
      });
  
      if (response.data.success) {
        // Extract available years from the backend response
        const availableYears = response.data.years || []; // Assuming `years` is returned from backend
        setYears(availableYears.map(year => ({ label: year, value: parseInt(year) })));
  
        // Set the first available year as the selectedYear if it's not already set
        if (!selectedYear && availableYears.length > 0) {
          setSelectedYear(parseInt(availableYears[0]));
        }
      }
    } catch (error) {
      setError('Error fetching available years');
    }
  };
  
  const fetchProgramData = async () => {
    setLoading(true);
    try {
      // Send selectedYear to the backend to filter programs and total budget for the specific year
      const response = await axios.post('http://brgyapp.lesterintheclouds.com/api/fetch_programs.php', {
        username: 'IT112-24-M',
        password: 'W2Bq@EV[SFEV',
        year: selectedYear, // Pass selected year to the backend
      });
  
      if (response.data.success) {
        const fetchedData = response.data.data;
  
        // Group programs by year
        const grouped = fetchedData.reduce((acc, program) => {
          const programYear = new Date(program.startDate).getFullYear();
          if (!acc[programYear]) {
            acc[programYear] = [];
          }
          acc[programYear].push(program);
          return acc;
        }, {});
  
        // Set the grouped data
        setGroupedData(grouped);
  
        // Filter program data for the selected year
        const filteredData = grouped[selectedYear];
        setProgramData(filteredData);
  
        // Set the total budget for the selected year (from the backend response)
        const totalBudgetForYear = response.data.totalBudget;
        setTotalBudget(totalBudgetForYear);
  
        // Calculate the balance
        const totalProgramBudget = filteredData.reduce((sum, program) => sum + toValidNumber(program.budget), 0);
        setBalance(totalBudgetForYear - totalProgramBudget);
        setAlloted(totalProgramBudget)
  
        setError(null);
      } else {
        setError('No programs found');
        setProgramData([]);
      }
    } catch (error) {
      setError('Error fetching data');
      setProgramData([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Fetch available years on initial load
    fetchAvailableYears();
  }, []);
  
  useEffect(() => {
    // Fetch program data whenever the selected year changes
    if (selectedYear) {
      fetchProgramData();
    }
  }, [selectedYear]);
  
  useEffect(() => {
    console.log("Total Budget: ", totalBudget);
    console.log("Balance: ", balance);
    console.log("Program Data: ", programData);
  }, [totalBudget, alloted, balance, programData]);
  
  // Prepare pie chart data categorized by committee
  const categorizeDataByCommittee = (data) => {
    const committeeData = {};
    data.forEach((program) => {
      const committee = program.committee;
      if (!committeeData[committee]) {
        committeeData[committee] = { budget: 0, programs: [] };
      }
      committeeData[committee].budget += parseFloat(program.budget);
      committeeData[committee].programs.push(program);
    });

    const getRandomRedShade = () => {
      let redValue = Math.floor(Math.random() * 256);
      while (redValue < 100) {
        redValue = Math.floor(Math.random() * 256);
      }
      return `rgb(${redValue}, 0, 0)`;
    };

    return Object.keys(committeeData).map((committee) => ({
      name: `${committee} - ${committeeData[committee].budget.toFixed(2)}`,
      population: committeeData[committee].budget,
      color: getRandomRedShade(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 14,
    }));
  };

  const pieChartData = categorizeDataByCommittee(programData);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={[{}]} // Dummy data to render the component
      keyExtractor={() => '1'}
      renderItem={() => (
        <>
          {/* Year Picker */}
          <View style={styles.yearPickerContainer}>
            <Text style={styles.yearPickerLabel}>Select Year:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedYear(value)}
              items={years || []}
              value={selectedYear}
              style={pickerSelectStyles}
              placeholder={{
                label: "Select a year",
                value: selectedYear,
                color: "#9EA0A4",
              }}
            />
          </View>

          {/* Loading or Error Handling */}
          {loading ? (
            <ActivityIndicator size="large" color="#710808" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <View style={styles.chartContainer}>
              {/* Display Total Budget and Balance */}
              <Text style={styles.totalBudgetText}>Total Budget for {selectedYear}: ₱{totalBudget.toFixed(2)}</Text>
              <Text style={styles.allotedText}>Allocated Funds: ₱{alloted.toFixed(2)}</Text>
              <Text style={styles.balanceText}>Unutilized Funds: ₱{balance.toFixed(2)}</Text>


              {/* Pie Chart */}
              {programData?.length > 0 ? (
                <PieChart
                  data={pieChartData || []}
                  width={340}
                  height={220}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(112, 8, 8, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  legend={false}
                />
              ) : (
                <Text style={styles.noDataText}>No data available for the selected year.</Text>
              )}
            </View>
          )}

          {/* Custom Legend Below Pie Chart */}
          {pieChartData?.length > 0 && (
            <FlatList
              data={pieChartData}
              renderItem={({ item }) => (
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.name}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              style={styles.legendContainer}
            />
          )}

          {/* Add Budget */}
          <View style={styles.addBudgetCard}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation?.navigate("budgetadd")}>
              <Text style={styles.addButtonText}>Add Budget</Text>
            </TouchableOpacity>
          </View>

          {/* Programs */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => navigation?.navigate("programs")}>
              <Text style={styles.navigateButtonText}>Programs</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', backgroundColor: '#f0f0f0', padding: 20 },
  yearPickerContainer: { 
    flexDirection: 'row', 
    marginBottom: 20, 
    alignItems: 'center', 
    backgroundColor: '#710808',  // Red background for the picker container
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '100%', 
  },
  yearPickerLabel: { 
    fontSize: 16, 
    marginLeft: 60, 
    marginRight: 10, 
    color: '#fff', 
    flex: 1, 
  },
  chartContainer: { marginTop: 20, alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16, marginTop: 10 },
  addBudgetCard: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 20,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#710808',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',  
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: { 
    flexDirection: 'row', 
    marginTop: 20, 
    justifyContent: 'space-around', 
    width: '100%' 
  },
  navigateButton: {
    backgroundColor: '#710808',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  legendContainer: { marginTop: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  legendColor: { width: 20, height: 20, borderRadius: 10, marginRight: 10 },
  legendText: { fontSize: 14, color: '#000' },
  totalBudgetText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#710808',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 16,
    color: '#710808',
  },
  allotedText: {
    fontSize: 16,
    color: '#710808',
  },
  noDataText: { fontSize: 16, color: '#710808', textAlign: 'center', marginTop: 20 },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the icon is not overlapping text
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the icon is not overlapping text
  },
});
