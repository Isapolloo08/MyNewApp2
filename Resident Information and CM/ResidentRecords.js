import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import moment from 'moment'; // Import moment.js for date manipulation
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ResidentRecords = () => {
  const navigation = useNavigation();

  const [residentRecords, setResidentRecords] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', middleName: 'A', suffix: 'Jr.', Purpose: 'For Valid Id', documentType: 'Barangay ID', date: '2024-07-24', time: '8:00 am' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', middleName: 'B', suffix: '', Purpose: 'For Business', documentType: 'Business Permit', date: '2024-08-15', time: '10:00 am' },
    { id: 3, firstName: 'Alex', lastName: 'Mendez', middleName: 'E', suffix: '', Purpose: 'For Scholarship', documentType: 'Barangay Clearance', date: '2024-09-15', time: '9:00 am' },
    { id: 4, firstName: 'Kim', lastName: 'Vergara', middleName: 'C', suffix: '', Purpose: 'For Educational Assistance', documentType: 'Barangay Certificate', date: '2024-10-15', time: '1:00 pm' },
    { id: 5, firstName: 'Fourth', lastName: 'Mendiola', middleName: '', suffix: '', Purpose: 'For Scholarship', documentType: 'Certificate of Indigency', date: '2024-11-15', time: '3:00 pm' },
  ]);

  const headers = ['Name', 'Purpose', 'Document Type', 'Date', 'Time'];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterByDate, setFilterByDate] = useState('All'); // Set default to 'All'
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSearch = (text) => {
    setSearchQuery(text.toLowerCase());
  };

  const applyFilters = (record) => {
    const name = `${record.firstName} ${record.middleName} ${record.lastName} ${record.suffix}`.replace(/\s+/g, ' ').trim();
    const recordDate = moment(record.date);

    if (searchQuery && !name.toLowerCase().includes(searchQuery) && !record.documentType.toLowerCase().includes(searchQuery) && !record.Purpose.toLowerCase().includes(searchQuery)) {
      return false;
    }
    if (filterByDate && !isDateInRange(recordDate)) {
      return false;
    }
    return true;
  };
  

  const isDateInRange = (date) => {
    const now = moment();
    switch (filterByDate) {
      case 'Today':
        return date.isSame(now, 'day');
      case 'Yesterday':
        return date.isSame(now.clone().subtract(1, 'day'), 'day');
      case 'This Week':
        return date.isSame(now, 'week');
      case 'This Month':
        return date.isSame(now, 'month');
      case 'This Year':
        return date.isSame(now, 'year');
      case 'All':
        return true;
      default:
        return false;
    }
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const setDateFilter = (dateOption) => {
    setFilterByDate(dateOption);
    toggleFilterModal();
  };

  const clearFilters = () => {
    setFilterByDate('All'); // Reset to 'All'
    setSearchQuery('');
    toggleFilterModal();
  };

  const filteredRecords = residentRecords.filter(applyFilters);

  const handleViewRecord = () => {
    if (selectedRecord) {
      navigation.navigate('ViewRecordScreen', { record: selectedRecord });
    }
  };

   // Function to get the HTML template based on document type
   const getHtmlTemplate = () => {
    if (!selectedRecord) return '';

    switch (selectedRecord.documentType) {
      case 'Barangay ID':
      return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Barangay Residents Identification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                    margin: 0;
                }
                .id-card {
                    width: 600px;
                    height: 350px;
                    border: 2px solid #000;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    background: #fff;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    position: relative;
                }
                .id-card img {
                    width: 150px;
                    height: 200px;
                    border-radius: 10px;
                    margin-right: 20px;
                }
                .id-card .details {
                    flex: 1;
                    text-align: left;
                }
                .id-card .details p {
                    margin: 5px 0;
                }
                .id-card .header {
                    font-size: 14px;
                    font-weight: bold;
                    text-align: center;
                }
                .id-card .sub-header {
                    font-size: 12px;
                    text-align: center;
                }
                .id-card .highlight {
                    background-color: maroon;
                    color: #fff;
                    padding: 5px;
                    margin: 10px 0;
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                }
                .id-card .qr-code {
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                }
                .id-card .signature {
                    margin-top: 20px;
                }
                .logos {
                    position: absolute;
                    top: 10px;
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
                .logos img {
                    width: 50px;
                }
            </style>
        </head>
        <body>
            <div class="id-card">
                <div class="logos">
                    <img src="left-logo.png" alt="Left Logo">
                    <img src="right-logo.png" alt="Right Logo">
                </div>
                <img src="photo-placeholder.png" alt="Resident Photo">
                <div class="details">
                    <div class="header">Republic of the Philippines</div>
                    <div class="sub-header">Province of Camarines Norte<br>Municipality of Daet<br>Barangay III</div>
                    <div class="highlight">BARANGAY RESIDENTS IDENTIFICATION</div>
                    <p>Resident ID No: <strong>${selectedRecord.id}</strong></p>
                    <p>Date Issued: <strong>${moment(selectedRecord.date).format('MMM DD, YYYY')}</strong></p>
                    <p>Name: <strong>${selectedRecord.firstName} ${selectedRecord.middleName} ${selectedRecord.lastName} ${selectedRecord.suffix}</strong></p>
                    <p>Address: <strong>Street Address, City, Province</strong></p>
                    <p>Gender: <strong>Gender</strong></p>
                    <p>Date of Birth: <strong>Date of Birth</strong></p>
                    <p>Civil Status: <strong>Status</strong></p>
                    <div class="signature">
                        <p>Signature: _______________________</p>
                    </div>
                </div>
                <div class="qr-code">
                    <img src="qr-code-placeholder.png" alt="QR Code">
                </div>
            </div>
        </body>
        </html>
        `;
      case 'Business Permit':
        return `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Barangay Business Clearance</title>
              <style>
                  body {
                      font-family: 'Times New Roman', Times, serif;
                      margin: 0;
                      padding: 0;
                      display: flex;
                      justify-content: center;
                      background-color: #ffffff;
                  }
                  .container {
                      width: 816px;
                      border: 1px solid black;
                      padding: 40px;
                  }
                  .header, .footer {
                      text-align: center;
                  }
                  .header img {
                      width: 80px;
                      height: 80px;
                  }
                  .header h1 {
                      font-size: 16px;
                      margin: 5px 0;
                  }
                  .header h2 {
                      font-size: 20px;
                      margin: 5px 0;
                  }
                  .header h3 {
                      font-size: 20px;
                      margin: 5px 0;
                      text-decoration: underline;
                  }
                  .content {
                      margin: 20px 0;
                      text-align: center;
                  }
                  .content h2 {
                      font-size: 22px;
                      margin: 20px 0;
                  }
                  .content p {
                      font-size: 16px;
                      margin: 10px 0;
                      line-height: 1.5;
                  }
                  .details {
                      text-align: left;
                      margin: 20px 0;
                  }
                  .details p {
                      font-size: 16px;
                      line-height: 1.5;
                  }
                  .footer p {
                      font-size: 16px;
                      font-weight: bold;
                      margin: 40px 0 0 0;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <img src="path/to/philippines-logo.png" alt="Philippines Logo" style="float: left;">
                      <img src="path/to/philippines-logo.png" alt="Philippines Logo" style="float: right;">
                      <div style="clear: both;"></div>
                      <h1>Republic of the Philippines<br>Province of Camarines Norte<br>Municipality of Daet<br>Barangay III</h1>
                      <h2>OFFICE OF THE PUNONG BARANGAY</h2>
                      <h2>BARANGAY BUSINESS CLEARANCE</h2>
                  </div>
                  <div class="content">
                      <p>PERMIT NO:</p>
                      <p>Permission is hereby granted to</p>
                      <h2>PRU LIFE INSURANCE CORPORATION OF U.K</h2>
                      <p>Located At UNIT 3 GACHE PLAZA, F. Pimentel Ave., Barangay III DAET, Camarines Norte To<br>MANAGE AND OPERATE<br>Under The Commercial Name Of</p>
                      <h2>PRU LIFE INSURANCE CORPORATION OF U.K</h2>
                      <p>With owner address at TAGUIG CITY, effective today JANUARY 31, 2024 UP TO DECEMBER 31, 2024.</p>
                  </div>
                  <div class="details">
                      <p>This permit is granted subject to the condition that all existing laws or ordinances, rules and regulation that is governing the business hereby permitted are properly observe and subject further to the condition mentioned in the business application which empowers the Barangay Captain of his authorized representatives to close or padlock said business place in case of revocation of permit.</p>
                      <p>This permit is not valid without the necessary fees and / or licenses as provided by law or ordinances.</p>
                      <p>This permit is subject to revocation anytime when the interest of the public requires special conditions.</p>
                      <p>Being applied for RENEWAL of the corresponding mayor's permit.</p>
                      <p>Issued this January 31, 2024 at Barangay III.</p>
                      <p>APPLICATION NO. 2024-093<br>SERIES OF 2024<br>OR NUMBER: 06392978<br>PAID AMOUNT: P1530.00<br>DATE: JANUARY 31, 2024</p>
                  </div>
                  <div class="footer">
                      <p>HON. JOSE JUAN C. CARRANCEJA JR.<br>Punong Barangay</p>
                  </div>
              </div>
          </body>
          </html>
          `;
          case 'Certificate of Indigency':
            return `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Certificate of Indigency</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          margin: 0;
                          padding: 0;
                          background-color: #ffffff;
                      }
                      .container {
                          width: 800px;
                          margin: 30px auto;
                          border: 1px solid #000;
                          padding: 20px;
                      }
                      .header, .footer {
                          text-align: center;
                      }
                      .header img {
                          width: 80px;
                          height: 80px;
                          vertical-align: middle;
                      }
                      .header h1 {
                          margin: 5px 0;
                      }
                      .header p {
                          font-size: 18px;
                          margin: 5px 0;
                      }
                      .content {
                          margin: 20px 0;
                          text-align: left;
                      }
                      .content h2 {
                          font-size: 18px;
                          margin-bottom: 10px;
                      }
                      .content p {
                          font-size: 16px;
                          margin: 10px 0;
                          line-height: 1.5;
                      }
                      .footer p {
                          margin-top: 20px;
                          font-size: 16px;
                          font-weight: bold;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <div class="header">
                          <img src="path/to/philippines-logo.png" alt="Philippines Logo" style="float: left;">
                          <h1>Republic of the Philippines<br>Province of Camarines Norte<br>Municipality of Daet<br>Barangay III</h1>
                          <img src="path/to/philippines-logo.png" alt="Philippines Logo" style="float: right;">
                          <div style="clear: both;"></div>
                          <h2>CERTIFICATE OF INDIGENCY</h2>
                      </div>
                      <div class="content">
                          <p>This is to certify that <strong>${selectedRecord.firstName} ${selectedRecord.middleName} ${selectedRecord.lastName}</strong>, of legal age, resident of <strong>Address</strong>, is a bona fide resident of Barangay III, Municipality of Daet, Province of Camarines Norte.</p>
                          <p>Based on our records, the aforementioned individual is considered to be indigent.</p>
                          <p>This certification is issued upon the request of the individual concerned for whatever legal purposes it may serve.</p>
                          <p>Issued this ${moment(selectedRecord.date).format('MMMM DD, YYYY')} at Barangay III.</p>
                      </div>
                      <div class="footer">
                          <p>HON. JOSE JUAN C. CARRANCEJA JR.<br>Punong Barangay</p>
                      </div>
                  </div>
              </body>
              </html>
              `;
              case 'Barangay Certificate':
                return `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Barangay Certificate</title>
                      <style>
                          body {
                              font-family: Arial, sans-serif;
                              margin: 0;
                              padding: 0;
                              background: white;
                              text-align: center;
                          }
                          .container {
                              width: 210mm; /* A4 width */
                              height: 297mm; /* A4 height */
                              margin: 0 auto;
                              padding: 30px 50px;
                              box-sizing: border-box;
                          }
                          .header {
                              text-align: center;
                              margin-bottom: 20px;
                          }
                          .header img {
                              width: 70px;
                              height: 70px;
                              vertical-align: middle;
                          }
                          .header .logo-container {
                              width: 100%;
                              display: flex;
                              justify-content: space-between;
                              align-items: center;
                          }
                          .header h1 {
                              font-size: 24px;
                              margin: 0;
                          }
                          .header p {
                              font-size: 18px;
                              margin: 5px 0;
                          }
                          .content {
                              text-align: left;
                              margin: 30px 0;
                          }
                          .content p {
                              font-size: 16px;
                              margin: 10px 0;
                          }
                          .signature {
                              margin-top: 50px;
                              text-align: center;
                          }
                          .signature p {
                              font-size: 16px;
                              margin: 5px 0;
                          }
                      </style>
                  </head>
                  <body>
                      <div class="container">
                          <div class="header">
                              <div class="logo-container">
                                  <img src="path/to/left-logo.png" alt="Left Logo">
                                  <h1>Republic of the Philippines</h1>
                                  <img src="path/to/right-logo.png" alt="Right Logo">
                              </div>
                              <p>Province of Camarines Norte<br>Municipality of Daet<br>Barangay III</p>
                          </div>
                          <div class="content">
                              <h2>Barangay Certificate</h2>
                              <p>This is to certify that <strong>${selectedRecord.name}</strong> of legal age, residing at <strong>${selectedRecord.address}</strong>, is a bonafide resident of Barangay III, Municipality of Daet, Province of Camarines Norte.</p>
                              <p>Issued this ${moment(selectedRecord.date).format('MMMM DD, YYYY')} at Barangay III.</p>
                          </div>
                          <div class="signature">
                              <p>HON. JOSE JUAN C. CARRANCEJA JR.<br>Punong Barangay</p>
                          </div>
                      </div>
                  </body>
                  </html>
                  `;
              case 'Barangay Clearance':
        return `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Barangay Clearance</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                      padding: 0;
                      background-color: #ffffff;
                  }
                  .container {
                      width: 800px;
                      margin: 30px auto;
                      border: 1px solid #000;
                      padding: 20px;
                  }
                  .header, .footer {
                      text-align: center;
                  }
                  .header img {
                      width: 80px;
                      height: 80px;
                      vertical-align: middle;
                  }
                  .header h1 {
                      margin: 5px 0;
                  }
                  .header p {
                      font-size: 18px;
                      margin: 5px 0;
                  }
                  .content {
                      margin: 20px 0;
                      text-align: left;
                  }
                  .content h2 {
                      font-size: 18px;
                      margin-bottom: 10px;
                  }
                  .content p {
                      font-size: 16px;
                      margin: 10px 0;
                      line-height: 1.5;
                  }
                  .footer p {
                      margin-top: 20px;
                      font-size: 16px;
                      font-weight: bold;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <div class="logo-container">
                          <img src="path/to/left-logo.png" alt="Left Logo">
                          <h1>Republic of the Philippines</h1>
                          <img src="path/to/right-logo.png" alt="Right Logo">
                      </div>
                      <p>Province of Camarines Norte<br>Municipality of Daet<br>Barangay III</p>
                  </div>
                  <div class="content">
                      <h2>Barangay Clearance</h2>
                      <p>This is to certify that <strong>${selectedRecord.name}</strong> of legal age, residing at <strong>${selectedRecord.address}</strong>, is a bonafide resident of Barangay III, Municipality of Daet, Province of Camarines Norte.</p>
                      <p>Issued this ${moment(selectedRecord.date).format('MMMM DD, YYYY')} at Barangay III.</p>
                  </div>
                  <div class="footer">
                      <p>HON. JOSE JUAN C. CARRANCEJA JR.<br>Punong Barangay</p>
                  </div>
              </div>
          </body>
          </html>
          `;
      default:
        return '';
    }
  };

  // Function to handle print
  const handlePrint = async () => {
      if (!selectedRecord) return;

      const html = getHtmlTemplate();

      if (html) {
      try {
        await Print.printAsync({
          html,
          base64: false,
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to print document.');
      }
    }
  };

  const handleRowPress = (record) => {
    setSelectedRecord(record);
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
          <Text style={styles.dropdownButtonText}>
            {filterByDate === 'All' ? 'All' : filterByDate}
          </Text>
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
            {filteredRecords.map((item, index) => {
              const name = `${item.firstName} ${item.middleName} ${item.lastName} ${item.suffix}`.replace(/\s+/g, ' ').trim();
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.row, selectedRecord === item ? styles.selectedRow : null]}
                  onPress={() => handleRowPress(item)}
                >
                  <View style={[styles.cell, { width: columnWidths[0] }]}>
                    <Text>{name}</Text>
                  </View>
                  <View style={[styles.cell, { width: columnWidths[1] }]}>
                    <Text>{item.Purpose}</Text>
                  </View>
                  <View style={[styles.cell, { width: columnWidths[2] }]}>
                    <Text>{item.documentType}</Text>
                  </View>
                  <View style={[styles.cell, { width: columnWidths[3] }]}>
                    <Text>{item.date}</Text>
                  </View>
                  <View style={[styles.cell, { width: columnWidths[4] }]}>
                    <Text>{item.time}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, selectedRecord ? null : styles.disabledButton]}
          onPress={handleViewRecord}
          disabled={!selectedRecord}
        >
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, selectedRecord ? null : styles.disabledButton]}
          onPress={handlePrint}
          disabled={!selectedRecord}
        >
          <Text style={styles.actionButtonText}>Print</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={filterModalVisible} onRequestClose={toggleFilterModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalItem} onPress={() => setDateFilter('Today')}>
              <Text style={styles.modalText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => setDateFilter('Yesterday')}>
              <Text style={styles.modalText}>Yesterday</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => setDateFilter('This Week')}>
              <Text style={styles.modalText}>This Week</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => setDateFilter('This Month')}>
              <Text style={styles.modalText}>This Month</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => setDateFilter('This Year')}>
              <Text style={styles.modalText}>This Year</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => setDateFilter('All')}>
              <Text style={styles.modalText}>All</Text>
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
    </View>
  );
};

const columnWidths = [150, 150, 150, 100, 100]; // Updated to include all columns

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
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 5,
  },
  filterLabel: {
    marginLeft: '49%',
    fontSize: 16,
  },
  dropdownButton: {
    height: 30,
    width: 100,
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
    flex: 1,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableBody: {
    maxHeight: '80%',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedRow: {
    backgroundColor: '#ffcccb',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  actionButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ffcccb',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 16,
  },
});

export default ResidentRecords;
