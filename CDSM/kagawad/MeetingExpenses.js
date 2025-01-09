import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Button, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MeetingExpenses = ({ navigation, route }) => {
  const { meetingName, startTime, endTime, location, note, savedParticipantList } = route.params;
  const [expenseName, setExpenseName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [expensesList, setExpensesList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (route.params?.savedExpensesList) {
      setExpensesList(route.params.savedExpensesList);
    }
  }, [route.params]);

  const addExpense = () => {
    const quantityNum = parseFloat(quantity);
    const pricePerUnitNum = parseFloat(pricePerUnit);

    if (expenseName.trim() && !isNaN(quantityNum) && !isNaN(pricePerUnitNum)) {
      const allocation = quantityNum * pricePerUnitNum;

      const newExpense = {
        name: expenseName,
        quantity: quantityNum,
        pricePerUnit: pricePerUnitNum,
        allocation,
      };

      if (selectedIndex !== null) {
        const updatedList = expensesList.map((item, index) =>
          index === selectedIndex ? newExpense : item
        );
        setExpensesList(updatedList);
        setSelectedIndex(null);
      } else {
        setExpensesList([...expensesList, newExpense]);
      }
      
      setExpenseName('');
      setQuantity('');
      setPricePerUnit('');
    } else {
      Alert.alert('Error', 'Please fill in all fields with valid numbers.');
    }
  };

  const handleNextPress = () => {
    if (expensesList.length === 0) {
      Alert.alert('Error', 'Please add at least one expense.');
    } else {
      navigation.navigate('ConfirmMeeting', { 
        meetingName,
        startTime,
        endTime,
        location,
        note,
        savedParticipantList,
        savedExpensesList: expensesList 
      });
    }
  };
  
  const handleSkipPress = () => {
    navigation.navigate('ConfirmMeeting', {
      meetingName,
      startTime,
      endTime,
      location,
      note,
      savedParticipantList,
      savedExpensesList: expensesList 
    });
  };

  const handleItemPress = (index) => {
    if (index === selectedIndex) {
      setSelectedIndex(null);
      setExpenseName('');
      setQuantity('');
      setPricePerUnit('');
    } else {
      setSelectedIndex(index);
      setExpenseName(expensesList[index].name);
      setQuantity(expensesList[index].quantity.toString());
      setPricePerUnit(expensesList[index].pricePerUnit.toString());
    }
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const updatedList = expensesList.filter((_, index) => index !== selectedIndex);
      setExpensesList(updatedList);
      setSelectedIndex(null);
      setExpenseName('');
      setQuantity('');
      setPricePerUnit('');
    } else {
      Alert.alert('Error', 'Please select an item to delete.');
    }
  };

  const handleCancel = () => {
    setSelectedIndex(null);
    setExpenseName('');
    setQuantity('');
    setPricePerUnit('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <View style={styles.step}>
            <Text style={[styles.stepLabel, styles.doneLabel]}>Meeting</Text>
            <View style={[styles.stepNumber, styles.doneStep]}>
              <Icon name="check" size={15} color="#FFF" />
            </View>
          </View>
          <View style={[styles.step, styles.activeStep]}>
            <Text style={[styles.stepLabel, styles.doneLabel]}>Participants</Text>
            <View style={[styles.stepNumber, styles.doneStep]}>
              <Icon name="check" size={15} color="#FFF" />
            </View>
          </View>
          <View style={styles.step}>
            <Text style={[styles.stepLabel, styles.activeLabel]}>Expenses</Text>
            <Text style={[styles.stepNumber, styles.activeNumber]}>3</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepLabel}>Confirmation</Text>
            <Text style={styles.stepNumber}>4</Text>
          </View>
        </View>

        {/* Form for adding or updating expenses */}
        <View style={styles.form}>
          <Text style={styles.label}>
            Expense Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Expense Name"
            value={expenseName}
            onChangeText={setExpenseName}
          />
          <Text style={styles.label}>
            Quantity <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <Text style={styles.label}>
            Price Per Unit <Text style={styles.required}>*</Text>
          </Text>          
          <TextInput
            style={styles.input}
            placeholder="Price Per Unit"
            value={pricePerUnit}
            onChangeText={setPricePerUnit}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addButton} onPress={addExpense}>
            <Icon
              name={selectedIndex !== null ? 'refresh' : 'plus'}
              size={15}
              color="#FFF"
              style={styles.addIcon}
            />
            <Text style={styles.addButtonText}>{selectedIndex !== null ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Table of expenses */}
      <View style={styles.bottomContainer}>
        <View style={styles.tableContainer}>
          {/* Table header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Expense Name</Text>
            <View style={styles.separator} />
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Quantity</Text>
            <View style={styles.separator} />
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Price Per Unit (₱)</Text>
            <View style={styles.separator} />
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Funds Allocation (₱)</Text>
          </View>
          {/* Table rows */}
          <FlatList
            data={expensesList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleItemPress(index)} style={{ flex: 1 }}>
                <View
                  style={[
                    styles.tableRow,
                    index % 2 === 0 && styles.tableRowEven,
                    selectedIndex === index && styles.selectedRow,
                  ]}
                >
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.name}</Text>
                  <View style={styles.separator} />
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity?.toString()}</Text>
                  <View style={styles.separator} />
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.pricePerUnit?.toString()}</Text>
                  <View style={styles.separator} />
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.allocation.toLocaleString()}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <View style={styles.tableFooter}>
                <Text style={[styles.tableFooterText, { flex: 1 }]}>TOTAL</Text>
                <View style={styles.separator} />
                <Text style={[styles.tableFooterText, { flex: 1 }]}>
                  {expensesList.reduce((total, item) => total + item.allocation, 0).toLocaleString()}
                </Text>
              </View>
            }
          />
        </View>

        {/* Buttons for delete and cancel */}
        {selectedIndex !== null && (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.cancelButton, { width: '45%' }]} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.deleteButton, { width: '45%' }]} onPress={handleDelete}>
              <Icon name="trash" size={15} color="#FFF" />
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Next and Skip buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={handleNextPress}  color="#710808" />
          <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
            <Text style={styles.skipButtonText}>Skip</Text>
            <Icon name="arrow-right" size={15} color="#710808" style={styles.skipIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  topContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    marginBottom: 16,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    justifyContent: 'space-between',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  step: {
    alignItems: 'center',
  },
  stepLabel: {
    color: '#D9D9D9',
    marginBottom: 4,
    fontSize: 10,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneLabel: {
    color: '#710808', // Red color for done step label
  },
  doneStep: {
    backgroundColor: '#710808', // Red background for done step
  },
  activeStep: {
    alignItems: 'center',
  },
  activeLabel: {
    color: '#000',
  },
  activeNumber: {
    backgroundColor: '#710808',
  },
  form: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  required: {
    color: '#710808',
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#FFF',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#710808',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    marginRight: 5,
  },
  addButtonText: {
    color: '#FFF',
  },
  tableContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CCC', // Color of the separation line
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#710808',
    padding: 8,
  },
  tableHeaderText: {
    color: '#FFF',
    fontWeight: 'bold',
    flex: 1, // Ensure the header text takes equal space
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  tableRowEven: {
    backgroundColor: '#F5F5F5',
  },
  selectedRow: {
    backgroundColor: '#D9D9D9',
  },
  tableCell: {
    flex: 1, // Ensure cells take equal space
    textAlign: 'center',
    color: '#000',
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#FFF',
  },
  tableFooterText: {
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1, // Ensure footer text takes equal space
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#710808',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: '#CCC',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
  },
  buttonContainer: {
    width: 320,
    marginBottom: 10,
    alignItems: 'center',
    color: '#710808',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: -10, // Adjust this value as needed
  },
  skipButtonText: {
    color: '#710808',
    marginRight: 5,
  },
  skipIcon: {
    color: '#710808',
  },
  separator: {
    width: 1,
    backgroundColor: '#CCC',
  },
});

export default MeetingExpenses;
