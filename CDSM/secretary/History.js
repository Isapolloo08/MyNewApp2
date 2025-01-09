// History.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const historyData = [
  {
    id: '1',
    name: 'CRUZ, Sofia M.',
    status: 'PENDING',
    dateOfSubmission: '06/14/2024',
  },
  // Add more history data as needed
];

const SHistory = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HISTORY</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Approved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Rejected</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.status}</Text>
            <Text style={styles.cell}>{item.dateOfSubmission}</Text>
            <TouchableOpacity>
              <Text style={styles.actionCell}>View Requirements</Text>
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.row}>
            <Text style={styles.headerCell}>NAME</Text>
            <Text style={styles.headerCell}>STATUS</Text>
            <Text style={styles.headerCell}>DATE OF SUBMISSION</Text>
            <Text style={styles.headerCell}>ACTION</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#8B0000',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#DDDDDD',
    paddingVertical: 8,
  },
  tab: {
    padding: 8,
  },
  tabActive: {
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#8B0000',
  },
  tabText: {
    color: '#757575',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#8B0000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  actionCell: {
    flex: 1,
    fontSize: 14,
    color: '#8B0000',
    textAlign: 'right',
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SHistory;