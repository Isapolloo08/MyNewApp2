import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CYearDetails = ({ route, navigation }) => {
  const { year, totalBudget } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: `${year}` });
  }, [navigation, year]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => navigation.navigate('CFunds', {
            year,
            totalBudget, // Pass the IRA budget here
          })}
        >
          <Text style={styles.detailText}>Funds</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => navigation.navigate('CMaterials', {
            year,
            totalBudget, // Pass the IRA budget here if needed
          })}
        >
          <Text style={styles.detailText}>Materials</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => navigation.navigate('CExpenses', {
            year,
            totalBudget, // Pass the IRA budget here if needed
          })}
        >
          <Text style={styles.detailText}>Other Expenses</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  body: {
    flex: 1,
  },
  detailButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default CYearDetails;
