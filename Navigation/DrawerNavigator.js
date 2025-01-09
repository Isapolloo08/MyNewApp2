// DrawerNavigator.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Screen/HomeScreen'; // Adjust path as necessary
import CustomDrawerContent from './CustomDrawerContent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserRoleProvider } from '../context/UserRoleContext'; // Adjust path as necessary

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <UserRoleProvider>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false, // Hide the default header
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={22} color={color} />
            ),
          }}
        />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </UserRoleProvider>
  );
};

export default DrawerNavigator;
