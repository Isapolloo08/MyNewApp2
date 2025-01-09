import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const EditResident = ({ route, navigation }) => {
    const { resident } = route.params;
    const [editedResident, setEditedResident] = useState({ ...resident });

    const handleSave = () => {
      // Save edited resident data
      saveEditedResident(editedResident);
      // Navigate to details screen with updated resident data
      navigation.navigate('ResidentDetails', { resident: editedResident });
    };

    const handleChange = (key, value) => {
      // Update edited resident data
      setEditedResident({
        ...editedResident,
        [key]: value,
      });
    };

    // Function to save edited resident data
    const saveEditedResident = (updatedResident) => {
      // Log changes to ResidentHistory
      logResidentHistory(resident, updatedResident);
      // Update the resident data in your data store (state management or backend)
      // Here you would implement the logic to save the updatedResident data to your data store
    };

    // Function to log changes to ResidentHistory
    const logResidentHistory = (originalResident, updatedResident) => {
      const changes = {};
      for (const key in originalResident) {
        if (originalResident[key] !== updatedResident[key]) {
          changes[key] = {
            oldValue: originalResident[key],
            newValue: updatedResident[key],
          };
        }
      }
      // Here you would implement the logic to save the changes to your ResidentHistory data store
      console.log('Logged changes to ResidentHistory:', changes);
    };

    // Function to render editable or non-editable fields
    const renderField = (label, value, editable, key, hasBottomBorder) => {
      return (
        <View style={[styles.fieldContainer, hasBottomBorder && styles.bottomBorder]} key={key}>
          <Text style={styles.label}>{label}:</Text>
          {!editable ? (
            <Text style={styles.value}>{value}</Text>
          ) : (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(text) => handleChange(key, text)}
            />
          )}
        </View>
      );
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.detailsBox}>
          <View style={styles.topContainer}>
            <View style={styles.imageContainer}>
              {editedResident.imageUri ? (
                <Image source={{ uri: editedResident.imageUri }} style={styles.image} />
              ) : (
                <View style={styles.placeholderImage} />
              )}
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{`${editedResident.firstName} ${editedResident.middleName} ${editedResident.lastName} ${editedResident.suffix}`}</Text>
            </View>
          </View>
          <View style={styles.detailContainer}>
            {renderField('Household Head', `${editedResident.householdHeadName} ${editedResident.relationship}`, false, 'householdHead')}
            {renderField('Date of Birth', editedResident.dateOfBirth, false, 'dateOfBirth', true)}
            {renderField('Age', `${editedResident.age}`, false, 'age', true)}
            {renderField('Sex', editedResident.sex, false, 'sex', true)}
            {renderField('Ethnicity', editedResident.ethnicity, false, 'ethnicity', true)}
            {renderField('Contact Number', editedResident.contactNumber, true, 'contactNumber')}
            {renderField('Address', `${editedResident.purok}, ${editedResident.barangay}`, true, 'address')}
            {renderField('Civil Status', editedResident.civilStatus, true, 'civilStatus')}
            {renderField('Citizenship', editedResident.citizenship, true, 'citizenship')}
            {renderField('Occupation', editedResident.occupation, true, 'occupation')}
            {renderField('Educational Attainment', editedResident.educationalAttainment, true, 'educationalAttainment')}
            {renderField('Religion', editedResident.religion, true, 'religion')}
            {renderField('4Ps Member', editedResident.psMember, true, 'psMember')}
            {renderField('Philhealth Member', editedResident.philhealthMember, true, 'philhealthMember')}
            {renderField('Medical History', editedResident.medicalHistory, true, 'medicalHistory')}
            {renderField('Type of Water Source', editedResident.typeOfWaterSource, true, 'typeOfWaterSource')}
            {renderField('Type of Toilet Facility', editedResident.typeOfToiletFacility, true, 'typeOfToiletFacility')}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: '#f0f0f0',
    },
    detailsBox: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 20,
      marginBottom: 20,
    },
    topContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      overflow: 'hidden',
      marginRight: 20,
      marginBottom: 20,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    placeholderImage: {
      width: 100,
      height: 100,
      backgroundColor: '#ccc',
      borderRadius: 50,
    },
    nameContainer: {
      flex: 1,
    },
    nameText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    value: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      fontSize: 18,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      paddingBottom: 5,
    },
    detailContainer: {
      marginTop: 10,
    },
    fieldContainer: {
      marginBottom: 15,
    },
    bottomBorder: {
      borderBottomWidth: 1,
      borderBottomColor: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      flex: 1,
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#007bff',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
});

export default EditResident;
