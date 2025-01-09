import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

export default function AddBudget({ navigation }) {
  const [programID, setProgramID] = useState('');
  const [aipReferenceCode, setAipReferenceCode] = useState('');
  const [accountCode, setAccountCode] = useState('');
  const [expectedResults, setExpectedResults] = useState('');
  const [budget, setBudget] = useState('');
  const [date, setDate] = useState(new Date()); // Default to current date
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddBudget = async () => {
    if (
      !programID ||
      !aipReferenceCode ||
      !accountCode ||
      !expectedResults ||
      !budget ||
      !date
    ) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    const budgetData = {
      programID,
      aip_reference_code: aipReferenceCode,
      account_code: accountCode,
      expected_results: expectedResults,
      budget: parseFloat(budget),
      date: date.toISOString().split('T')[0],
    };

    try {
      const response = await fetch(
        'http://brgyapp.lesterintheclouds.com/api/insert_budget.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(budgetData),
        }
      );

      const result = await response.json();

      if (result.status === 'success') {
        Alert.alert('Success', 'Budget added successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'Failed to add budget.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Budget</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Program ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Program ID (###)"
          value={programID}
          keyboardType="numeric"
          onChangeText={(text) => setProgramID(text.replace(/[^0-9]/g, ''))} // Allow only numeric characters
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>AIP Reference Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="AIP Reference Code (#####)"
          value={aipReferenceCode}
          onChangeText={(text) => setAipReferenceCode(`AIP${text.replace(/[^0-9]/g, '')}`)} // Ensure "AIP" prefix and numeric input
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Account Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="Account Code (####)"
          value={accountCode}
          onChangeText={(text) => setAccountCode(`ACCT${text.replace(/[^0-9]/g, '')}`)} // Ensure "ACCT" prefix and numeric input
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expected Results:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter expected results"
          value={expectedResults}
          multiline
          onChangeText={setExpectedResults}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Budget:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter budget amount"
          value={budget}
          keyboardType="numeric"
          onChangeText={(text) => setBudget(text.replace(/[^0-9.]/g, ''))} // Allow only numeric and dot for budget
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {date.toISOString().split('T')[0]} {/* Display current date in YYYY-MM-DD format */}
          </Text>
          <Icon name="calendar" size={20} color="#710808" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddBudget}>
          <Text style={styles.buttonText}>Add Budget</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#710808',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#710808',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#bdc3c7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#710808',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
