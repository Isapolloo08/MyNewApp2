// CustomDrawerContent.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import CustomHeader from './CustomHeader'; // Assuming CustomHeader.js path

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <CustomHeader title="BARANGAY APPLICATION" />
                <Text style={styles.subtitle}>BARANGAY III, DAET, CAMARINES NORTE</Text>
                <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Profile')}>
                    <Text style={styles.drawerItemText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('About Us')}>
                    <Text style={styles.drawerItemText}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Settings')}>
                    <Text style={styles.drawerItemText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: 'black', // Adjust background color as needed
    },
    subtitle: {
        color: '#710808',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    drawerItem: {
        paddingVertical: 10,
    },
    drawerItemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomDrawerContent;
