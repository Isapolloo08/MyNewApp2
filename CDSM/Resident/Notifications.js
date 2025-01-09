import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NOTIFICATIONS_DATA = [
  { id: '1', title: 'Application Approved: Claim Details', date: 'Yesterday', status: 'Accepted', description: 'Claim approved' },
  { id: '2', title: 'Application Status Update: Pending Review', date: 'June 23 2024 at 10:00 am', status: 'Pending', description: 'Application pending' },
  { id: '3', title: 'New Educational Financial Assistance Program Available!', date: 'June 20 2024 at 12:00 pm', status: 'Available', description: 'New program released' },
];

export default function Notifications() {
  const navigation = useNavigation();
  const [filter, setFilter] = useState('All');
  const [filteredData, setFilteredData] = useState(NOTIFICATIONS_DATA);

  const filters = ['All', 'Approved', 'Pending', 'Available'];

  // Correct filter logic
  const applyFilter = (selectedFilter) => {
    setFilter(selectedFilter);
    if (selectedFilter === 'All') {
      setFilteredData(NOTIFICATIONS_DATA);
    } else if (selectedFilter === 'Approved') {
      setFilteredData(NOTIFICATIONS_DATA.filter((item) => item.status === 'Accepted'));
    } else if (selectedFilter === 'Pending') {
      setFilteredData(NOTIFICATIONS_DATA.filter((item) => item.status === 'Pending'));
    } else if (selectedFilter === 'Available') {
      setFilteredData(NOTIFICATIONS_DATA.filter((item) => item.status === 'Available'));
    }
  };

  const handleCardClick = (status) => {
    console.log('Navigating with status:', status); // Debugging
    navigation.navigate('NotificationDetails', { status });
  };

  return (
    <View style={styles.container}>
      {/* Filter Section */}
      <View style={styles.filterContainer}>
        {filters.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.filterButton, filter === item && styles.filterButtonActive]}
            onPress={() => applyFilter(item)}
          >
            <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notification List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationCard}
            onPress={() => handleCardClick(item.status)} // Pass correct status
          >
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications to display.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4', padding: 10 },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  filterButtonActive: { backgroundColor: '#7B0A0A' },
  filterText: { fontSize: 14, color: '#555' },
  filterTextActive: { color: '#FFFFFF', fontWeight: 'bold' },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    elevation: 3,
  },
  notificationTitle: { fontSize: 16, fontWeight: 'bold', color: '#7B0A0A' },
  notificationDate: { fontSize: 14, color: '#555555', marginTop: 5 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#888888', marginTop: 20 },
});