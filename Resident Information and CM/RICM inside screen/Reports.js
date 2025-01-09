import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Reports = ({ navigation }) => {
  const [selectedReport, setSelectedReport] = useState('');

  const reports = [
    { label: "Barangay Clearance", value: "Barangay Clearance" },
    { label: "Certificate of Indigency", value: "Certificate of Indigency" },
    { label: "Barangay ID", value: "Barangay ID" },
    { label: "Business Permit", value: "Business Permit" },
    { label: "Barangay Certificate", value: "Barangay Certificate" }
  ];

  const handleReportSelect = (report) => {
    setSelectedReport(report);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Select Reports:</Text>
        <FlatList
          data={reports}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.reportButton, selectedReport === item.value && styles.selectedReportButton]}
              onPress={() => handleReportSelect(item.value)}
            >
              <Text style={styles.reportButtonText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="View"
            onPress={() => {
              if (selectedReport) {
                navigation.navigate('ViewReportScreen', { report: selectedReport });
              } else {
                Alert.alert('Please select a report');
              }
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Edit"
            onPress={() => {
              if (selectedReport) {
                navigation.navigate('EditReportScreen', { report: selectedReport });
              } else {
                Alert.alert('Please select a report');
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  box: {
    backgroundColor: '#710808',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  reportButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedReportButton: {
    backgroundColor: '#c0c0c0',
    
  },
  reportButtonText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  button: {
    flex: 1,
    marginHorizontal: 5,

  },
});

export default Reports;
