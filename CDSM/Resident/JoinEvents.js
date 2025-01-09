import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EVENTS_DATA = [
  { id: '1', date: '2024-07-01', title: 'Disaster Preparedness Workshop', time: '9:00 AM - 12:00 PM', location: 'Barangay Hall' },
  { id: '2', date: '2024-06-30', title: 'Tree Planting Activity', time: '8:00 AM - 10:00 PM', location: 'Barangay Park' },
  { id: '3', date: '2024-06-26', title: 'Disaster Preparedness Seminar', time: '9:00 AM - 3:00 PM', location: 'Barangay Covered Court' },
];

export default function JoinEvents({ navigation }) {
  const [joinedEvents, setJoinedEvents] = useState({});

  // Handle Join/Unjoin Event
  const handleToggleJoin = (id) => {
    if (joinedEvents[id]) {
      // Confirm "unjoin" action
      Alert.alert(
        "Unjoin Event",
        "Would you like to not join the event?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: () => handleUnjoinEvent(id) },
        ],
        { cancelable: true }
      );
    } else {
      // Mark as joined
      setJoinedEvents((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    }
  };

  const handleUnjoinEvent = (id) => {
    setJoinedEvents((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[id]; // Remove the event from joinedEvents
      return updatedState;
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
      </View>

      {/* Event List */}
      <FlatList
        data={EVENTS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            {/* Event Details */}
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventText}>📅 {item.date}</Text>
            <Text style={styles.eventText}>🕒 {item.time}</Text>
            <Text style={styles.eventText}>📍 {item.location}</Text>

            {/* Join Event Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  joinedEvents[item.id] && styles.buttonJoined,
                ]}
                onPress={() => handleToggleJoin(item.id)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    joinedEvents[item.id] && styles.buttonTextJoined,
                  ]}
                >
                  {joinedEvents[item.id] ? "Joining ✔" : "Join Event"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B0A0A',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B0A0A',
  },
  eventText: {
    fontSize: 14,
    color: '#555555',
    marginTop: 3,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#7B0A0A',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonJoined: {
    backgroundColor: '#F4F4F4', // Change background for "Joining" state
  },
  buttonTextJoined: {
    color: '#7B0A0A',
  },
});