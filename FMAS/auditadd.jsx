import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function AuditAdd({ navigation }) {
  const [timestamp, setTimestamp] = useState(new Date());
  const [details, setDetails] = useState('');
  const [feature, setFeature] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const features = ['Budget','Revenue Expense','Payroll','Financial Report']; // Replace with actual features or fetch from the backend

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timestamp;
    setShowDatePicker(false);
    setTimestamp(currentDate);
  };

  const handleAddAudit = async () => {
    if (!timestamp || !details || !feature) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post(
        'http://brgyapp.lesterintheclouds.com/api/insert_audit.php',
        {
          timestamp: timestamp.toISOString().split('T')[0], // Format timestamp
          details,
          feature,
        }
      );
      if (response.data.success) {
        Alert.alert('Success', 'Audit record added successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to add audit record.');
      }
    } catch (error) {
      console.error('Error adding audit record:', error);
      Alert.alert('Error', 'An error occurred while adding the record.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Label */}
      <Text style={styles.mainLabel}>Add Audit Record</Text>

      {/* Timestamp Date Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Timestamp</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {timestamp.toISOString().split('T')[0]} {/* Display in YYYY-MM-DD */}
          </Text>
          <Icon name="calendar" size={20} color="#710808" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={timestamp}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* Details Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Details</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={details}
          onChangeText={setDetails}
          placeholder="Enter details"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Feature Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Feature</Text>
        <Picker
          selectedValue={feature}
          onValueChange={(itemValue) => setFeature(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select a feature" value="" />
          {features.map((feature) => (
            <Picker.Item key={feature} label={feature} value={feature} />
          ))}
        </Picker>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddAudit}>
          <Text style={styles.buttonText}>Add Audit</Text>
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
  mainLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#710808',
    textAlign: 'center',
    marginBottom: 30,
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
    textAlignVertical: 'top',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#710808',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
