import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

// Define role to participant mapping
const roleToParticipant = {
  'Councilor for Disaster Preparedness': 'Councilor Ramon F. Labarro',
  'Councilor for Agriculture & Food': 'Councilor Ramon F. Labarro',
  'Councilor for Non-Government Org./People': 'Councilor Gigi M. Consuleo',
  'Councilor for Social Services': 'Councilor Arthur M. Panotes',
  'Councilor for Education, Culture & Arts': 'Councilor Paul Steven M. Ricasio',
  'Councilor for Labor & Employment/Livelihood': 'Councilor Rachel Jan S. Rafael',
  'Councilor for Finance, Budget & Appropriations': 'Councilor Paul Steven M. Ricasio',
  'Councilor for Senior Citizen': 'Councilor Alfonz Brien T. Cacayan',
  'Councilor for Women\'s, Children & Family Welfare': 'Councilor Gigi M. Consuleo',
  'Councilor for Personnel': 'Councilor Paul Steven M. Ricasio',
  'Councilor for Games & Amusement': 'Councilor Jose Aurelio A. Puso',
  'Councilor for Ways and Means/Tourism': 'Councilor Rachel Jan S. Rafael',
  'Councilor for Environmental Protection & Ecology': 'Councilor Arthur M. Panotes',
  'Councilor for PWD': 'Councilor Alfonz Brien T. Cacayan',
  'Councilor for Good Governance': 'Councilor Alfonz Brien T. Cacayan',
  'Councilor for Public Works and Infrastructure': 'Councilor Jose Aurelio A. Puso',
  'Councilor for Trade & Sanitation': 'Councilor Gigi M. Consuleo',
  'Councilor for Human Rights': 'Councilor Alfonz Brien T. Cacayan',
  'Councilor for Peace & Order': 'Councilor Arthur M. Panotes',
};

// Extract unique participants
const participants = Array.from(new Set(Object.values(roleToParticipant)));

const MeetingParticipants = ({ navigation, route }) => {
    const { meetingName, startTime, endTime, location, note } = route.params;
    const [participantName, setParticipantName] = useState('');
    const [participantRole, setParticipantRole] = useState('');
    const [participantList, setParticipantList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [manualRole, setManualRole] = useState(''); // Initialize as empty string
    const [manualParticipant, setManualParticipant] = useState(''); // Initialize as empty string
    const [showManualParticipant, setShowManualParticipant] = useState(false);
    const [showManualRole, setShowManualRole] = useState(false);
  
    useEffect(() => {
      const focusListener = navigation.addListener('focus', () => {
        if (route.params?.savedParticipantList) {
          setParticipantList(route.params.savedParticipantList);
        }
      });
  
      return focusListener;
    }, [navigation, route.params]);
  
    const roles = Object.keys(roleToParticipant).map(role => ({
      label: role,
      value: role,
    }));
  
    const filteredRoles = roles.filter(role => roleToParticipant[role.value] === participantName || participantName === '');
  
    const handleRoleChange = (role) => {
        setParticipantRole(role || '');
        if (role === 'manualRole') {
          setShowManualRole(true);
        } else {
          setShowManualRole(false);
        }
        if (participantName === 'manualParticipant' || role === 'manualRole') {
          setShowManualParticipant(true);
        } else {
          setShowManualParticipant(false);
        }
      };
      
      const handleParticipantChange = (participant) => {
        setParticipantName(participant || '');
        if (participant === 'manualParticipant') {
          setShowManualParticipant(true);
        } else {
          setShowManualParticipant(false);
        }
        if (participant === 'manualParticipant' || participantRole === 'manualRole') {
          setShowManualRole(true);
        } else {
          setShowManualRole(false);
          const roleList = roles.filter(role => roleToParticipant[role.value] === participant);
          setParticipantRole(roleList.length > 0 ? roleList[0].value : '');
        }
      };
      
  
    const addParticipant = () => {
        // Use default empty strings if the manual fields are null
        const nameToSave = participantName === 'manualParticipant' ? (manualParticipant || '').trim() : (participantName || '').trim();
        const roleToSave = participantRole === 'manualRole' ? (manualRole || '').trim() : (participantRole || '').trim();
      
        // Validate and add participant
        if ((nameToSave || manualParticipant.trim()) && (roleToSave || manualRole.trim())) {
          const newParticipant = {
            name: nameToSave,
            role: roleToSave,
          };
          if (selectedIndex !== null) {
            const updatedList = participantList.map((item, index) =>
              index === selectedIndex ? newParticipant : item
            );
            setParticipantList(updatedList);
            setSelectedIndex(null);
          } else {
            setParticipantList([...participantList, newParticipant]);
          }
          // Reset fields
          setParticipantName('');
          setParticipantRole('');
          setManualParticipant('');
          setManualRole('');
          setShowManualParticipant(false);
          setShowManualRole(false);
        } else {
          Alert.alert('Error', 'Please fill in both fields.');
        }
      };
    
      
    const handleNextPress = () => {
      if (participantList.length === 0) {
        Alert.alert('Error', 'Please add at least one participant.');
      } else {
        navigation.navigate('MeetingExpenses', {
          meetingName,
          
          startTime,
          endTime,
          location,
          note,
          savedParticipantList: participantList
        });
      }
    };
  
    const handleItemPress = (index) => {
      if (index === selectedIndex) {
        setSelectedIndex(null);
        setParticipantName('');
        setParticipantRole('');
      } else {
        setSelectedIndex(index);
        setParticipantName(participantList[index].name);
        setParticipantRole(participantList[index].role);
      }
    };
  
    const handleDelete = () => {
      if (selectedIndex !== null) {
        const updatedList = participantList.filter((_, index) => index !== selectedIndex);
        setParticipantList(updatedList);
        setSelectedIndex(null);
        setParticipantName('');
        setParticipantRole('');
      } else {
        Alert.alert('Error', 'Please select an item to delete.');
      }
    };
  
    const handleCancel = () => {
      setSelectedIndex(null);
      setParticipantName('');
      setParticipantRole('');
    };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <View style={styles.step}>
            <Text style={[styles.stepLabel, styles.doneLabel]}>Meeting</Text>
            <View style={[styles.stepNumber, styles.doneStep]}>
              <Icon name="check" size={15} color="#FFF" />
            </View>
          </View>
          <View style={[styles.step, styles.activeStep]}>
            <Text style={[styles.stepLabel, styles.activeLabel]}>Participants</Text>
            <Text style={[styles.stepNumber, styles.activeNumber]}>2</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepLabel}>Other Expenses</Text>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepLabel}>Confirmation</Text>
            <Text style={styles.stepNumber}>4</Text>
          </View>
        </View>

        {/* Form for adding or updating participants */}
        <View style={styles.form}>
  <Text style={styles.label}>
    Participant Name <Text style={styles.required}>*</Text>
  </Text>
  <RNPickerSelect
    placeholder={{ label: 'Select a participant...', value: null }}
    items={[...participants.map(p => ({ label: p, value: p })), { label: 'Other', value: 'manualParticipant' }]}
    value={participantName}
    onValueChange={handleParticipantChange}
    style={pickerSelectStyles}
  />
  {showManualParticipant && (
    <TextInput
      style={styles.input}
      placeholder="Type participant here"
      value={manualParticipant}
      onChangeText={setManualParticipant}
    />
  )}

  <Text style={styles.label}>
    Role <Text style={styles.required}>*</Text>
  </Text>
  <RNPickerSelect
    placeholder={{ label: 'Select a role...', value: null }}
    items={[...filteredRoles, { label: 'Other', value: 'manualRole' }]}
    value={participantRole}
    onValueChange={handleRoleChange}
    style={pickerSelectStyles}
  />
  {showManualRole && (
    <TextInput
      style={styles.input}
      placeholder="Type role here"
      value={manualRole}
      onChangeText={setManualRole}
    />
  )}
  <TouchableOpacity style={styles.addButton} onPress={addParticipant}>
    <Icon name={selectedIndex !== null ? 'refresh' : 'plus'} size={15} color="#FFF" style={styles.addIcon} />
    <Text style={styles.addButtonText}>{selectedIndex !== null ? 'Update' : 'Add'}</Text>
  </TouchableOpacity>
