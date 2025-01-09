//SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LogIn');
    }, 3000)
  })

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain" // Adjust the resizeMode as needed
      />
      <Text style={styles.text}>BARANGAY APPLICATION</Text>
      <Text style={styles.text1}>BARANGAY III, DAET, CAMARINES NORTE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#710808',
  },
  image: {
    marginTop: -200,
    width: '50%', // Adjust the width as needed
    height: '50%', // Adjust the height as needed
    marginBottom: 150, // Adjust the margin below the image
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -210, // Adjust the margin top to move closer to the image
  },
  text1: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'arial',
    marginTop: -50, // Adjust the margin top to move closer to the image
  },
});

export default SplashScreen;
