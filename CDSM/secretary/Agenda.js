import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Agenda = ({ navigation }) => {
    const [meetingName, setMeetingName] = useState('');
    const [location, setLocation] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [note, setNote] = useState('');
    const [isStartPickerVisible, setStartPickerVisible] = useState(false);
    const [isEndPickerVisible, setEndPickerVisible] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

    const handleStartConfirm = (date) => {
      setStartTime(date);
      setStartPickerVisible(false);
    };

    const handleEndConfirm = (date) => {
      setEndTime(date);
      setEndPickerVisible(false);
    };

    const handleEndDateConfirm = (date) => {
      setEndDate(date);
      setEndDatePickerVisible(false);
    };

    const handleNextPress = () => {
      if (!meetingName.trim() || !location.trim()) {
        Alert.alert('Error', 'Please fill in all required fields.');
      } else {
        navigation.navigate('Attendance', {
          meetingName,
          location,
          startTime: formatTime(startTime),
          endTime: formatTime(endTime),
          endDate: formatDate(endDate),
          note,
        });
      }
    };

    const formatTime = (dateTime) => {
      return dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.outerContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps='handled'
        >
          {/* Top Container: Steps to Location */}
          <View style={styles.topContainer}>
            <View style={styles.stepIndicator}>
              <View style={styles.stepContainer}>
                <Text style={styles.stepLabel}>Agenda</Text>
                <Text style={styles.step}>1</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={[styles.stepLabel, { color: '#D9D9D9' }]}>Attendants</Text>
                <Text style={[styles.step, { backgroundColor: '#D9D9D9', color: '#FFF' }]}>2</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={[styles.stepLabel, { color: '#D9D9D9' }]}>Report & Resolution</Text>
                <Text style={[styles.step, { backgroundColor: '#D9D9D9', color: '#FFF' }]}>3</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={[styles.stepLabel, { color: '#D9D9D9' }]}>Confirmation</Text>
                <Text style={[styles.step, { backgroundColor: '#D9D9D9', color: '#FFF' }]}>4</Text>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <View style={[styles.line, { backgroundColor: '#D9D9D9' }]} />
              <View style={[styles.line, { backgroundColor: '#D9D9D9' }]} />
              <View style={[styles.line, { backgroundColor: '#D9D9D9' }]} />
            </View>
            <Text style={styles.label}>Agenda<Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Meeting Name"
              value={meetingName}
              onChangeText={setMeetingName}
            />
            <Text style={styles.label}>Location <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Location"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Bottom Container: Time Pickers to Next Button */}
          <View style={styles.bottomContainer}>
            <View style={styles.row}>
              <Text style={styles.rowText}>Start Time</Text>
              <TouchableOpacity onPress={() => setStartPickerVisible(true)}>
                <Text style={styles.dateText}>
                  {formatTime(startTime)}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isStartPickerVisible}
              mode="time"
              onConfirm={handleStartConfirm}
              onCancel={() => setStartPickerVisible(false)}
              customHeaderIOS={() => <Text style={{ color: '#710808', fontWeight: 'bold', fontSize: 18 }}>Pick a Time</Text>}
            />
            <View style={styles.row}>
              <Text style={styles.rowText}>End Time</Text>
              <TouchableOpacity onPress={() => setEndPickerVisible(true)}>
                <Text style={styles.dateText}>
                  {formatTime(endTime)}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isEndPickerVisible}
              mode="time"
              onConfirm={handleEndConfirm}
              onCancel={() => setEndPickerVisible(false)}
              customHeaderIOS={() => <Text style={{ color: '#710808', fontWeight: 'bold', fontSize: 18 }}>Pick a Time</Text>}
            />
            <View style={styles.row}>
              <Text style={styles.rowText}>Date</Text>
              <TouchableOpacity onPress={() => setEndDatePickerVisible(true)}>
                <Text style={styles.dateText}>
                  {formatDate(endDate)}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="date"
              onConfirm={handleEndDateConfirm}
              onCancel={() => setEndDatePickerVisible(false)}
              customHeaderIOS={() => <Text style={{ color: '#710808', fontWeight: 'bold', fontSize: 18 }}>Pick a Date</Text>}
            />
            <Button title="Next" onPress={handleNextPress} color="#710808" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    marginTop: 10,
    padding: 20,
  },
  bottomContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepLabel: {
    marginBottom: 5,
    fontSize: 10,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#710808',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 30,
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rowText: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#710808',
    fontWeight: 'bold',
  },
});

export default Agenda;