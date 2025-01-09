// Applicants.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const applicantData = [
  {
    id: '1',
    name: 'CRUZ, Sofia M.',
    status: 'PENDING',
    dateOfSubmission: '06/14/2024',
  },
  // Add more applicant data as needed
];

const Applicants = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>APPLICANTS</Text>
      </View>
      <Text style={styles.title}>EDUCATIONAL FINANCIAL ASSISTANCE</Text>
      <FlatList
        data={applicantData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.status}</Text>
            <Text style={styles.cell}>{item.dateOfSubmission}</Text>
            <TouchableOpacity>
              <Text style={styles.actionCell}>View Requirements</Text>
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.row}>
            <Text style={styles.headerCell}>NAME</Text>
            <Text style={styles.headerCell}>STATUS</Text>
            <Text style={styles.headerCell}>DATE OF SUBMISSION</Text>
            <Text style={styles.headerCell}>ACTION</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#8B0000',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  title: {
    color: '#8B0000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  actionCell: {
    flex: 1,
    fontSize: 14,
    color: '#8B0000',
    textAlign: 'right',
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Applicants;