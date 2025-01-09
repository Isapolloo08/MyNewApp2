import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const BeneficiaryRequests = () => {
  const navigation = useNavigation();
  const data = [
    {
      title: 'EDUCATIONAL FINANCIAL ASSISTANCE',
      description: 'Financial aid program supporting educational expenses for students in Barangay III.',
      progress: 0.05,
      progressText: '1/20',
    },
    {
      title: 'SENIOR CITIZEN BIRTHDAY CASH GIFT (JAN - JUNE)',
      description: 'Financial aid program supporting educational expenses for students in Barangay III.',
      progress: 0.28,
      progressText: '10/35',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BENEFICIARY REQUESTS</Text>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <View style={styles.filter}>
          <Text style={styles.filterText}>All</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <ProgressBar progress={item.progress} color="#6CC644" style={styles.progressBar} />
            <Text style={styles.progressText}>{item.progressText}</Text>
            <TouchableOpacity
              style={styles.seeMoreButton}
              onPress={() => navigation.navigate('DetailedView', { item })}
            >
              <Text style={styles.seeMoreText}>SEE MORE</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#710808',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  filter: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  filterText: {
    color: '#710808',
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#710808',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 10,
  },
  seeMoreButton: {
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    color: '#710808',
    fontWeight: 'bold',
  },
});

export default BeneficiaryRequests;
