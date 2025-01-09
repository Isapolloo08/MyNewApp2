// App.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define your sub-screens
const SubScreen1 = () => (
  <View style={styles.container}>
    <Text style={styles.screenText}>SubScreen1</Text>
  </View>
);

const SubScreen2 = () => (
  <View style={styles.container}>
    <Text style={styles.screenText}>SubScreen2</Text>
  </View>
);

// Define your custom drawer content
const CustomDrawerContent = ({ navigation }) => {
  const [isNotificationsExpanded, setIsNotificationsExpanded] = useState(false);

  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.drawerItem}>
        <Text style={styles.drawerItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => setIsNotificationsExpanded(!isNotificationsExpanded)} 
        style={styles.drawerItem}
      >
        <Text style={styles.drawerItemText}>Notifications</Text>
        <Ionicons name={isNotificationsExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
      </TouchableOpacity>
      {isNotificationsExpanded && (
        <View style={styles.subMenu}>
          <TouchableOpacity onPress={() => navigation.navigate('SubScreen1')} style={styles.drawerSubItem}>
            <Text style={styles.drawerSubItemText}>SubScreen1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SubScreen2')} style={styles.drawerSubItem}>
            <Text style={styles.drawerSubItemText}>SubScreen2</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Define your drawer navigator
const Drawer = createDrawerNavigator();

const DrawerScreen = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} initialRouteName="Home">
    <Drawer.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name='people-outline' size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen name="SubScreen1" component={SubScreen1} />
    <Drawer.Screen name="SubScreen2" component={SubScreen2} />
  </Drawer.Navigator>
);

// Main App component
const App = () => (
  <NavigationContainer>
    <DrawerScreen />
  </NavigationContainer>
);

// Styles
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  drawerItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  drawerSubItem: {
    marginLeft: 20,
    paddingVertical: 5,
  },
  drawerSubItemText: {
    fontSize: 16,
    color: '#666',
  },
  subMenu: {
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
