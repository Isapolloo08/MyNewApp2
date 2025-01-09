import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { UserRoleContext } from '../context/UserRoleContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { saveAuthData } from '../SecureStoreage/secureStoreHelpers';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { setUserRole } = useContext(UserRoleContext);

  const handleLogin = () => {

    axios.post('http://brgyapp.lesterintheclouds.com/login.php', { username, password })
        .then(response => {
            let userRole = null;
            if (response.data.success) {
                const { role } = response.data;
                // Save the role if needed, or use it directly
                // For example: localStorage.setItem('role', role); 
                userRole = response.data.role
                saveUsersData(response.data.userID);
                setUserRole(userRole);
                navigation.navigate('Homes', { role: userRole });
            } else {
                Alert.alert('Login failed', response.data.message || 'Invalid username or password');
            }
        })
        .catch(error => {
            // console.error('Login failed', error.response ? error.response.data : error.message);
            Alert.alert('Login failed', 'An error occurred');
        });
    // let userRole = null;

    // if (username === 'Admin' && password === 'Password') {
    //   userRole = 'admin';
    // } else if (username === 'Resident' && password === 'Password') {
    //   userRole = 'resident';
    // } else if (username === 'Captain' && password === 'Password') {
    //   userRole = 'captain';
    // } else if (username === 'Secretary' && password === 'Password') {
    //   userRole = 'secretary';
    // } else {
    //   Alert.alert('Invalid credentials', 'Please check your username and password.');
    //   return;
    // }
    // setUserRole(userRole);

    // Navigate to the home screen with user role information

    

    // axios.post('http://localhost:3001/api/login', { username, password })
    //         .then(response => {
    //             if (response.data.success) {
    //                 // Navigate to the Home screen if authenticated
    //                 navigation.navigate('Home');
    //             } else {
    //                 // Display an error message for unsuccessful login
    //                 Alert.alert('Invalid credentials', 'Please check your username and password.');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('There was an error logging in!', error);
    //         });
  };
;
  const saveUsersData = async (userIDs) => {
    const keys = 'UserID';
  
    try {
      await saveAuthData(keys, userIDs);
      console.log('User authentication data saved successfully.');
    } catch (error) {
      console.error('Error saving authentication data:', error);
    }
  }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/profileIcon.png')}
                style={styles.image}
            />
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />  
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.showPasswordButton} onPress={toggleShowPassword}>
                <View style={[styles.checkbox, showPassword && styles.checkedCheckbox]}>
                    {showPassword && <Text style={styles.checkboxText}>✓</Text>}
                </View>
                <Text style={styles.showPasswordText}>Show Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>Forgot Password?</Text>
                <Text style={styles.bottomText}>Register</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    image:{
        width: 50,
        height: 50,
        resizeMode: 'cover',
        marginTop: -100,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#9B9393',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#9B9393',
    },
    button: {
        backgroundColor: '#710808',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    showPasswordButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#710808',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 120,
    },
    checkedCheckbox: {
        backgroundColor: '#710808',
    },
    checkboxText: {
        color: 'white',
        fontSize: 14,
    },
    showPasswordText: {
        fontSize: 14,
        color: '#710808',
        fontWeight: 'bold'
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '80%',
    },
    bottomText: {
        color: '#710808',
        fontSize: 14,
        fontWeight: 'bold'
    },
});

export default LoginScreen;
