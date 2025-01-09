import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import axios from 'axios';

// Helper function to extract year from date string
const extractYear = (dateString) => {
  const yearMatch = dateString.match(/\b\d{4}\b/); // Matches any 4-digit year
  return yearMatch ? parseInt(yearMatch[0], 10) : NaN;
};

// Helper function to ensure valid numbers
const toValidNumber = (value) => {
  const number = parseFloat(value);
  return isNaN(number) ? 0 : number;
};

const KFunds = ({ route }) => {
  const { year, totalBudget } = route.params; // Get the year and total budget
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // Fetch approved programs from the API
        const response = await axios.get('http://brgyapp.lesterintheclouds.com/kfunds.php', {
          params: { status: 'Approved' }
        });
        const programs = response.data;

        // Filter programs to include only those from the specified year
        const programsInYear = programs.filter(program => {
          const startYear = extractYear(program.startDate);
          const endYear = extractYear(program.endDate);
          return startYear === year || endYear === year;
        });

        // Fetch materials and expenses for each program
        const programsWithDetails = await Promise.all(programsInYear.map(async (program) => {
          try {
            // Fetch materials
            const materialsResponse = await axios.get('http://brgyapp.lesterintheclouds.com/kfunds.php', {
              params: { programId: program.programId, type: 'materials' }
            });
            const materialsList = Array.isArray(materialsResponse.data) ? materialsResponse.data : [];

            // Fetch expenses
            const expensesResponse = await axios.get('http://brgyapp.lesterintheclouds.com/kfunds.php', {
              params: { programId: program.programId, type: 'expenses' }
            });
            const expensesList = Array.isArray(expensesResponse.data) ? expensesResponse.data : [];

            // Calculate totals
            const totalMaterialsFunds = materialsList.reduce((total, material) => total + toValidNumber(material.allocation), 0);
            const totalOtherExpensesFunds = expensesList.reduce((total, expense) => total + toValidNumber(expense.allocation), 0);

            // Calculate total allocation and percentage
            const totalAllocation = totalMaterialsFunds + totalOtherExpensesFunds;
            const percentage = ((totalAllocation / totalBudget) * 100).toFixed(2);

            return {
              ...program,
              totalAllocation,
              percentage,
            };
          } catch (error) {
            console.error(`Error fetching details for program ${program.programId}:`, error);
            return { ...program, totalAllocation: 0, percentage: '0.00' };
          }
        }));

        setData(programsWithDetails);
        setFilteredData(programsWithDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [year, totalBudget]);

  const handleSearch = () => {
    const filteredData = data.filter(item =>
      item.programName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const totalFundAllocation = filteredData.reduce((total, item) => total + item.totalAllocation, 0);
  const remainingBudget = totalBudget - totalFundAllocation;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPrograms}>There are no programs for this year.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { width: width * 0.65 }]}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} color="#710808" />
      </View>
      <Text style={styles.header}>Budget Utilization for {year}</Text>
      <Text style={styles.budget}>Total Budget: ₱{totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      <Text style={styles.budget}>Total Fund Allocation: ₱{totalFundAllocation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      <Text style={styles.budget}>Remaining Budget: ₱{remainingBudget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      <View style={styles.tableContainer}>
        {/* Table header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Program</Text>
          <View style={styles.separator} />
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Total Fund Allocation (₱)</Text>
          <View style={styles.separator} />
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>%</Text>
          <View style={styles.separator} />
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Start Date</Text>
          <View style={styles.separator} />
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Target Completion Date</Text>
        </View>
        {/* Table rows */}
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.tableRow,
                index % 2 === 0 && styles.tableRowEven,
                index % 2 !== 0 && styles.tableRowOdd,
              ]}
            >
              <Text style={[styles.tableCell, { flex: 2 }]}>{item.programName}</Text>
              <View style={styles.separator} />
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {item.totalAllocation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
              </Text>
              <View style={styles.separator} />
              <Text style={[styles.tableCell, { flex: 1 }]}>{item.percentage}%</Text>
              <View style={styles.separator} />
              <Text style={[styles.tableCell, { flex: 2 }]}>{item.startDate}</Text>
              <View style={styles.separator} />
              <Text style={[styles.tableCell, { flex: 2 }]}>{item.endDate}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    borderRadius: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'left',
  },
  budget: {
    fontSize: 18,
    marginBottom: 10,
    color: '#710808',
  },
  tableContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#710808',
    padding: 5,
  },
  tableHeaderText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  tableRowEven: {
    backgroundColor: '#F5F5F5',
  },
  tableRowOdd: {
    backgroundColor: '#FFFFFF',
  },
  tableCell: {
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
  },
  separator: {
    width: 1,
    backgroundColor: '#CCC',
  },
  noPrograms: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default KFunds;
