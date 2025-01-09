import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomDrawerContent = ({ navigation }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleButtonPress = () => {
    if (!isButtonDisabled) {
      // Perform navigation or other actions here
      navigation.navigate('SomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.disabledButton]}
        onPress={handleButtonPress}
        disabled={isButtonDisabled}
      >
        <Text style={[styles.buttonText, isButtonDisabled && styles.disabledButtonText]}>Navigate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsButtonDisabled(!isButtonDisabled)}
      >
        <Text style={styles.buttonText}>
          {isButtonDisabled ? 'Enable Button' : 'Disable Button'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d6d6d6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  disabledButtonText: {
    color: '#a1a1a1',
  },
  toggleButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default CustomDrawerContent;
