// HomeScreen.js

import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { UserRoleContext } from '../context/UserRoleContext'; // Adjust path as necessary

const HomeScreen = () => {
  const { userRole, setUserRole } = useContext(UserRoleContext);
  const route = useRoute();

  useEffect(() => {
    if (route.params?.role) {
      setUserRole(route.params.role);
    }
  }, [route.params?.role]);

  console.log("Sheesh to Home with role:", userRole); // Debug log

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.roleText}>Role: {userRole}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  roleText: {
    fontSize: 18,
  },
});

export default HomeScreen;
