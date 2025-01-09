import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
import axios from "axios";
import * as Linking from "expo-linking";

const SeeMore = ({ route }) => {
  const { programId } = route.params;
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `https://brgyapp.lesterintheclouds.com/api/fetch_applicants.php?programId=${programId}`
        );
        setApplicants(response.data.data || []);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        Alert.alert("Error", "Failed to fetch applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [programId]);

  const handleAction = async (residentId, action) => {
    try {
      const response = await axios.post(
        "https://brgyapp.lesterintheclouds.com/api/update_program_with_requirements.php",
        {
          programId,
          residentId,
          action,
        }
      );
      Alert.alert("Success", response.data.message || "Action completed.");
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant.residentId === residentId ? { ...applicant, status: action } : applicant
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      Alert.alert("Error", "Failed to update status.");
    }
  };

  const handleViewRequirements = async (residentId) => {
    try {
      const response = await axios.get(
        `https://brgyapp.lesterintheclouds.com/api/get_uploaded_requirements.php?programId=${programId}&residentId=${residentId}`
      );
      setSelectedRequirements(response.data.data || []);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching requirements:", error);
      Alert.alert("Error", "Failed to fetch requirements.");
    }
  };

  const openFile = (fileUrl) => {
    try {
      Linking.openURL(fileUrl);
    } catch (error) {
      Alert.alert("Error", "Unable to open file.");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Educational Financial Assistance</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Status</Text>
          <Text style={styles.headerCell}>Date of Submission</Text>
          <Text style={styles.headerCell}>Action</Text>
        </View>
        {applicants
          .filter((applicant) =>
            applicant.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((applicant) => (
            <View key={applicant.residentId} style={styles.tableRow}>
              <Text style={styles.tableCell}>{applicant.name}</Text>
              <Text style={styles.tableCell}>{applicant.status}</Text>
              <Text style={styles.tableCell}>{applicant.submissionDate}</Text>
              <TouchableOpacity
                onPress={() => handleViewRequirements(applicant.residentId)}
                style={styles.actionCell}
              >
                <Text style={styles.actionText}>View Requirements</Text>
              </TouchableOpacity>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={() => handleAction(applicant.residentId, "approved")}
                  style={[styles.acceptButton, applicant.status === "approved" && styles.disabledButton]}
                  disabled={applicant.status === "approved"}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAction(applicant.residentId, "rejected")}
                  style={styles.rejectButton}
                >
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>

      {/* Modal for viewing requirements */}
      {modalVisible && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Uploaded Requirements</Text>
              {selectedRequirements.length > 0 ? (
                selectedRequirements.map((req) => (
                  <TouchableOpacity
                    key={req.id}
                    style={styles.fileItem}
                    onPress={() => openFile(req.filePath)}
                  >
                    <Text style={styles.fileName}>{req.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>No uploaded requirements available.</Text>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7", padding: 10 },
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 10, color: "#a01919", textAlign: "center" },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  table: { marginTop: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#a01919", padding: 10 },
  headerCell: { flex: 1, fontWeight: "bold", color: "#fff", textAlign: "center" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ddd", padding: 10 },
  tableCell: { flex: 1, textAlign: "center", fontSize: 12, color: "#333" },
  actionCell: { flex: 1, textAlign: "center", paddingVertical: 5 },
  actionText: { color: "#007BFF", textDecorationLine: "underline", fontSize: 12 },
  actionButtons: { flexDirection: "row", justifyContent: "space-around", flex: 1 },
  acceptButton: { backgroundColor: "#4caf50", padding: 5, borderRadius: 5 },
  rejectButton: { backgroundColor: "#f44336", padding: 5, borderRadius: 5 },
  buttonText: { color: "#fff", fontSize: 12, textAlign: "center" },
  disabledButton: { backgroundColor: "#ddd" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: { width: "80%", backgroundColor: "#fff", borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  fileItem: { marginBottom: 10, borderBottomWidth: 1, borderColor: "#ddd", padding: 5 },
  fileName: { fontSize: 14, color: "#007BFF", textDecorationLine: "underline" },
  closeButton: { marginTop: 10, alignItems: "center", backgroundColor: "#a01919", padding: 10 },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
});

export default SeeMore;