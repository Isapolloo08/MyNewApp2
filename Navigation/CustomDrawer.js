import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CustomDrawer = (props) => {
  return (
    <View style={{flex:1, backgroundColor: '#710808'}}>
    <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#710808'}}>
    <View style={{borderBottomWidth: 1, borderBottomColor: '#ffffff'}}>
            <ImageBackground source={require('../assets/logo.png')} blurRadius={5} style={{padding: 20, marginBottom: 5}}>
                <View style={{flexDirection: 'row'}}>
                    <Image source={require('../assets/profile.png')} style={{height: 110, width: 110, resizeMode: 'cover',}}/>
                    <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 30,}}>
                        <Text style={{color: '#000000', fontSize: 30, fontFamily: 'Roboto', fontWeight: 'bold'}}>Miss U</Text>
                        <Text style={{color: '#000000', fontSize: 18}}>09632991145</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
        <View style={{paddingTop: 10}}>
            <DrawerItemList {...props}/>
        </View>
    </DrawerContentScrollView>
    <View style={{borderTopWidth: 1, borderTopColor: '#fff', padding: 15}}>
        <TouchableOpacity onPress={() => {}} style={{marginLeft: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name='log-out-outline' size={22} style={{color: '#fff'}}/>
                <Text 
                    style={{
                        fontSize: 15,
                        fontFamily: 'Roboto',
                        marginLeft: 10,
                        color: '#fff'
                    }}>
                    Log Out
                </Text>
            </View>
        </TouchableOpacity>
    </View>
    </View>
  )
}

const CustomDrawerContent = (props) => {
  const [isNotificationsExpanded, setIsNotificationsExpanded] = React.useState(false);

  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.drawerItem}>
        <Text style={styles.drawerItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => setIsNotificationsExpanded(!isNotificationsExpanded)} 
        style={styles.drawerItem}
      >
        <Text style={styles.drawerItemText}>Notifications</Text>
        <Icon name={isNotificationsExpanded ? 'up' : 'down'} size={24} color="black"  />
      </TouchableOpacity>
      {isNotificationsExpanded && (
        <View style={styles.subMenu}>
          <TouchableOpacity onPress={() => props.navigation.navigate('SubScreen1')} style={styles.drawerSubItem}>
            <Text style={styles.drawerSubItemText}>SubScreen1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('SubScreen2')} style={styles.drawerSubItem}>
            <Text style={styles.drawerSubItemText}>SubScreen2</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    drawerContent: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 10,
      backgroundColor: 'white',
    },
    drawerItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    drawerItemText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    drawerSubItem: {
      marginLeft: 20,
      marginVertical: 5,
    },
    drawerSubItemText: {
      fontSize: 16,
      color: 'black',
    },
    subMenu: {
      paddingLeft: 20,
    },
  });

export default CustomDrawer