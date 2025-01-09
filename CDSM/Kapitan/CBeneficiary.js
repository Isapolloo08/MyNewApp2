import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CBeneficiary = () => {
  return (
    <View style={styles.container}>
      <Text>Beneficiary Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CBeneficiary;
