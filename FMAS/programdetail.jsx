import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ViewProgram({ route, navigation }) {
  const {
    programName,
    programType,
    location,
    proposedBy,
    committee,
    startDate,
    endDate,
    budget,
    note,
    beneficiaries,
    status,
  } = route.params; // Assuming the program details are passed as params

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <TextInputLabel label="Program Name" value={programName} />
        <TextInputLabel label="Program Type" value={programType} />
        <TextInputLabel label="Location" value={location} />
        <TextInputLabel label="Proposed By" value={proposedBy || 'N/A'} />
        <TextInputLabel label="Committee" value={committee || 'N/A'} />
        <TextInputLabel label="Start Date" value={startDate} />
        <TextInputLabel label="End Date" value={endDate} />
        <TextInputLabel label="Budget" value={`₱${budget}`} />
        <TextInputLabel label="Note" value={note || 'N/A'} />
        <TextInputLabel label="Beneficiaries" value={beneficiaries || 'N/A'} />

        {/* Update status to display as a text label */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={styles.statusValue}>{status}</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// Reusable component to display label and value in a formatted way
const TextInputLabel = ({ label, value }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

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
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#710808',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  statusContainer: {
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#710808',
  },
  statusValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
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
});
