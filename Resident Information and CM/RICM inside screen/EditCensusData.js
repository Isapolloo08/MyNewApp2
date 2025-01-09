import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const EditCensusData = ({ route, navigation }) => {
  const { resident } = route.params;

  const [formData, setFormData] = useState({
    contactNumber: resident.contactNumber || '',
    address: `${resident.purok || ''}, ${resident.barangay || ''}`,
    civilStatus: resident.civilStatus || '',
    occupation: resident.occupation || '',
    educationalAttainment: resident.educationalAttainment || '',
    religion: resident.religion || '',
    ethnicity: resident.ethnicity || '',
    psMember: resident.psMember || '',
    psHouseholdId: resident.psHouseholdId || '',
    philhealthMember: resident.philhealthMember || '',
    philhealthIdNumber: resident.philhealthIdNumber || '',
    membershipType: resident.membershipType || '',
    philhealthCategory: resident.philhealthCategory || '',
    medicalHistory: resident.medicalHistory || '',
    lmp: resident.lmp || '',
    usingFpMethod: resident.usingFpMethod || '',
    familyPlanningMethodUsed: resident.familyPlanningMethodUsed || '',
    familyPlanningStatus: resident.familyPlanningStatus || '',
    typeOfWaterSource: resident.typeOfWaterSource || '',
    typeOfToiletFacility: resident.typeOfToiletFacility || '',
    householdMembers: resident.householdMembers || [],
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.householdMembers];
    updatedMembers[index][field] = value;
    setFormData({ ...formData, householdMembers: updatedMembers });
  };

  const handleSave = () => {
    console.log('Saved data:', formData);
    navigation.navigate('CensusDetails', { resident: { ...resident, ...formData } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formBox}>
        {Object.keys(formData).filter(key => key !== 'householdMembers').map((key) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</Text>
            <TextInput
              style={styles.input}
              value={formData[key]}
              onChangeText={(text) => handleChange(key, text)}
            />
          </View>
        ))}

        <View style={styles.householdMembersContainer}>
          <Text style={styles.sectionTitle}>Household Members:</Text>
          {formData.householdMembers.map((member, index) => (
            <View key={index} style={styles.memberBox}>
              <Text style={styles.memberTitle}>Member {index + 1}</Text>
              {Object.keys(member).map((field) => (
                <View key={field} style={styles.inputGroup}>
                  <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</Text>
                  <TextInput
                    style={styles.input}
                    value={member[field]}
                    onChangeText={(text) => handleMemberChange(index, field, text)}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingBottom: 20,
  },
  formBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    margin: 16,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
  },
  householdMembersContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memberBox: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  memberTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EditCensusData;
