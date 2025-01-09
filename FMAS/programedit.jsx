import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ScrollView, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; // Import icon library

const { width, height } = Dimensions.get('window');

export default function EditProgram({ route, navigation }) {
  // Destructure program from route.params and provide default empty object
  const { program = {} } = route.params || {};

  // Initialize state with program data or empty strings
  const [programName, setProgramName] = useState(program.name || '');
  const [aipReferenceCode, setAipReferenceCode] = useState(program.aipReferenceCode || '');
  const [accountCode, setAccountCode] = useState(program.accountCode || '');
  const [proposedAmount, setProposedAmount] = useState(program.proposedAmount?.toString() || '');
  const [budgetCategory, setBudgetCategory] = useState(program.budgetCategory || '');
  const [expectedResult, setExpectedResult] = useState(program.expectedResult || '');
  const [date, setDate] = useState(program.date || '');
  const [time, setTime] = useState(program.time || '');
  const [signature, setSignature] = useState(program.signature || null);

  useEffect(() => {
    if (program) {
      setProgramName(program.name || '');
      setAipReferenceCode(program.aipReferenceCode || '');
      setAccountCode(program.accountCode || '');
      setProposedAmount(program.proposedAmount?.toString() || '');
      setBudgetCategory(program.budgetCategory || '');
      setExpectedResult(program.expectedResult || '');
      setDate(program.date || '');
      setTime(program.time || '');
      setSignature(program.signature || null);
    }
  }, [program]);

  const handleEditProgram = () => {
    if (!programName || !aipReferenceCode || !accountCode || !proposedAmount || !budgetCategory || !expectedResult || !date || !time) {
      Alert.alert('Validation Error', 'Please fill all fields.');
      return;
    }

    Alert.alert('Success', 'Program details have been saved.');

    // Navigate back to the ProgramList or another screen
    navigation.goBack();
  };

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSignature(result.uri);
    }
  };

  const handleClearImage = () => {
    setSignature(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Program Name"
        value={programName}
        onChangeText={setProgramName}
      />
      <TextInput
        style={styles.input}
        placeholder="AIP Reference Code"
        value={aipReferenceCode}
        onChangeText={setAipReferenceCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Account Code"
        value={accountCode}
        onChangeText={setAccountCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Proposed Amount"
        value={proposedAmount}
        keyboardType="numeric"
        onChangeText={setProposedAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Budget Category"
        value={budgetCategory}
        onChangeText={setBudgetCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Expected Result"
        value={expectedResult}
        onChangeText={setExpectedResult}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      <View style={styles.imageUploadContainer}>
        {signature ? (
          <Image source={{ uri: signature }} style={styles.image} />
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
            <MaterialIcons name="add-photo-alternate" size={40} color="#710808" />
          </TouchableOpacity>
        )}
        {signature && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearImage}>
            <Text style={styles.buttonText}>Clear Image</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleEditProgram}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
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
  input: {
    width: '100%',
    maxWidth: 340,
    padding: 10,
    borderWidth: 1,
    borderColor: '#710808',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  imageUploadContainer: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#710808',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#710808',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  clearButton: {
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
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
  footer: {
    width: '100%',
    maxWidth: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
