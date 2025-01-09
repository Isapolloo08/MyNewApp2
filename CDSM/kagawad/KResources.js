import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const KResources = ({ navigation }) => {
  const [rows, setRows] = useState([
    { year: 2025, budget: 1000000, increase: '--', estimated: 1000000 },
    { year: 2026, budget: 1050000, increase: '5%', estimated: 1050000 },
    { year: 2027, budget: 1102500, increase: '5%', estimated: 1102500 },
  ]);

  const handleYearPress = (year) => {
    const selectedYear = rows.find(row => row.year === year);
    navigation.navigate('YearDetails', {
      year,
      totalBudget: selectedYear.budget, // Pass the IRA budget here
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Internal Revenue Allotment</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Year</Text>
            <Text style={styles.tableHeader}>IRA Budget (₱)</Text>
            <Text style={styles.tableHeader}>Projected Increase (%)</Text>
            <Text style={styles.tableHeader}>Estimated IRA Budget (₱)</Text>
          </View>
          {rows.map((row) => (
            <View key={row.year} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.year}</Text>
              <Text style={styles.tableCell}>{row.budget.toLocaleString()}</Text>
              <Text style={styles.tableCell}>{row.increase}</Text>
              <Text style={styles.tableCell}>{row.estimated.toLocaleString()}</Text>
            </View>
          ))}
        </View>
      </View>
      {rows.map((row) => (
        <TouchableOpacity key={row.year} style={styles.yearButton} onPress={() => handleYearPress(row.year)}>
          <Text style={styles.yearText}>{row.year}</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  tableContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#F8F8F8',
  },
  table: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#800000',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#000000',
  },
  yearButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  yearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default KResources;
