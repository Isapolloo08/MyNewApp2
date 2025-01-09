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
import { Picker } from '@react-native-picker/picker';

export default function AddProgram({ navigation }) {
  const [programName, setProgramName] = useState('');
  const [programType, setProgramType] = useState('');
  const [location, setLocation] = useState('');
  const [proposedBy, setProposedBy] = useState('');
  const [committee, setCommittee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [note, setNote] = useState('');
  const [beneficiaries, setBeneficiaries] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleAddProgram = () => {
    // Validate required fields
    if (
      !programName ||
      !programType ||
      !location ||
      !startDate ||
      !endDate ||
      !budget ||
      !status
    ) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    // Prepare program data
    const programData = {
      programName,
      programType,
      location,
      proposedBy,
      committee,
      startDate,
      endDate,
      budget: parseFloat(budget), // Ensure budget is a number
      note,
      beneficiaries: beneficiaries ? parseInt(beneficiaries, 10) : null, // Parse beneficiaries
      status,
    };

    // Send data to the backend
    insertProgram(programData);
  };

  const insertProgram = async (programData) => {
    try {
      // Authorization credentials
      const authData = {
        username: 'IT112-24-M',
        password: 'W2Bq@EV[SFEV',
      };

      // Send API request
      const response = await fetch(
        'http://brgyapp.lesterintheclouds.com/api/insert_program.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...authData, // Add username and password
            ...programData, // Flatten and include program data
          }),
        }
      );

      const text = await response.text();
      console.log('Response:', text);

      const result = JSON.parse(text); // Parse server response

      if (result.status === 'success') {
        Alert.alert('Success', 'Program added successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'Failed to add program.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Program Name"
          value={programName}
          onChangeText={setProgramName}
        />
        <TextInput
          style={styles.input}
          placeholder="Program Type"
          value={programType}
          onChangeText={setProgramType}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Proposed By (Optional)"
          value={proposedBy}
          onChangeText={setProposedBy}
        />
        <TextInput
          style={styles.input}
          placeholder="Committee (Optional)"
          value={committee}
          onChangeText={setCommittee}
        />
        <TextInput
          style={styles.input}
          placeholder="Start Date (YYYY-MM-DD)"
          value={startDate}
          onChangeText={setStartDate}
        />
        <TextInput
          style={styles.input}
          placeholder="End Date (YYYY-MM-DD)"
          value={endDate}
          onChangeText={setEndDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Budget"
          value={budget}
          keyboardType="numeric"
          onChangeText={setBudget}
        />
        <TextInput
          style={styles.input}
          placeholder="Note (Optional)"
          value={note}
          multiline
          onChangeText={setNote}
        />
        <TextInput
          style={styles.input}
          placeholder="Beneficiaries (Optional)"
          value={beneficiaries}
          keyboardType="numeric"
          onChangeText={setBeneficiaries}
        />

        <View style={styles.pickerContainer}>
          <Text>Status:</Text>
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Open" value="Open" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Approved" value="Approved" />
            <Picker.Item label="Rejected" value="Rejected" />
            <Picker.Item label="Cancelled" value="Cancelled" />
          </Picker>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddProgram}>
            <Text style={styles.buttonText}>Add Program</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 340,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#710808',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: 50,
    borderColor: '#710808',
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#bdc3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#710808',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
