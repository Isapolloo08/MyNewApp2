import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function Programs({ navigation }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [programData, setProgramData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);

  const fetchProgramData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://brgyapp.lesterintheclouds.com/api/fetch_programs.php', {
        username: 'IT112-24-M',
        password: 'W2Bq@EV[SFEV',
      });

      console.log('API Response:', response.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        const data = response.data.data;
        setProgramData(data);

        const years = [...new Set(data.map(program => new Date(program.startDate).getFullYear()))];
        setAvailableYears(years);

        if (!years.includes(selectedYear)) {
          setSelectedYear(years[0]);
        }

        setError(null);
      } else {
        setError('Unexpected response format or empty data');
        setProgramData([]);
      }
    } catch (error) {
      console.error('Error fetching program data:', error);
      setError('Error fetching data from server');
      setProgramData([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProgramData(); // Re-fetch data whenever the screen is focused
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.yearPickerContainer}>
        <Text style={styles.yearPickerLabel}>Select Year:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedYear(value)}
          items={availableYears.map(year => ({ label: year.toString(), value: year }))}
          value={selectedYear}
          style={pickerSelectStyles}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Programs List ({selectedYear})</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#710808" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View>
            {programData.length > 0 ? (
              programData
                .filter(program => new Date(program.startDate).getFullYear() === selectedYear)
                .map((program, index) => (
                  <View key={index} style={styles.programCard}>
                    <Text style={styles.programTitle}>{program.programName}</Text>
                    <Text style={styles.programDetails}>
                      Program: {program.programName} | Budget: ₱{program.budget}
                    </Text>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => navigation.navigate('programdetail', { ...program })}
                      >
                        <Text style={styles.buttonText}>View</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
            ) : (
              <Text style={styles.cell}>No programs available for the selected year.</Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', backgroundColor: '#f0f0f0', padding: 20 },
  yearPickerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  yearPickerLabel: { fontSize: 16, marginRight: 10, color: '#710808' },
  card: { padding: 20, borderRadius: 10, backgroundColor: '#fff', elevation: 4, marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#710808', marginBottom: 10 },
  programCard: { marginBottom: 10, padding: 5, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  programTitle: { fontSize: 16, fontWeight: 'bold', color: '#710808' },
  programDetails: { fontSize: 14, color: '#333', marginVertical: 5 },

  buttonContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },

  viewButton: { backgroundColor: '#710808', padding: 12, borderRadius: 5, minWidth: 100, marginHorizontal: 5 },

  buttonText: { color: '#fff', fontSize: 14, textAlign: 'center' },
  cell: { fontSize: 14, color: '#333' },
  errorText: { color: 'red', fontSize: 16, marginTop: 10 },

});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    backgroundColor: '#710808',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    width: width * 0.3,
  },
  inputIOS: {
    backgroundColor: '#710808',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    width: width * 0.3,
  },
});
