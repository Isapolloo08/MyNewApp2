import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeaderTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>
        REVENUE AND{'\n'}EXPENSE TRACKING
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    color: '#fff', // Header text color
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CustomHeaderTitle;
