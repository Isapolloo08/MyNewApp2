import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const ViewRecordScreen = ({ route }) => {
  const { record } = route.params; // Access record from navigation params
  const screenWidth = Dimensions.get('window').width;

  const renderDocumentType = (documentType) => {
    switch (documentType) {
      case 'Barangay ID':
        return (
          <View style={[styles.idCard, { width: screenWidth * 0.9 }]}>
            <Image source={{ uri: 'path/to/photo-placeholder.png' }} style={styles.photo} />
            <View style={styles.details}>
              <Text style={styles.header}>Republic of the Philippines</Text>
              <Text style={styles.subHeader}>
                Province of Camarines Norte{'\n'}Municipality of Daet{'\n'}Barangay III
              </Text>
              <Text style={styles.highlight}>BARANGAY RESIDENTS IDENTIFICATION</Text>
              <Text style={styles.text}>Resident ID No: <Text style={styles.bold}>{record.id}</Text></Text>
              <Text style={styles.text}>Date Issued: <Text style={styles.bold}>{record.date}</Text></Text>
              <Text style={styles.text}>Name: <Text style={styles.bold}>{`${record.firstName} ${record.middleName} ${record.lastName} ${record.suffix}`}</Text></Text>
              <Text style={styles.text}>Address: <Text style={styles.bold}>Street Address, City, Province</Text></Text>
              <Text style={styles.text}>Gender: <Text style={styles.bold}>Gender</Text></Text>
              <Text style={styles.text}>Date of Birth: <Text style={styles.bold}>Date of Birth</Text></Text>
              <Text style={styles.text}>Civil Status: <Text style={styles.bold}>Status</Text></Text>
            </View>
          </View>
        );

      case 'Business Permit':
        return (
          <View style={[styles.content, { width: screenWidth * 0.9 }]}>
            <Image source={{ uri: 'path/to/philippines-logo.png' }} style={styles.logo} />
            <Text style={styles.title}>Republic of the Philippines</Text>
            <Text style={styles.title}>Province of Camarines Norte</Text>
            <Text style={styles.title}>Municipality of Daet</Text>
            <Text style={styles.title}>Barangay III</Text>
            <Text style={styles.subtitle}>OFFICE OF THE PUNONG BARANGAY</Text>
            <Text style={styles.subtitle}>BARANGAY BUSINESS CLEARANCE</Text>
            <Text style={styles.text}>PERMIT NO:</Text>
            <Text style={styles.text}>Permission is hereby granted to</Text>
            <Text style={styles.businessName}>PRU LIFE INSURANCE CORPORATION OF U.K</Text>
            <Text style={styles.text}>Located At UNIT 3 GACHE PLAZA, F. Pimentel Ave., Barangay III DAET, Camarines Norte To</Text>
            <Text style={styles.text}>MANAGE AND OPERATE Under The Commercial Name Of</Text>
            <Text style={styles.businessName}>PRU LIFE INSURANCE CORPORATION OF U.K</Text>
            <Text style={styles.text}>With owner address at TAGUIG CITY, effective today JANUARY 31, 2024 UP TO DECEMBER 31, 2024.</Text>
          </View>
        );

      case 'Certificate of Indigency':
        return (
          <View style={[styles.content, { width: screenWidth * 0.9 }]}>
            <Image source={{ uri: 'path/to/philippines-logo.png' }} style={styles.logo} />
            <Text style={styles.title}>Republic of the Philippines</Text>
            <Text style={styles.title}>Province of Camarines Norte</Text>
            <Text style={styles.title}>Municipality of Daet</Text>
            <Text style={styles.title}>Barangay III</Text>
            <Text style={styles.subtitle}>CERTIFICATE OF INDIGENCY</Text>
            <Text style={styles.text}>This is to certify that <Text style={styles.bold}>{`${record.firstName} ${record.middleName} ${record.lastName}`}</Text>, of legal age, resident of <Text style={styles.bold}>Address</Text>, is a bona fide resident of Barangay III, Municipality of Daet, Province of Camarines Norte.</Text>
            <Text style={styles.text}>Based on our records, the aforementioned individual is considered to be indigent.</Text>
            <Text style={styles.text}>This certification is issued upon the request of the individual concerned for whatever legal purposes it may serve.</Text>
            <Text style={styles.text}>Issued this {record.date} at Barangay III.</Text>
          </View>
        );

      case 'Barangay Clearance':
        return (
          <View style={[styles.content, { width: screenWidth * 0.9 }]}>
            <Image source={{ uri: 'path/to/philippines-logo.png' }} style={styles.logo} />
            <Text style={styles.title}>Republic of the Philippines</Text>
            <Text style={styles.title}>Province of Camarines Norte</Text>
            <Text style={styles.title}>Municipality of Daet</Text>
            <Text style={styles.title}>Barangay III</Text>
            <Text style={styles.subtitle}>CERTIFICATE OF NO OBJECTION</Text>
            <Text style={styles.text}>This is to certify that <Text style={styles.bold}>{`${record.firstName} ${record.middleName} ${record.lastName}`}</Text>, of legal age, is a resident of Barangay III, Municipality of Daet, Province of Camarines Norte.</Text>
            <Text style={styles.text}>After a thorough investigation, there is no objection to the request of the said individual for the issuance of a business permit or any other requirements.</Text>
            <Text style={styles.text}>Issued this {record.date} at Barangay III, Daet, Camarines Norte.</Text>
          </View>
        );

        case 'Barangay Certificate':
          return (
            <View style={[styles.content, { width: screenWidth * 0.9 }]}>
              <Image source={{ uri: 'path/to/philippines-logo.png' }} style={styles.logo} />
              <Text style={styles.title}>Republic of the Philippines</Text>
              <Text style={styles.title}>Province of Camarines Norte</Text>
              <Text style={styles.title}>Municipality of Daet</Text>
              <Text style={styles.title}>Barangay III</Text>
              <Text style={styles.subtitle}>CERTIFICATE OF NO OBJECTION</Text>
              <Text style={styles.text}>This is to certify that <Text style={styles.bold}>{`${record.firstName} ${record.middleName} ${record.lastName}`}</Text>, of legal age, is a resident of Barangay III, Municipality of Daet, Province of Camarines Norte.</Text>
              <Text style={styles.text}>After a thorough investigation, there is no objection to the request of the said individual for the issuance of a business permit or any other requirements.</Text>
              <Text style={styles.text}>Issued this {record.date} at Barangay III, Daet, Camarines Norte.</Text>
            </View>
          );

      default:
        return <Text style={styles.text}>Document type not recognized.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Record Details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Name: {`${record.firstName} ${record.middleName} ${record.lastName} ${record.suffix}`}</Text>
          <Text style={styles.detailText}>Purpose: {record.purpose}</Text>
          <Text style={styles.detailText}>Document Type: {record.documentType}</Text>
          <Text style={styles.detailText}>Date: {record.date}</Text>
          <Text style={styles.detailText}>Time: {record.time}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.horizontalScrollView}>
          {renderDocumentType(record.documentType)}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  idCard: {
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  photo: {
    width: 100,
    height: 130,
    borderRadius: 10,
    marginRight: 20,
  },
  details: {
    flex: 1,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 12,
    textAlign: 'center',
  },
  highlight: {
    backgroundColor: 'maroon',
    color: '#fff',
    padding: 5,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  content: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  businessName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  horizontalScrollView: {
    flexDirection: 'row',
  },
});

export default ViewRecordScreen;
