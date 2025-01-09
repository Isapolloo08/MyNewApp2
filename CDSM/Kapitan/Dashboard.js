import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Correct import
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#fff',
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const Dashboard = () => {
  const [data, setData] = useState({
    totalEvents: 0,
    totalActivities: 0,
    totalMeetings: 0,
    eventsBudget: 0,
    activitiesBudget: 0,
    meetingsBudget: 0,
    loading: true,
    year: '2024', // Initialize with default year
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://brgyapp.lesterintheclouds.com/kevents.php`, {
        params: { year: data.year }, // Pass year as a query parameter
      });
      const programs = response.data;

      const totalEvents = programs.filter(program => program.programType === 'Event').length;
      const totalActivities = programs.filter(program => program.programType === 'Activity').length;
      const totalMeetings = programs.filter(program => program.programType === 'Meeting').length;

      // Calculate budgets
      const eventsBudget = programs.filter(program => program.programType === 'Event').reduce((acc, program) => acc + program.budget, 0);
      const activitiesBudget = programs.filter(program => program.programType === 'Activity').reduce((acc, program) => acc + program.budget, 0);
      const meetingsBudget = programs.filter(program => program.programType === 'Meeting').reduce((acc, program) => acc + program.budget, 0);

      setData({
        ...data,
        totalEvents,
        totalActivities,
        totalMeetings,
        eventsBudget,
        activitiesBudget,
        meetingsBudget,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setData({ ...data, loading: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, [data.year]);

  const handleYearChange = (itemValue) => {
    setData((prevData) => ({ ...prevData, year: itemValue, loading: true }));
  };

  if (data.loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const pieData = [
    {
      name: 'Events',
      population: data.totalEvents,
      color: '#003f88',
      legendFontColor: '#003f88',
      legendFontSize: 15,
    },
    {
      name: 'Activities',
      population: data.totalActivities,
      color: '#8c1c13',
      legendFontColor: '#8c1c13',
      legendFontSize: 15,
    },
    {
      name: 'Meetings',
      population: data.totalMeetings,
      color: '#ffbc42',
      legendFontColor: '#ffbc42',
      legendFontSize: 15,
    },
  ];

  const budgetData = {
    labels: ['Events', 'Activities', 'Meetings'],
    datasets: [
      {
        data: [data.eventsBudget, data.activitiesBudget, data.meetingsBudget],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Budgets in Brgy. III Daet, Camarines Norte</Text>

      <View style={styles.topContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>TOTAL PROPOSE PROGRAM</Text>
          <View style={styles.yearContainer}>
            <Picker
              selectedValue={data.year}
              style={styles.picker}
              onValueChange={handleYearChange}
            >
              <Picker.Item label="2024" value="2024" />
              <Picker.Item label="2025" value="2025" />
              <Picker.Item label="2026" value="2026" />
              <Picker.Item label="2027" value="2027" />
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.box}>
            <MaterialIcons name="event" size={30} color="#003f88" />
            <Text style={styles.boxText}>TOTAL EVENTS</Text>
            <Text style={styles.boxNumber}>{data.totalEvents}</Text>
          </View>
          <View style={styles.box}>
            <MaterialCommunityIcons name="clipboard-text" size={30} color="#8c1c13" />
            <Text style={styles.boxText}>TOTAL ACTIVITIES</Text>
            <Text style={styles.boxNumber}>{data.totalActivities}</Text>
          </View>
          <View style={styles.box}>
            <MaterialIcons name="meeting-room" size={30} color="#ffbc42" />
            <Text style={styles.boxText}>TOTAL MEETINGS</Text>
            <Text style={styles.boxNumber}>{data.totalMeetings}</Text>
          </View>
        </View>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.sectionTitle}>TOTAL PROPOSE BUDGET</Text>
        <BarChart
          style={{ marginVertical: 8 }}
          data={budgetData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel={'₱'}
          chartConfig={chartConfig}
        />
        <View style={styles.row}>
          <View style={styles.box}>
            <MaterialIcons name="event" size={30} color="#003f88" />
            <Text style={styles.boxText}>EVENTS</Text>
            <Text style={styles.boxNumber}>{data.eventsBudget.toLocaleString()}</Text>
          </View>
          <View style={styles.box}>
            <MaterialCommunityIcons name="clipboard-text" size={30} color="#8c1c13" />
            <Text style={styles.boxText}>ACTIVITIES</Text>
            <Text style={styles.boxNumber}>{data.activitiesBudget.toLocaleString()}</Text>
          </View>
          <View style={styles.box}>
            <MaterialIcons name="meeting-room" size={30} color="#ffbc42" />
            <Text style={styles.boxText}>MEETINGS</Text>
            <Text style={styles.boxNumber}>{data.meetingsBudget.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  topContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: 120,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  boxText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  boxNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Dashboard;