</View>

      </View>


      {/* Table of participants */}
      <View style={styles.bottomContainer}>
        <View style={styles.tableContainer}>
          {/* Table header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>No.</Text>
            <View style={styles.separator} />
            <Text style={[styles.tableHeaderText, { flex: 3 }]}>Participant</Text>
            <View style={styles.separator} />
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Role</Text>
          </View>
          {/* Table rows */}
          <FlatList
            data={participantList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleItemPress(index)} style={{ flex: 1 }}>
                <View style={[styles.tableRow, index % 2 === 0 && styles.tableRowEven, selectedIndex === index && styles.selectedRow]}>
                  <Text style={[styles.tableCell, { flex: 1, textAlign: 'center' }]}>{index + 1}</Text>
                  <View style={styles.separator} />
                  <Text style={[styles.tableCell, { flex: 3 }]}>{item.name}</Text>
                  <View style={styles.separator} />
                  <Text style={[styles.tableCell, { flex: 2 }]}>{item.role}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Buttons for delete and cancel */}
        {(selectedIndex !== null) && (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.cancelButton, { width: '45%' }]} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.deleteButton, { width: '45%' }]} onPress={handleDelete}>
              <Icon name="trash" size={15} color="#FFF" />
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Next button */}
        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={handleNextPress} color="#710808" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  topContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    marginBottom: 16,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    justifyContent: 'space-between',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    marginBottom: 40,
  },
  step: {
    alignItems: 'center',
  },
  stepLabel: {
    color: '#D9D9D9',
    marginBottom: 4,
    fontSize: 10,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneLabel: {
    color: '#710808', // Red color for done step label
  },
  doneStep: {
    backgroundColor: '#710808', // Red background for done step
  },
  activeStep: {
    alignItems: 'center',
  },
  activeLabel: {
    color: '#000',
  },
  activeNumber: {
    backgroundColor: '#710808',
  },
  form: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  required: {
    color: '#710808',
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#FFF',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#710808',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    marginRight: 5,
  },
  addButtonText: {
    color: '#FFF',
  },
  tableContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CCC', // Color of the separation line
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#710808',
    padding: 8,
  },
  tableHeaderText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  tableRowEven: {
    backgroundColor: '#F5F5F5',
  },
  selectedRow: {
    backgroundColor: '#D9D9D9',
  },
  tableCell: {
    textAlign: 'center',
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#710808',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: '#CCC',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
  },
  buttonContainer: {
    width: 325,
  },
  separator: {
    width: 1,
    backgroundColor: '#CCC',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
    fontSize: 16,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
    fontSize: 16,
  },
  placeholder: {
    color: '#999',
  },
});

export default MeetingParticipants;
