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
import axios from 'axios';  // Import axios

const PayrollForm = ({ navigation }) => {
  const [officialID, setOfficialID] = useState('');
  const [compensation, setCompensation] = useState('');
  const [salary, setSalary] = useState('');
  const [deduction, setDeduction] = useState('');
  const [date, setDate] = useState(new Date()); // Default to current date
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    if (!officialID || !compensation || !salary || !deduction || !date) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    const payrollData = {
      officialID,
      compensation,
      salary,
      deduction,
      date: date.toISOString().split('T')[0],
    };

    try {
      const response = await axios.post(
        'http://brgyapp.lesterintheclouds.com/api/insert_payroll.php',
        payrollData
      );

      const result = await response.data;

      if (result.status === 'success') {
        Alert.alert('Success', 'Payroll added successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'Failed to add payroll.');
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
      <Text style={styles.title}>Add Payroll</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Official ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Official ID"
          value={officialID}
          onChangeText={setOfficialID}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Compensation:</Text>
        <TextInput
          style={styles.input}
          placeholder="Compensation"
          value={compensation}
          keyboardType="numeric"
          onChangeText={setCompensation}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Salary:</Text>
        <TextInput
          style={styles.input}
          placeholder="Salary"
          value={salary}
          keyboardType="numeric"
          onChangeText={setSalary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Deduction:</Text>
        <TextInput
          style={styles.input}
          placeholder="Deduction"
          value={deduction}
          keyboardType="numeric"
          onChangeText={setDeduction}
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Payroll</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  submitButton: {
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

export default PayrollForm;
