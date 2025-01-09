import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';

console.disableYellowBox = true;

const CCalendar = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventName, setEventName] = useState('');
  const [showNoEventMessage, setShowNoEventMessage] = useState(false);
  const [approvedPrograms, setApprovedPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchApprovedPrograms = async () => {
      try {
        const response = await axios.get('http://192.168.75.106:3001/programs');
        const approved = response.data
          .filter(program => program.status === 'Approved')
          .map(program => ({
            ...program,
            startDate: moment(program.startDate, 'ddd, MMMM D, YYYY').format('YYYY-MM-DD'),
            endDate: moment(program.endDate, 'ddd, MMMM D, YYYY').format('YYYY-MM-DD')
          }));
        setApprovedPrograms(approved);
        console.log('Fetched approved programs:', approved); // Debugging log
      } catch (error) {
        console.error('Error fetching approved programs:', error);
      }
    };

    fetchApprovedPrograms();
  }, []);

  const onDateChange = (date) => {
    setSelectedStartDate(date);
    const selectedDate = moment(date).format('YYYY-MM-DD'); // Convert to YYYY-MM-DD format

    console.log('Selected date:', selectedDate); // Debugging log

    const programsForDate = approvedPrograms.filter(program => {
      const programStartDate = moment(program.startDate).format('YYYY-MM-DD');
      const programEndDate = moment(program.endDate).format('YYYY-MM-DD');

      console.log('Program date range:', programStartDate, 'to', programEndDate); // Debugging log

      return selectedDate >= programStartDate && selectedDate <= programEndDate; // Inclusive range
    });

    console.log('Programs for selected date:', programsForDate); // Debugging log

    setFilteredPrograms(programsForDate);
    setShowNoEventMessage(programsForDate.length === 0);
  };

  const handleEventSelect = (eventName) => {
    setEventName(eventName);
    setSelectedEvent(eventName);

    if (eventName === 'Meeting') {
      navigation.navigate('ProposeMeeting');
    } else if (eventName === 'Activity') {
      navigation.navigate('ProposeActivity');
    } else if (eventName === 'Event') {
      navigation.navigate('ProposeEvent');
    }
  };

  const handlePress = (programId) => {
    navigation.navigate('SeeDetails', { programId });
  };

  const formatDate = (dateString) => {
    const date = moment(dateString, 'YYYY-MM-DD');
    if (!date.isValid()) {
      console.error('Invalid date:', dateString);
      return 'Invalid Date';
    }
    return date.format('MMMM D, YYYY');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: getBackgroundColorForType(item.programType) }]}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDate(item.startDate)} - {formatDate(item.endDate)}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>{item.programType} Name:</Text>
          <Text style={styles.value}>{item.programName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{item.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Proposed By:</Text>
          <Text style={styles.value}>{item.proposedBy}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Committee:</Text>
          <Text style={styles.value}>{item.committee}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Budget:</Text>
          <Text style={styles.value}>{item.budget}</Text>
        </View>
        <TouchableOpacity onPress={() => handlePress(item.programId)}>
          <Text style={styles.seeDetails}>See details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getBackgroundColorForType = (type) => {
    switch (type) {
      case 'Event':
        return '#E0E7FF'; // Light Blue for Event container
      case 'Activity':
        return '#F4EAEA'; // Light Red for Activity container
      case 'Meeting':
        return '#FFF9E5'; // Light Yellow for Meeting container
      default:
        return '#FFFFFF'; // White for default
    }
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        onDateChange={onDateChange}
        selectedStartDate={selectedStartDate}
        todayBackgroundColor="#710808"
        selectedDayColor="#710808"
        selectedDayTextColor="#FFFFFF"
        style={styles.calendar}
      />
      {showNoEventMessage && (
        <View style={styles.bottomContainer}>
          <Text style={styles.noEventText}>There is no program scheduled for this date</Text>
        </View>
      )}
      {filteredPrograms.length > 0 ? (
        <FlatList
          data={filteredPrograms}
          renderItem={renderItem}
          keyExtractor={(item) => item.programId.toString()}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  calendar: {
    // Define any specific styling for the calendar here if needed
  },
  bottomContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 70,
    alignItems: 'center',
    zIndex: 8,
  },
  noEventText: {
    fontSize: 16,
    color: '#710808',
  },
  card: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  dateContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 30,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 16,
  },
  seeDetails: {
    color: '#007BFF',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default CCalendar;
