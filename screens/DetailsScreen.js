import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Piste ka gumana ka dinnnnnnnnnn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the entire screen
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    backgroundColor: 'white', // Black background
  },
  text: {
    color: 'black', // White text color
    fontSize: 20, // Font size
  },
});

export default DetailsScreen;
