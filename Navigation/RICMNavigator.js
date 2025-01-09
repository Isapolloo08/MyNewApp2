import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Foundation';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const navigation = useNavigation();

  const toggleSubMenu = (item) => {
    if (expandedItems.includes(item)) {
      setExpandedItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
    } else {
      setExpandedItems((prevItems) => [...prevItems, item]);
    }
  };

  const handleLogout = () => {
    // Assuming you have some kind of authentication management in your app,
    // you might want to clear any auth tokens here as well.

    // Reset navigation stack and navigate to SplashScreen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#710808' }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#710808' }}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ffffff' }}>
          <ImageBackground source={require('../assets/logo.png')} blurRadius={5} style={{ padding: 20, marginBottom: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../assets/profile.png')} style={{ height: 110, width: 110, resizeMode: 'cover' }} />
              <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 30 }}>
                <Text style={{ color: '#000000', fontSize: 30, fontFamily: 'Roboto', fontWeight: 'bold' }}>Miss U</Text>
                <Text style={{ color: '#000000', fontSize: 18 }}>09632991145</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{ paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
        <View style={styles.drawerContent}>
          <TouchableOpacity onPress={() => toggleSubMenu('ResidentInfo')} style={styles.drawerItem}>
            <Icon1 name={'torsos-all-female'} size={24} color="white" />
            <Text style={styles.drawerItemText}>
              Resident Information{'\n'}and Census Management
            </Text>
            <Icon name={expandedItems.includes('ResidentInfo') ? 'up' : 'down'} size={24} color="white" />
          </TouchableOpacity>
          {expandedItems.includes('ResidentInfo') && (
            <View style={styles.subMenu}>
              <TouchableOpacity onPress={() => props.navigation.navigate('RequestDocument')} style={styles.drawerSubItem}>
                <Text style={styles.drawerSubItemText}>Request Document</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('ServiceRecord')} style={styles.drawerSubItem}>
                <Text style={styles.drawerSubItemText}>Service Record</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('ResidentRegistrationandProfiling')} style={styles.drawerSubItem}>
                <Text style={styles.drawerSubItemText}>Resident Registration and Profiling</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('CensusData')} style={styles.drawerSubItem}>
                <Text style={styles.drawerSubItemText}>Census Data</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity onPress={handleLogout} style={styles.logout}>
        <Icon name={'logout'} size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#710808',
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  drawerSubItem: {
    marginLeft: 20,
    marginVertical: 5,
  },
  drawerSubItemText: {
    fontSize: 16,
    color: 'white',
  },
  subMenu: {
    paddingLeft: 20,
  },
  logout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ffffff',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
});

export default CustomDrawerContent;
