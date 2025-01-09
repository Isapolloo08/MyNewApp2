import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeader_BPM = () => {
  return (
    <View style={styles.titleContainer}>

      <Text style={styles.titleText}>
        Budget Planning and{'\n'}Monitoring
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

export default CustomHeader_BPM;
