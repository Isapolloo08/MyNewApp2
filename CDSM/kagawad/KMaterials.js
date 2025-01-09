import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Helper function to extract year from date string
const extractYear = (dateString) => {
  const yearMatch = dateString.match(/\b\d{4}\b/); // Matches any 4-digit year
  return yearMatch ? parseInt(yearMatch[0], 10) : NaN;
};

const KMaterials = ({ route }) => {
  const { year } = route.params; // Receive the year from route params
  const [materialsData, setMaterialsData] = useState([]);
  const [approvedPrograms, setApprovedPrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchApprovedPrograms = async () => {
      try {
        const response = await fetch(`http://brgyapp.lesterintheclouds.com/kmaterials.php?status=Approved`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Filter programs to include only those from the specified year
        const programsInYear = data.filter(program => {
          const startYear = extractYear(program.startDate);
          const endYear = extractYear(program.endDate);
          
          return startYear === year || endYear === year;
        });

        setApprovedPrograms(programsInYear);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedPrograms();
  }, [year]); // Add year as a dependency to refetch data when year changes

  useEffect(() => {
    const fetchMaterials = async (programId) => {
      try {
        const response = await fetch(`http://brgyapp.lesterintheclouds.com/kmaterials.php?programId=${programId}&type=materials`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching materials:', error);
        return [];
      }
    };

    const fetchAllMaterials = async () => {
      if (approvedPrograms.length > 0) {
        const allMaterials = await Promise.all(
          approvedPrograms.map(program => fetchMaterials(program.programId))
        );
        const flattenedMaterials = allMaterials.flat();
        setMaterialsData(flattenedMaterials);
      }
    };

    if (selectedProgramId) {
      fetchMaterials(selectedProgramId).then(data => setMaterialsData(data));
    } else {
      fetchAllMaterials();
    }
  }, [selectedProgramId, approvedPrograms]);

  // Filter materials data based on search query
  const filteredData = materialsData && Array.isArray(materialsData)
    ? materialsData.filter(material =>
        material.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render a single section for each approved program
  const renderProgramSection = ({ item: program }) => {
    const programMaterials = materialsData.filter(material => material.programId === program.programId);

    return (
      <View key={program.programId}>
        <Text style={styles.tableHeader}>{program.programName}</Text>
        <View style={styles.tableContainer}>
          {/* Table header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Materials</Text>
            <View style={styles.separator} />
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Quantity</Text>
            <View style={styles.separator} />
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Price per Unit (₱)</Text>
            <View style={styles.separator} />
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Funds Allocation (₱)</Text>
          </View>
          {/* Table rows */}
          <FlatList
            data={programMaterials}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.tableRow,
                  index % 2 === 0 && styles.tableRowEven,
                  index % 2 !== 0 && styles.tableRowOdd,
                ]}
              >
                <Text style={[styles.tableCell, { flex: 2 }]}>{item.name || 'N/A'}</Text>
                <View style={styles.separator} />
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {item.quantity !== undefined ? item.quantity : 'N/A'}
                </Text>
                <View style={styles.separator} />
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {item.pricePerUnit !== undefined ? item.pricePerUnit.toLocaleString() : 'N/A'}
                </Text>
                <View style={styles.separator} />
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {item.allocation !== undefined ? item.allocation.toLocaleString() : 'N/A'}
                </Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View style={[styles.tableRow, styles.totalRow]}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Total</Text>
                <View style={styles.separator} />
                <Text style={[styles.tableCell, { flex: 1 }]}></Text>
                <View style={styles.separator} />
                <Text style={[styles.tableCell, { flex: 2 }]}></Text>
                <View style={styles.separator} />
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {programMaterials.reduce((total, item) => total + (item.allocation || 0), 0).toLocaleString()}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Picker
          selectedValue={selectedProgramId}
          style={[styles.picker, { width: width * 0.55 }]}
          onValueChange={(itemValue) => setSelectedProgramId(itemValue)}
        >
          <Picker.Item label="Select Program" value={null} />
          {approvedPrograms.map(program => (
            <Picker.Item key={program.programId} label={program.programName} value={program.programId} />
          ))}
        </Picker>
        <TextInput
          style={[styles.searchInput, { width: width * 0.35 }]}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={() => {}} color="#710808" />
      </View>
      <Text style={styles.header}>Materials</Text>
      <FlatList
        data={approvedPrograms}
        keyExtractor={(item) => item.programId.toString()}
        renderItem={renderProgramSection}
        ListEmptyComponent={<Text>No approved programs available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    borderRadius: 5,
    flex: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'left',
  },
  tableContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#710808',
    padding: 5,
    fontSize: 20,
    color: '#FFF',
  },
  tableHeaderText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
  },
  tableRowEven: {
    backgroundColor: '#F9F9F9',
  },
  tableRowOdd: {
    backgroundColor: '#FFF',
  },
  tableCell: {
    textAlign: 'center',
    padding: 5,
  },
  separator: {
    width: 1,
    backgroundColor: '#CCC',
  },
  totalRow: {
    backgroundColor: '#F0F0F0',
    fontWeight: 'bold',
  },
});

export default KMaterials;
