import React, { useState } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateAccount = (props) => {
    const { navigation } = props;

    const [regUsername, setRegUsername] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleAccount = () => {
        if (regUsername !== '' && regPassword !== '' && confirmPassword !== '') {
            if (regPassword === confirmPassword) {
                axios.post('http://brgyapp.lesterintheclouds.com/createUsers.php', {
                    regUsername, regPassword
                })
                .then(response => {
                    if(response.data.success){
                        Alert.alert('Succesful', response.data.message);
                    }
                    else{  
                    }
                })
                .catch(error => {
                    Alert.alert('Failedss', 'Failed to add.');
                })
                // Navigate to the appropriate screen after successful registration
                navigation.navigate('LogIn'); // Replace 'LogInScreen' with your desired screen name
            } else {
                Alert.alert('Error', 'Passwords do not match!');
            }
        } else {
            Alert.alert('Error', 'All fields are required!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>CREATE AN ACCOUNT</Text>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={regUsername}
                    onChangeText={setRegUsername}
                />
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Password"
                        value={regPassword}
                        onChangeText={setRegPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={styles.showPasswordButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#9B9393" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                        style={styles.showPasswordButton}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Icon name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#9B9393" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleAccount}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F3F7',
        paddingHorizontal: 20,
    },
    box: {
        width: '100%',
        padding: 35,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 30,
        color: '#710808',
        fontWeight: 'bold',
    },
    label: {
        width: '100%',
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#9B9393',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#E8E8E8',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    inputPassword: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#9B9393',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#E8E8E8',
    },
    showPasswordButton: {
        position: 'absolute',
        right: 10,
    },
    button: {
        backgroundColor: '#710808',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CreateAccount;
