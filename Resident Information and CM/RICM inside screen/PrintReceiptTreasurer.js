import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Function to convert number to words
const numberToWords = (num) => {
  const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const thousands = ['', 'Thousand', 'Million', 'Billion'];

  let word = '';
  if (num === 0) return 'Zero';

  const convertToWords = (n) => {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 11];
    if (n < 100) return tens[Math.floor(n / 10) - 2] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + convertToWords(n % 100) : '');
    for (let i = 0; i < thousands.length; i++) {
      const divisor = Math.pow(1000, i + 1);
      if (n < divisor) return convertToWords(Math.floor(n / Math.pow(1000, i))) + ' ' + thousands[i] + (n % Math.pow(1000, i) ? ' ' + convertToWords(n % Math.pow(1000, i)) : '');
    }
  };

  word = convertToWords(num);
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const PrintReceiptTreasurer = ({ route }) => {
  const { document } = route.params;

  // Convert amount to words
  const amountInWords = numberToWords(document.amount);

  return (
    <View style={styles.container}>
      <View style={styles.receiptContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.receipt}>
            <View style={styles.header}>
              <Text style={styles.title}>OFFICIAL RECEIPT</Text>
              <Text style={styles.subtitle}>REPUBLIC OF THE PHILIPPINES</Text>
              <View style={styles.twoColumnGrid}>
                <View style={styles.column}>
                  <Text style={styles.date}>Accountable Form No. 61 Revised January, 1992</Text>
                  <Text style={styles.date}>Date: <Text style={[styles.text, {fontWeight: 'bold'}]}>{document.date}</Text></Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.orNumber}>Duplicate</Text>
                  <Text style={styles.orNumber}>No. <Text style={[styles.text, {fontWeight: 'bold', fontSize: 18}]}>{document.OR}</Text></Text>
                </View>
              </View>
            </View>
                <View style={styles.details}>
                  <Text style={[styles.orNumber, {textAlign: 'left'}]}>Agency: </Text>
                  <Text style={[styles.orNumber, {textAlign: 'left'}]}>Fund:</Text>
                  <Text style={[styles.orNumber, {textAlign: 'left'}]}>Payor: <Text style={[styles.text, {fontWeight: 'bold', fontSize: 16}]}>{`${document.firstName} ${document.middleName} ${document.lastName} ${document.suffix}`}</Text></Text>
                </View>
            
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableCellHeader}>Nature of Collection</Text>
                  <Text style={styles.tableCellHeader}>Account Code</Text>
                  <Text style={styles.tableCellHeader}>Amount</Text>
                </View>
                {/* Displaying the row with the document details */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{document.documentType}</Text>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCell}>{document.amount}</Text>
                </View>
                {/* Displaying blank rows */}
                {[...Array(4)].map((_, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}></Text>
                    <Text style={styles.tableCell}></Text>
                    <Text style={styles.tableCell}></Text>
                  </View>
                ))}
              </View>
              <View style={styles.details}>
                <Text style={styles.text}> Total: <Text style={[styles.text, {fontWeight: 'bold', fontSize: 16}]}>{document.amount}</Text></Text>
                <Text style={styles.text}> Amount in Words: <Text style={[styles.text, {fontWeight: 'bold', fontSize: 16}]}>{amountInWords}</Text></Text>
              </View>
            <View style={styles.details}>
                <Text style={styles.text}><Text style={styles.checkbox}>☐</Text> Cash</Text>
                <Text style={styles.text}><Text style={styles.checkbox}>☐</Text> Check</Text>
                <Text style={styles.text}><Text style={styles.checkbox}>☐</Text> Money Order</Text>
                <Text style={styles.text}>Drawee Bank: ________________________</Text>
                <Text style={styles.text}>Number: ____________________________</Text>
                <Text style={styles.text}>Date: ______________________________</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.text}>Received the amount stated above</Text>
                <Text style={styles.text}>Collecting Officer: __________________________</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.note}>Note: Write the number and date of this receipt at the back of check or money order received.</Text>
              </View>
            </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  receiptContainer: {
    width: '90%',
    height: '95%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  receipt: {
    paddingTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: '#555',
  },
  twoColumnGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginTop: 10,
    backgroundColor: '#f9f9f9',
  },
  orNumber: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginTop: 10,
    backgroundColor: '#f9f9f9',
  },
  box: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  details: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 14,
    margin: 5,
  },
  tableContainer: {
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCellHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  checkbox: {
    fontSize: 14,
    marginRight: 10,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
  },
  note: {
    fontSize: 12,
    color: '#555',
  },
});

export default PrintReceiptTreasurer;
