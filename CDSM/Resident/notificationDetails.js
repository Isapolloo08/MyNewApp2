import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const notificationDetails = {
  available: {
    title: 'FINANCIAL ASSISTANCE FOR COLLEGE STUDENTS',
    description:
      'We are pleased to announce a new Financial Assistance Program aimed at supporting students in our community. This program provides financial aid to assist with educational expenses.',
    slots: '20 College Students (Only the first 20 students to submit the requirements will be accepted.)',
    requirements: [
      'Certificate of Enrollment',
      'Certificate of Grades',
      'Certificate of Indigency',
      'Scanned Copy of Valid ID or School ID',
    ],
    button: 'SUBMIT REQUIREMENTS',
  },
  pending: {
    title: 'FINANCIAL ASSISTANCE FOR COLLEGE STUDENTS',
    description:
      'We are pleased to announce a new Financial Assistance Program aimed at supporting students in our community. This program provides financial aid to assist with educational expenses.',
    slots: '20 College Students (Only the first 20 students to submit the requirements will be accepted.)',
    requirements: [
      'Certificate of Enrollment',
      'Certificate of Grades',
      'Certificate of Indigency',
      'Scanned Copy of Valid ID or School ID',
    ],
    status: 'PENDING',
  },
  accepted: {
    title: 'FINANCIAL ASSISTANCE FOR COLLEGE STUDENTS',
    recipient: 'Sofia',
    message: 'Your application for the Financial Assistance Program has been approved.',
    claimDetails: {
      date: 'July 4, 2024',
      location: 'Barangay Covered Court',
      documents: 'Valid ID or Updated School ID',
    },
  },
};

export default function NotificationDetails({ route, navigation }) {
  const { status } = route.params;

  const renderAvailable = () => (
    <ScrollView style={styles.card}>
      <Text style={styles.title}>{notificationDetails.available.title}</Text>
      <View style={styles.imagePlaceholder} />
      <Text style={styles.bodyText}>Dear Residents of Barangay III,</Text>
      <Text style={styles.bodyText}>{notificationDetails.available.description}</Text>

      <Text style={styles.subHeader}>SLOTS AVAILABLE:</Text>
      <Text style={styles.bodyText}>• {notificationDetails.available.slots}</Text>

      <Text style={styles.subHeader}>REQUIREMENTS:</Text>
      {notificationDetails.available.requirements.map((req, index) => (
        <Text key={index} style={styles.bodyText}>
          • {req}
        </Text>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('SubmitRequirements', {
            requirements: notificationDetails.available.requirements,
          })
        }
      >
        <Text style={styles.buttonText}>{notificationDetails.available.button}</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderPending = () => (
    <View style={styles.card}>
      <Text style={styles.title}>{notificationDetails.pending.title}</Text>
      <View style={styles.imagePlaceholder} />
      <Text style={styles.bodyText}>Dear Residents of Barangay III,</Text>
      <Text style={styles.bodyText}>{notificationDetails.pending.description}</Text>

      <Text style={styles.subHeader}>SLOTS AVAILABLE:</Text>
      <Text style={styles.bodyText}>• {notificationDetails.pending.slots}</Text>

      <Text style={styles.subHeader}>REQUIREMENTS:</Text>
      {notificationDetails.pending.requirements.map((req, index) => (
        <Text key={index} style={styles.bodyText}>
          • {req}
        </Text>
      ))}

      <Text style={styles.pendingText}>
        APPLICATION STATUS: <Text style={styles.pendingStatus}>PENDING</Text>
      </Text>
    </View>
  );

  const renderAccepted = () => (
    <View style={styles.card}>
      <Text style={styles.title}>{notificationDetails.accepted.title}</Text>
      <View style={styles.imagePlaceholder} />
      <Text style={styles.bodyText}>Dear {notificationDetails.accepted.recipient},</Text>

      <Text style={styles.bodyText}>
        <Text style={styles.boldText}>Congratulations!</Text> {notificationDetails.accepted.message}
      </Text>

      <Text style={styles.subHeader}>Claim Details:</Text>
      <Text style={styles.bodyText}>
        • <Text style={styles.boldText}>Claim Date:</Text> {notificationDetails.accepted.claimDetails.date}
      </Text>
      <Text style={styles.bodyText}>
        • <Text style={styles.boldText}>Location:</Text> {notificationDetails.accepted.claimDetails.location}
      </Text>
      <Text style={styles.bodyText}>
        • <Text style={styles.boldText}>Documents to Bring:</Text>{' '}
        {notificationDetails.accepted.claimDetails.documents}
      </Text>

      <Text style={styles.bodyText}>
        Please ensure to bring all necessary documents for verification.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {status === 'Available' && renderAvailable()}
      {status === 'Pending' && renderPending()}
      {status === 'Accepted' && renderAccepted()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4', padding: 10 },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: 'maroon', marginBottom: 10 },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  subHeader: { fontSize: 16, fontWeight: 'bold', color: 'maroon', marginTop: 10 },
  bodyText: { fontSize: 14, color: '#555', marginVertical: 2 },
  boldText: { fontWeight: 'bold' },
  pendingText: { fontSize: 16, marginTop: 10, color: 'maroon' },
  pendingStatus: { fontWeight: 'bold' },
  button: {
    backgroundColor: 'maroon',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
});