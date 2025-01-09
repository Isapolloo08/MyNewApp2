import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import axios from 'axios';

export default function SubmitRequirements({ route, navigation }) {
  const { residentId, programId } = route.params || {};

  if (!programId) {
    Alert.alert("Error", "Program ID is required.");
    navigation.goBack();
    return null;
  }

  const [requirements, setRequirements] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        console.log(`Fetching requirements for programId: ${programId}`);
        const response = await axios.get(
          `https://brgyapp.lesterintheclouds.com/api/get_requirements.php?program_id=${programId}`
        );
        if (response.data.success) {
          const fetchedRequirements = response.data.data.map((req) => ({
            id: req.id,
            name: req.name,
            file: null, // Placeholder for uploaded file name
            fileUri: null, // Placeholder for file URI
          }));
          console.log("Fetched Requirements:", fetchedRequirements);
          setRequirements(fetchedRequirements);
          setUploadedFiles(fetchedRequirements);
        } else {
          Alert.alert('Error', response.data.message || 'Failed to fetch requirements.');
        }
      } catch (error) {
        console.error('Error fetching requirements:', error);
        Alert.alert('Error', 'Unable to fetch requirements. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [programId]);

  const pickDocument = async (index) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        const updatedFiles = [...uploadedFiles];
        updatedFiles[index].file = result.name; // Save file name for display
        updatedFiles[index].fileUri = result.uri; // Save file URI temporarily
        setUploadedFiles(updatedFiles);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Unable to pick file. Please try again.');
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        if (file.fileUri) {
          formData.append('files[]', {
            uri: file.fileUri,
            name: file.file,
            type: 'application/octet-stream', // Adjust the type as needed
          });
          formData.append('requirement_ids[]', file.id);
        }
      });
      formData.append('resident_id', residentId);
      formData.append('program_id', programId);

      const response = await axios.post(
        'https://brgyapp.lesterintheclouds.com/api/submit_requirements.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        Alert.alert('Success', 'Requirements submitted successfully.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'NotificationList' }],
        });
      } else {
        Alert.alert('Error', response.data.message || 'Failed to submit requirements.');
      }
    } catch (error) {
      console.error('Error submitting requirements:', error);
      Alert.alert('Error', 'Unable to submit requirements. Please try again.');
    }
  };

  const allFilesUploaded = uploadedFiles.every((file) => file.file);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REQUIREMENTS</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading requirements...</Text>
      ) : (
        <FlatList
          data={requirements}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.requirementRow}>
              <View style={styles.fileDetails}>
                <Text style={styles.requirementName}>{item.name}:</Text>
                {uploadedFiles[index]?.file && (
                  <Text style={styles.fileName}>Selected: {uploadedFiles[index].file}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickDocument(index)}
              >
                <Text style={styles.buttonText}>
                  {uploadedFiles[index]?.file ? 'RESELECT FILE' : 'SELECT FILE'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={[styles.submitButton, !allFilesUploaded && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!allFilesUploaded}
      >
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4', padding: 15 },
  header: { fontSize: 20, fontWeight: 'bold', color: 'maroon', marginBottom: 10 },
  loadingText: { fontSize: 16, color: '#555', textAlign: 'center', marginTop: 20 },
  requirementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    alignItems: 'center',
  },
  fileDetails: {
    flex: 1,
  },
  requirementName: { fontSize: 14, color: '#555' },
  fileName: { fontSize: 12, color: '#7B0A0A', marginTop: 4 },
  uploadButton: {
    backgroundColor: 'maroon',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
  submitButton: {
    backgroundColor: 'maroon',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});