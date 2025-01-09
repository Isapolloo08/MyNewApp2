import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SBeneficiary = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState('');
  const [requirements, setRequirements] = useState(['']);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('https://brgyapp.lesterintheclouds.com/api/fetch_benef_programs.php');
        const filteredPrograms = response.data.filter(
          (program) => ['approved', 'open', 'closed'].includes(program.status.toLowerCase())
        );
        setPrograms(filteredPrograms);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleAddRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
  };

  const handleRequirementChange = (text, index) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = text;
    setRequirements(updatedRequirements);
  };

  const handleSetRequirementsAndBeneficiaries = (program) => {
    setCurrentProgram(program);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!beneficiaries || requirements.some(req => !req.trim())) {
      Alert.alert('Error', 'Please fill in all fields and requirements.');
      return;
    }

    try {
      await axios.post('https://brgyapp.lesterintheclouds.com/api/update_program_with_requirements.php', {
        programId: currentProgram.id,
        beneficiaries,
        requirements: requirements.filter(Boolean),
        status: 'open',
      });

      Alert.alert('Success', 'Program updated successfully.');
      setModalVisible(false);

      const updatedPrograms = programs.map((program) =>
        program.id === currentProgram.id
          ? { ...program, status: 'open', beneficiaries, requirements }
          : program
      );
      setPrograms(updatedPrograms);
    } catch (error) {
      console.error('Error updating program:', error);
      Alert.alert('Error', 'Failed to update program.');
    }
  };

  const handleOpenForAll = async () => {
    try {
      await axios.post('https://brgyapp.lesterintheclouds.com/api/update_program_status.php', {
        programId: currentProgram.id,
        status: 'closed',
      });

      Alert.alert('Success', 'Program status updated to Closed.');
      setModalVisible(false);

      const updatedPrograms = programs.map((program) =>
        program.id === currentProgram.id
          ? { ...program, status: 'closed' }
          : program
      );
      setPrograms(updatedPrograms);
    } catch (error) {
      console.error('Error updating program status:', error);
      Alert.alert('Error', 'Failed to update program status.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.sectionTitle}>BENEFICIARY REQUESTS</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView>
          {programs
            .filter((program) => program.name.toLowerCase().includes(search.toLowerCase()))
            .map((program) => (
              <View key={program.id} style={styles.card}>
                <Text style={styles.cardHeader}>{program.name}</Text>
                <Text style={styles.cardDescription}>{program.note}</Text>
                <Text style={styles.date}>
                  {new Date(program.startDate).toLocaleString()} - {new Date(program.endDate).toLocaleString()}
                </Text>

                {program.status.toLowerCase() === 'approved' ? (
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.updateButton}
                      onPress={() => handleSetRequirementsAndBeneficiaries(program)}
                    >
                      <Text style={styles.updateButtonText}>Set Requirements & Beneficiaries</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SeeMore', { programId: program.id })}
                  >
                    <Text style={styles.seeMore}>SEE MORE</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </ScrollView>
      )}

      {modalVisible && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalTitle}>Set Beneficiaries</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter number of beneficiaries"
                keyboardType="numeric"
                value={beneficiaries}
                onChangeText={setBeneficiaries}
              />

              <Text style={styles.modalTitle}>Add Requirements</Text>
              {requirements.map((req, index) => (
                <View key={index} style={styles.requirementRow}>
                  <TextInput
                    style={styles.input}
                    placeholder={`Requirement ${index + 1}`}
                    value={req}
                    onChangeText={(text) => handleRequirementChange(text, index)}
                  />
                  <TouchableOpacity onPress={() => handleRemoveRequirement(index)}>
                    <Text style={styles.removeRequirement}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity onPress={handleAddRequirement} style={styles.addRequirementButton}>
                <Text style={styles.addRequirementText}>+ Add Another Requirement</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.openForAllButton} onPress={handleOpenForAll}>
                <Text style={styles.openForAllButtonText}>Open for All</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  searchContainer: { padding: 10 },
  sectionTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 10, color: '#333' },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  cardHeader: { fontWeight: 'bold', fontSize: 14, color: '#a01919', marginBottom: 5 },
  cardDescription: { fontSize: 12, color: '#555', marginBottom: 10 },
  date: { fontSize: 12, color: '#4caf50', fontWeight: 'bold', marginBottom: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  updateButton: { backgroundColor: '#4caf50', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 15 },
  updateButtonText: { color: '#fff', fontWeight: 'bold' },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 8, marginBottom: 10 },
  requirementRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  removeRequirement: { color: '#a01919', marginLeft: 10 },
  addRequirementButton: { alignSelf: 'flex-start', marginBottom: 20 },
  addRequirementText: { color: '#4caf50', fontWeight: 'bold' },
  submitButton: { backgroundColor: '#4caf50', borderRadius: 5, paddingVertical: 10, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontWeight: 'bold' },
  openForAllButton: { backgroundColor: '#007BFF', borderRadius: 5, paddingVertical: 10, alignItems: 'center', marginTop: 10 },
  openForAllButtonText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { marginTop: 10, backgroundColor: '#a01919', borderRadius: 5, paddingVertical: 10, alignItems: 'center' },
  cancelButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default SBeneficiary;