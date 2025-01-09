// Header_subscreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome5';

const Header_subscreen = ({ navigation }) => {
    return (
        <View style={styles.header}>    
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon1 name={'bars'} style={styles.icon} size={30} color="white" />
                </TouchableOpacity> 
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
        height: 150, // Increased height to accommodate lower position of back button
        backgroundColor: '#710808',
        justifyContent: 'center',   
        alignItems: 'center',
        paddingTop: 20, // Added padding to top align content
        marginTop: 50, 
    },

 
    icon: {
        position: 'absolute',
        right: 140,
        bottom: 30,
    },
    image: {
        width: '50%', // Adjust the width as needed
        height: '50%', // Adjust the height as needed
        marginBottom: 280, // Adjust the margin below the image
        marginTop: -50,
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
        marginTop: -50, // Adjust the margin top to move closer to the image
    },
});

export default Header_subscreen;
