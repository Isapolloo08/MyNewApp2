import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

export default function EventsResidents({ navigation }) {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return {
      day: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'short' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      fullDate: date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://brgyapp.lesterintheclouds.com/api/fetch_approved_programs.php');
        if (response.data.status === 'success') {
          const processedEvents = response.data.data
            .map((event) => ({
              ...event,
              startFormatted: formatDateTime(event.start),
              endFormatted: formatDateTime(event.end),
            }))
            .sort((a, b) => new Date(a.start) - new Date(b.start)); // Sort by start date

          setAllEvents(processedEvents);
          setEvents(processedEvents);
        } else {
          Alert.alert('Error', 'Failed to fetch events: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        Alert.alert('Error', 'Failed to fetch events. Please try again later.');
      }
    };

    fetchEvents();
  }, []);

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    const filteredEvents = allEvents.filter((event) => {
      const eventDate = event.start.split(' ')[0];
      return eventDate === day.dateString;
    });
    setEvents(filteredEvents);
  };

  const handleBackToDefault = () => {
    setSelectedDate('');
    setEvents(allEvents);
  };

  const markedDates = allEvents.reduce((acc, event) => {
    const datePart = event.start.split(' ')[0];
    if (datePart) {
      acc[datePart] = { marked: true, dotColor: '#7B0A0A' };
    }
    return acc;
  }, { [selectedDate || today]: { selected: true, selectedColor: '#7B0A0A' } });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Calendar</Text>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: '#7B0A0A',
            todayTextColor: '#7B0A0A',
            arrowColor: '#7B0A0A',
            dayTextColor: '#3B3B3B',
            selectedDayTextColor: '#FFFFFF',
          }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{selectedDate ? `Events on ${selectedDate}` : 'Upcoming Events'}</Text>

        {selectedDate && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackToDefault}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}

        <FlatList
          data={events}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => {
            const isSameDate = item.startFormatted.fullDate === item.endFormatted.fullDate;

            return (
              <TouchableOpacity
                style={styles.eventContainer}
                onPress={() => navigation.navigate('EventOverview', { event: item })}
              >
                <View style={styles.dateContainer}>
                  <Text style={styles.dateDay}>{item.startFormatted.day}</Text>
                  <Text style={styles.dateMonth}>{item.startFormatted.month}</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventDetail}>
                    <Text style={styles.bold}>WHEN: </Text>
                    {isSameDate
                      ? `${item.startFormatted.fullDate}, ${item.startFormatted.time} - ${item.endFormatted.time}`
                      : `${item.startFormatted.fullDate}, ${item.startFormatted.time} - ${item.endFormatted.fullDate}, ${item.endFormatted.time}`}
                  </Text>
                  <Text style={styles.eventDetail}>
                    <Text style={styles.bold}>WHERE: </Text>
                    {item.location}
                  </Text>
                  <Text style={styles.eventDetail}>
                    <Text style={styles.bold}>STATUS: </Text>
                    {item.status}
                  </Text>
                  <Text style={styles.seeDetails}>See details</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={<Text style={styles.noEventText}>No events scheduled for this date.</Text>}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 15, marginVertical: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#7B0A0A', marginBottom: 10 },
  backButton: { alignSelf: 'flex-start', marginBottom: 10, backgroundColor: '#7B0A0A', borderRadius: 5, padding: 5 },
  backButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  eventContainer: { flexDirection: 'row', backgroundColor: '#F3F1FF', borderRadius: 8, marginBottom: 10, padding: 10 },
  dateContainer: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 },
  dateDay: { fontSize: 30, fontWeight: 'bold', color: '#7B0A0A' },
  dateMonth: { fontSize: 16, color: '#7B0A0A' },
  detailsContainer: { flex: 1, justifyContent: 'center' },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#333333', marginBottom: 5 },
  eventDetail: { fontSize: 14, color: '#555555', marginBottom: 3 },
  bold: { fontWeight: 'bold', color: '#333333' },
  seeDetails: { color: '#7B0A0A', fontWeight: 'bold', marginTop: 5 },
  noEventText: { textAlign: 'center', color: '#888888', fontSize: 16, marginTop: 10 },
});