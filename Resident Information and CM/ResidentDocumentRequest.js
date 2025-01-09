import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ResidentDocumentRequest = () => {
  const navigation = useNavigation();

  const [residentsDocumentRequest, setResidentsDocumentRequest] = useState([
    { id: 1, OR: '', firstName: 'John', lastName: 'Doe', middleName: 'A', suffix: 'Jr.', documentType: 'Barangay ID', date: '2024-07-24', amount: '100', status: 'unpaid' },
    { id: 2, OR: '2015869', firstName: 'Jane', lastName: 'Smith', middleName: '', suffix: '', documentType: 'Business Permit', date: '2024-08-15', amount: '80', status: 'paid' },
  ]);

  const headers = ['OR No.', 'Name', 'Document Type', 'Date', 'Amount', 'Status', 'Action'];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newORNumber, setNewORNumber] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text.toLowerCase());
  };

  const applyFilters = (document) => {
    const name = `${document.firstName} ${document.middleName} ${document.lastName} ${document.suffix}`.replace(/\s+/g, ' ').trim();
    if (searchQuery && !name.toLowerCase().includes(searchQuery) && !document.documentType.toLowerCase().includes(searchQuery)) {
      return false;
    }
    if (filterByStatus && document.status !== filterByStatus) {
      return false;
    }
    return true;
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const setStatusFilter = (status) => {
    setFilterByStatus(status);
    toggleFilterModal();
  };

  const clearFilters = () => {
    setFilterByStatus(null);
    setSearchQuery('');
    toggleFilterModal();
  };

  const filteredDocuments = residentsDocumentRequest.filter(applyFilters);

  const handleView = (document) => {
    setSelectedDocument(document);
    navigation.navigate('ViewDocumentRequestDetails', { document });
  };

  const handleUpdateStatus = (document) => {
    setSelectedDocument(document);
    setNewORNumber(document.OR || '');
    setModalVisible(true);
  };

  const handleSave = () => {
    if (selectedDocument) {
      const updatedDocuments = residentsDocumentRequest.map((doc) =>
        doc.id === selectedDocument.id
          ? { ...doc, status: 'paid', OR: newORNumber }
          : doc
      );
      setResidentsDocumentRequest(updatedDocuments);
      setModalVisible(false);
      Alert.alert('Success', 'Document status updated and OR number added.');
    }
  };

  const handlePrint = (document) => {
    if (document && document.status === 'paid') {
      navigation.navigate('PrintReceiptTreasurer', { document });
    } else {
      Alert.alert('Print Error', 'Only documents with "paid" status can be printed.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search residents or document type..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter By:</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleFilterModal}>
          <Text style={styles.dropdownButtonText}>{filterByStatus || 'All'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal style={styles.scrollContainer}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            {headers.map((header, index) => (
              <View key={index} style={[styles.headerCell, { width: columnWidths[index] }]}>
                <Text>{header}</Text>
              </View>
            ))}
          </View>
          <ScrollView vertical style={styles.tableBody}>
            {filteredDocuments.map((item, index) => {
              const name = `${item.firstName} ${item.middleName} ${item.lastName} ${item.suffix}`.replace(/\s+/g, ' ').trim();
              return (
                <View key={index} style={styles.row}>
                  <View style={[styles.cell, { width: columnWidths[0] }]}>
                    <Text>{item.OR || 'N/A'}</Text>
                  </View>
                  <View style={[styles.cell, { width: columnWidths[1] }]}>
                    <Text>{name}</Text>
                  </View>
                  <View style={[styles.cell, { width: columnWidths[2] }]}>
                    <Text>{item.documentType}</Text>
                  </View>
                  <View style={[styles.cell, { width: columnWidths[3] }]}>
                    <Text>{item.date}</Text>
                  </View>
                  <View style={[styles.cell, { width: columnWidths[4] }]}>
                    <Text>{item.amount}</Text>
                  </View>
                  <View style={[styles.cell, { width: columnWidths[5] }, item.status === 'paid' ? styles.cellPaid : styles.cellUnpaid]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                  <View style={[styles.cell, { width: columnWidths[6], flexDirection: 'row', justifyContent: 'center' }]}>
                    <TouchableOpacity onPress={() => handleView(item)}>
                      <Icon name="eye" size={20} color="blue" />
                    </TouchableOpacity>
                    {item.status === 'unpaid' && (
                      <TouchableOpacity onPress={() => handleUpdateStatus(item)} style={styles.printButton}>
                        <Icon name="edit" size={20} color="blue" />
                      </TouchableOpacity>
                    )}
                    {item.status === 'paid' && (
                      <TouchableOpacity onPress={() => handlePrint(item)} style={styles.printButton}>
                        <Icon name="print" size={20} color="blue" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={filterModalVisible} onRequestClose={toggleFilterModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalItem} onPress={() => setStatusFilter('paid')}>
              <Text style={styles.modalText}>Paid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => setStatusFilter('unpaid')}>
              <Text style={styles.modalText}>Unpaid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={clearFilters}>
              <Text style={styles.modalText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={toggleFilterModal}>
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Enter OR Number:</Text>
            <TextInput
              style={styles.input}
              value={newORNumber}
              onChangeText={setNewORNumber}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const columnWidths = [100, 200, 150, 100, 100, 100, 80]; // Adjusted to include action column width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  searchInput: {
    height: 50,
    paddingHorizontal: 10,
    width: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: '54%',
  },
  filterLabel: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  dropdownButton: {
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,

  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  scrollContainer: {
    marginTop: 20,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerCell: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableBody: {
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellPaid: {
    backgroundColor: 'green', // Light green background
  },
  cellUnpaid: {
    backgroundColor: 'red', // Light red background
  },
  statusText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  printButton: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalItem: {
    marginVertical: 10,
  },
  modalText: {
    fontSize: 18,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ResidentDocumentRequest;
