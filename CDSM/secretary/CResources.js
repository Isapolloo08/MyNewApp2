import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const SResources = ({ navigation }) => {
  const [rows, setRows] = useState([
    { year: 2025, budget: 1000000, increase: '--', estimated: 1000000 },
    { year: 2026, budget: 1050000, increase: '5%', estimated: 1050000 },
    { year: 2027, budget: 1102500, increase: '5%', estimated: 1102500 },
  ]);

  const [editingRowIndex, setEditingRowIndex] = useState(null);

  const handleAddRow = () => {
    const newYear = rows[rows.length - 1].year + 1;
    const newRow = { year: newYear, budget: 0, increase: '--', estimated: 0 };
    setRows([...rows, newRow]);
  };

  const handleBudgetChange = (text, index) => {
    const newBudget = parseInt(text, 10);
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        const increase = i === 0 ? '--' : ((newBudget - rows[i - 1].budget) / rows[i - 1].budget * 100).toFixed(2) + '%';
        const estimated = newBudget;
        return { ...row, budget: newBudget, increase, estimated };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleEditRow = (index) => {
    if (editingRowIndex === index) {
      setEditingRowIndex(null);
    } else {
      setEditingRowIndex(index);
    }
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((row, i) => i !== index);
    setRows(updatedRows);
    setEditingRowIndex(null);
  };

  const handleYearPress = (year) => {
    console.log('Navigating to SYearDetails with year:', year); // Debugging log
    navigation.navigate('SYearDetails', { year });
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
          {rows.map((row, index) => (
            <View key={row.year}>
              <TouchableOpacity style={styles.tableRow} onPress={() => handleEditRow(index)}>
                <Text style={styles.tableCell}>{row.year}</Text>
                {editingRowIndex === index ? (
                  <TextInput
                    style={styles.tableCellInput}
                    value={row.budget.toString()}
                    onChangeText={(text) => handleBudgetChange(text, index)}
                    keyboardType="numeric"
                  />
                ) : (
                  <Text style={styles.tableCell}>{row.budget.toString()}</Text>
                )}
                <Text style={styles.tableCell}>{row.increase}</Text>
                <Text style={styles.tableCell}>{row.estimated.toString()}</Text>
              </TouchableOpacity>
              {editingRowIndex === index && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setEditingRowIndex(null)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRow(index)}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddRow}>
        <Text style={styles.addButtonText}>Add Year</Text>
      </TouchableOpacity>
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
  tableCellInput: {
    flex: 1,
    textAlign: 'center',
    color: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#800000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  addButton: {
    backgroundColor: '#800000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SResources;