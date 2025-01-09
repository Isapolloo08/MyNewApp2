import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const KagawadCensusDetails = ({ route }) => {
  const { resident } = route.params;

  // Utility function to safely handle undefined or null values
  const safeValue = (value) => {
    return value !== undefined && value !== null ? value : '';
  };

  const formatDate = (date) => {
    if (!date) return ''; // Return empty string if date is not defined
    return new Date(date).toLocaleDateString(); // Adjust date format as needed
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
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 10,
    marginTop: 5,
  },
});

export default KagawadCensusDetails;
