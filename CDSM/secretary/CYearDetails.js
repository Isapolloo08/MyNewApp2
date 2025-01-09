import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SYearDetails = ({ route, navigation }) => {
  const { year } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: `${year}` });
  }, [navigation, year]);

  return (
    <View style={styles.container}>
    
      <View style={styles.body}>
        <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('SFunds', { year })}>
          <Text style={styles.detailText}>Funds</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('SMaterials', { year })}>
          <Text style={styles.detailText}>Materials</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('SOtherExpenses', { year })}>
          <Text style={styles.detailText}>OtherExpenses</Text>
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
  header: {
    backgroundColor: '#800000',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
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

export default SYearDetails;