import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ViewDocumentRequestDetails = ({ route}) => {
  const { document } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.box1}>
          <View style={styles.box}>
            <View style={styles.row}>
              <Text style={styles.label}>OR No:</Text>
              <Text>{document.OR || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text>{`${document.firstName} ${document.middleName} ${document.lastName} ${document.suffix}`.trim()}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.row}>
              <Text style={styles.label}>Document Type:</Text>
              <Text>{document.documentType}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Date:</Text>
              <Text>{document.date}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.row}>
              <Text style={styles.label}>Amount:</Text>
              <Text>{document.amount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text>{document.status}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F3F7',
    paddingHorizontal: 20,
  },
  content: {
    width: '100%',
    maxWidth: 600,
  },
  box1: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#DBDBDB',
    borderWidth: 1,
    borderColor: '#9B9B9B',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  finishButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ViewDocumentRequestDetails;
