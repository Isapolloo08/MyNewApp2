// CustomHeader.js
import React from 'react';
import { View, Text,Image, StyleSheet } from 'react-native';

const CustomHeader = ({ title }) => {
    return (
        <View style={styles.header}>
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
    header: {
        height: 200,
        backgroundColor: '#710808',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    image: {
        width: '50%', // Adjust the width as needed
        height: '50%', // Adjust the height as needed
        marginBottom: 290, // Adjust the margin below the image
      },
      text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: -250, // Adjust the margin top to move closer to the image
      },
      text1: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'arial',
        marginTop: -50, // Adjust the margin top to move closer to the image
      },
});

export default CustomHeader; // Ensure correct export
