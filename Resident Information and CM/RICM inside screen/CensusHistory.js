import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const CensusHistory = ({ navigation, route }) => {
  const { history } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {history.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <Text style={styles.dateText}>Date: {entry.date}</Text>
          {Object.keys(entry.changes).map((key) => (
            <View key={key} style={styles.changeContainer}>
              <Text style={styles.fieldText}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</Text>
              <Text style={styles.oldValueText}>Old Value: {entry.changes[key].oldValue}</Text>
              <Text style={styles.newValueText}>New Value: {entry.changes[key].newValue}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  entryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  changeContainer: {
    marginBottom: 10,
  },
  fieldText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  oldValueText: {
    fontSize: 14,
    color: 'red',
  },
  newValueText: {
    fontSize: 14,
    color: 'green',
  },
});

export default CensusHistory;
