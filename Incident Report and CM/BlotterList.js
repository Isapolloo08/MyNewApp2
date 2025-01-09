import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const BlotterList = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const updateSearch = (text) => {
    setSearch(text);
    // Perform search logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainerWrapper}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          platform="default"
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          cancelButtonProps={{ color: '#000' }} // Customize cancel button color
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('BlotterForm')} style={styles.drawerItem}>
        <Icon style={styles.iconn} name="pluscircle" size={50} color="#710808" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  searchContainerWrapper: {
    width: '100%',
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 0,
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
  },
  inputStyle: {
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  drawerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30, // Add some padding to avoid bottom screen edges
  },
  iconn: {
    marginLeft: 'auto',
  },
});

export default BlotterList;
