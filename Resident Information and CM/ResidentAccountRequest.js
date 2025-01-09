import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Example data, replace with actual data fetching logic
const initialRequests = [
  {
    id: '1',
    dateCreated: '2024-07-20',
    isHouseholdHead: true,
    relationship: 'N/A',
    residentName: 'Juan Dela Cruz',
    contactNumber: '09123456789',
    address: 'Barangay 1, Street 2',
    status: 'pending', // Example status
  },
  {
    id: '2',
    dateCreated: '2024-07-15',
    isHouseholdHead: false,
    relationship: 'Spouse',
    residentName: 'Maria Clara',
    contactNumber: '09198765432',
    address: 'Barangay 2, Street 4',
    status: 'pending',
  },
  {
    id: '3',
    dateCreated: '2024-07-10',
    isHouseholdHead: true,
    relationship: 'N/A',
    residentName: 'Pedro Santos',
    contactNumber: '09123334455',
    address: 'Barangay 3, Street 5',
    status: 'pending',
  },
  // Add more sample data as needed
];

const ResidentAccountRequest = () => {
  const [filter, setFilter] = useState('all');
  const [requests, setRequests] = useState(initialRequests);

  const filterRequests = () => {
    if (filter === 'all') return requests;
    return requests.filter(request => request.status === filter);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending': 
        return {
          backgroundColor: 'lightyellow',
          borderColor: 'yellow',
        };
      case 'approved': 
        return {
          backgroundColor: 'lightgreen',
          borderColor: 'green',
        };
      default: 
        return {
          backgroundColor: '#f9f9f9',
          borderColor: '#ddd',
        };
    }
  };

  const handleAccept = (id) => {
    Alert.alert(
      "Confirm Acceptance",
      "Are you sure you want to confirm this request?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => {
          setRequests(prevRequests =>
            prevRequests.map(request =>
              request.id === id
                ? { ...request, status: 'approved' }
                : request
            )
          );
        }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterButtonText, filter === 'all' && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterButtonText, filter === 'pending' && styles.activeFilterText]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'approved' && styles.activeFilter]}
          onPress={() => setFilter('approved')}
        >
          <Text style={[styles.filterButtonText, filter === 'approved' && styles.activeFilterText]}>Approved</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filterRequests()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.requestItem, getStatusStyle(item.status)]}>
            <View style={styles.requestInfo}>
              <Text style={styles.infoText}>Date Created: <Text style={styles.infoValue}>{item.dateCreated}</Text></Text>
              <Text style={styles.infoText}>Household Head: <Text style={styles.infoValue}>{item.isHouseholdHead ? 'Yes' : 'No'}</Text></Text>
              <Text style={styles.infoText}>Relationship to Household Head: <Text style={styles.infoValue}>{item.relationship}</Text></Text>
              <Text style={styles.infoText}>Resident Name: <Text style={styles.infoValue}>{item.residentName}</Text></Text>
              <Text style={styles.infoText}>Contact Number: <Text style={styles.infoValue}>{item.contactNumber}</Text></Text>
              <Text style={styles.infoText}>Address: <Text style={styles.infoValue}>{item.address}</Text></Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={() => handleAccept(item.id)}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-around', // Ensure buttons are evenly spaced
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    fontSize: 16,
  },
  activeFilterText: {
    color: '#fff',
  },
  requestItem: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
  },
  requestInfo: {
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  infoValue: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    marginLeft: 10, // Add space between buttons
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ResidentAccountRequest;
