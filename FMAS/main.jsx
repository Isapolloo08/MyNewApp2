// app/main.jsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Dimensions } from 'react-native';


export default function Main({ navigation }) {
  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text style={styles.title}>Navigation Menu</Text>
      <View style={styles.card}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('budgets')}>
          <Text style={styles.buttonText}>Budget Planning and Monitoring</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('transact')}>
          <Text style={styles.buttonText}>Revenue and Expense</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('payroll')}>
          <Text style={styles.buttonText}>Payroll Management</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('financial')}>
          <Text style={styles.buttonText}>Financial Reports</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('audit')}>
          <Text style={styles.buttonText}>Audit Trail</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#710808',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: '#710808',
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
