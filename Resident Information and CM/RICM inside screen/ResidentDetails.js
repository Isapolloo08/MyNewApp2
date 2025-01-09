import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ResidentDetails = ({ route, navigation }) => {
  const { resident } = route.params;

  const formatDate = (date) => {
    // Check if date is valid
    if (!date) return ''; // Return empty string if date is not defined

    // Convert Date object to string
    return new Date(date).toLocaleDateString(); // Adjust date format as needed
  };

  const handleEdit = () => {
    // Navigate to the edit screen with the resident's data
    navigation.navigate('EditResident', { resident });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailsBox}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            {resident.imageUri ? (
              <Image source={{ uri: resident.imageUri }} style={styles.image} />
            ) : (
              <View style={styles.placeholderImage} />
            )}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{`${resident.firstName} ${resident.middleName} ${resident.lastName} ${resident.suffix}`}</Text>
            <Text style={styles.relationshipText}>{resident.relationship}</Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Household Head: </Text>
          <Text style={styles.detailText}>{resident.householdHeadName}</Text>
          <Text style={styles.detailLabel}>Household Number: </Text>
          <Text style={styles.detailText}>{resident.householdNumber}</Text>
          <Text style={styles.detailLabel}>Contact Number: </Text>
          <Text style={styles.detailText}>{resident.contactNumber}</Text>
          <Text style={styles.detailLabel}>Address: </Text>
          <Text style={styles.detailText}>{`${resident.purok}, ${resident.barangay}`}</Text>
          <Text style={styles.detailLabel}>Date of Birth: </Text>
          <Text style={styles.detailText}>{resident.dateOfBirth}</Text>
          <Text style={styles.detailLabel}>Age: </Text>
          <Text style={styles.detailText}>{`${resident.age}, ${resident.classificationByAgeHealth}`}</Text>
          <Text style={styles.detailLabel}>Sex: </Text>
          <Text style={styles.detailText}>{resident.sex}</Text>
          <Text style={styles.detailLabel}>Civil Status: </Text>
          <Text style={styles.detailText}>{resident.civilStatus}</Text>
          <Text style={styles.detailLabel}>Citizenship: </Text>
          <Text style={styles.detailText}>{resident.citizenship}</Text>
          <Text style={styles.detailLabel}>Occupation: </Text>
          <Text style={styles.detailText}>{resident.occupation}</Text>
          <Text style={styles.detailLabel}>Educational Attainment: </Text>
          <Text style={styles.detailText}>{resident.educationalAttainment}</Text>
          <Text style={styles.detailLabel}>Religion: </Text>
          <Text style={styles.detailText}>{resident.religion}</Text>
          <Text style={styles.detailLabel}>Ethnicity: </Text>
          <Text style={styles.detailText}>{resident.ethnicity}</Text>
          <Text style={styles.detailLabel}>4Ps Member: </Text>
          <Text style={styles.detailText}>{`${resident.psMember} ${resident.psHouseholdId}`}</Text>
          <Text style={styles.detailLabel}>Philhealth Member: </Text>
          <Text style={styles.detailText}>{`${resident.philhealthMember} ${resident.philhealthIdNumber} ${resident.membershipType} ${resident.philhealthCategory}`}</Text>
          <Text style={styles.detailLabel}>Medical History: </Text>
          <Text style={styles.detailText}>{resident.medicalHistory}</Text>
          <Text style={styles.detailLabel}>LMP and Family Planning: </Text>
          <Text style={styles.detailText}>{`${resident.lmp} ${resident.usingFpMethod} ${resident.familyPlanningMethodUsed} ${resident.familyPlanningStatus}`} </Text>
          <Text style={styles.detailLabel}>Type of Water Source: </Text>
          <Text style={styles.detailText}>{resident.typeOfWaterSource}</Text>
          <Text style={styles.detailLabel}>Type of Toilet Facility: </Text>
          <Text style={styles.detailText}>{resident.typeOfToiletFacility}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
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
  relationshipText: {
    fontSize: 18,
  },
  detailContainer: {
    marginTop: 10,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold', // Bold style for labels
    marginBottom: 5,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 10,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ResidentDetails;
