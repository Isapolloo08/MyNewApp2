import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Modal,
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
    const [report, setReport] = useState('');
    const [resolution, setResolution] = useState('');

    const handleNextPress = () => {
      if (!meetingName.trim() || !location.trim()) {
        Alert.alert('Error', 'Please fill in all required fields.');
      } else {
        navigation.navigate('Confirm', {
          meetingName,
          location,
          startTime: formatTime(startTime),
          endTime: formatTime(endTime),
          note,
        });
      }
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
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  remindText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  arrow: {
    marginLeft: 5,
    color: '#000', // Adjust arrow color here
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reminderOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  reminderText: {
    fontSize: 16,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFFFFF', // Initially white
  },
  filledCircle: {
    backgroundColor: '#710808', // Color when selected
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    height: 100,
    marginBottom: 100,
    textAlignVertical: 'top',
    borderRadius: 10,
  },
});

export default Agenda;
