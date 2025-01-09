import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CensusDetails = ({ route, navigation }) => {
  const { resident } = route.params;

  // Utility function to safely handle undefined or null values
  const safeValue = (value) => {
    return value !== undefined && value !== null ? value : '';
  };

  const formatDate = (date) => {
    if (!date) return ''; // Return empty string if date is not defined
    return new Date(date).toLocaleDateString(); // Adjust date format as needed
  };

  const handleEdit = () => {
    // Navigate to the edit screen with the resident's data
    navigation.navigate('EditCensusData', { resident });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailsBox}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            {safeValue(resident.imageUri) ? (
              <Image source={{ uri: safeValue(resident.imageUri) }} style={styles.image} />
            ) : (
              <View style={styles.placeholderImage} />
            )}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{`${safeValue(resident.firstName)} ${safeValue(resident.middleName)} ${safeValue(resident.lastName)} ${safeValue(resident.suffix)}`}</Text>
            <Text style={styles.relationshipText}>{safeValue(resident.relationship)}</Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Household Head: </Text>
          <Text style={styles.detailText}>{safeValue(resident.householdHeadName)}</Text>
          <Text style={styles.detailLabel}>Household Number: </Text>
          <Text style={styles.detailText}>{safeValue(resident.householdNumber)}</Text>
          <Text style={styles.detailLabel}>Contact Number: </Text>
          <Text style={styles.detailText}>{safeValue(resident.contactNumber)}</Text>
          <Text style={styles.detailLabel}>Address: </Text>
          <Text style={styles.detailText}>{`${safeValue(resident.purok)}, ${safeValue(resident.barangay)}`}</Text>
          <Text style={styles.detailLabel}>Date of Birth: </Text>
          <Text style={styles.detailText}>{formatDate(resident.dateOfBirth)}</Text>
          <Text style={styles.detailLabel}>Age: </Text>
          <Text style={styles.detailText}>{`${safeValue(resident.age)}, ${safeValue(resident.classificationByAgeHealth)}`}</Text>
          <Text style={styles.detailLabel}>Sex: </Text>
          <Text style={styles.detailText}>{safeValue(resident.sex)}</Text>
          <Text style={styles.detailLabel}>Civil Status: </Text>
          <Text style={styles.detailText}>{safeValue(resident.civilStatus)}</Text>
          <Text style={styles.detailLabel}>Citizenship: </Text>
          <Text style={styles.detailText}>{safeValue(resident.citizenship)}</Text>
          <Text style={styles.detailLabel}>Occupation: </Text>
          <Text style={styles.detailText}>{safeValue(resident.occupation)}</Text>
          <Text style={styles.detailLabel}>Educational Attainment: </Text>
          <Text style={styles.detailText}>{safeValue(resident.educationalAttainment)}</Text>
          <Text style={styles.detailLabel}>Religion: </Text>
          <Text style={styles.detailText}>{safeValue(resident.religion)}</Text>
          <Text style={styles.detailLabel}>Ethnicity: </Text>
          <Text style={styles.detailText}>{safeValue(resident.ethnicity)}</Text>
          <Text style={styles.detailLabel}>4Ps Member: </Text>
          <Text style={styles.detailText}>{`${safeValue(resident.psMember)} ${safeValue(resident.psHouseholdId)}`}</Text>
          <Text style={styles.detailLabel}>Philhealth Member: </Text>
          <Text style={styles.detailText}>{`${safeValue(resident.philhealthMember)} ${safeValue(resident.philhealthIdNumber)} ${safeValue(resident.membershipType)} ${safeValue(resident.philhealthCategory)}`}</Text>
          <Text style={styles.detailLabel}>Medical History: </Text>
          <Text style={styles.detailText}>{safeValue(resident.medicalHistory)}</Text>
          <Text style={styles.detailLabel}>LMP and Family Planning: </Text>
          <Text style={styles.detailText}>{`${safeValue(resident.lmp)} ${safeValue(resident.usingFpMethod)} ${safeValue(resident.familyPlanningMethodUsed)} ${safeValue(resident.familyPlanningStatus)}`}</Text>
          <Text style={styles.detailLabel}>Type of Water Source: </Text>
          <Text style={styles.detailText}>{safeValue(resident.typeOfWaterSource)}</Text>
          <Text style={styles.detailLabel}>Type of Toilet Facility: </Text>
          <Text style={styles.detailText}>{safeValue(resident.typeOfToiletFacility)}</Text>
        </View>

        <View style={styles.householdMembersContainer}>
          <Text style={styles.sectionTitle}>Household Members:</Text>
          {resident.householdMembers && resident.householdMembers.length > 0 ? (
            resident.householdMembers.map((member, index) => (
              <View key={index} style={styles.memberContainer}>
                <Text style={styles.detailLabel}>Name: </Text>
                <Text style={styles.detailText}>{`${safeValue(member.firstName)} ${safeValue(member.middleName)} ${safeValue(member.lastName)} ${safeValue(member.suffix)}`}</Text>
                <Text style={styles.detailLabel}>Relationship: </Text>
                <Text style={styles.detailText}>{safeValue(member.relationship)}</Text>
                <Text style={styles.detailLabel}>Contact Number: </Text>
                <Text style={styles.detailText}>{safeValue(member.contactNumber)}</Text>
                <Text style={styles.detailLabel}>Date of Birth: </Text>
                <Text style={styles.detailText}>{formatDate(member.dateOfBirth)}</Text>
                <Text style={styles.detailLabel}>Age: </Text>
                <Text style={styles.detailText}>{safeValue(member.age)}</Text>
                <Text style={styles.detailLabel}>Sex: </Text>
                <Text style={styles.detailText}>{safeValue(member.sex)}</Text>
                <Text style={styles.detailLabel}>Civil Status: </Text>
                <Text style={styles.detailText}>{safeValue(member.civilStatus)}</Text>
                <Text style={styles.detailLabel}>Occupation: </Text>
                <Text style={styles.detailText}>{safeValue(member.occupation)}</Text>
                <Text style={styles.detailLabel}>Educational Attainment: </Text>
                <Text style={styles.detailText}>{safeValue(member.educationalAttainment)}</Text>
                <Text style={styles.detailLabel}>Religion: </Text>
                <Text style={styles.detailText}>{safeValue(member.religion)}</Text>
                <Text style={styles.detailLabel}>Medical History: </Text>
                <Text style={styles.detailText}>{safeValue(member.medicalHistory)}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noMembersText}>No household members available.</Text>
          )}
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 15,
  },
  householdMembersContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memberContainer: {
    marginBottom: 20,
  },
  noMembersText: {
    fontSize: 18,
    color: '#888',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CensusDetails;
