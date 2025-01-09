import * as SecureStore from 'expo-secure-store';

export const saveAuthData = async (keys, value) => {
  try {
    await SecureStore.setItemAsync(keys, value);
    console.log(`Data saved under key: ${keys}`);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Retrieve data with user ID as the key
export const getAuthData = async (keys) => {
  try {
    const value = await SecureStore.getItemAsync(keys);
    return value || null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

// Delete data with user ID as the key
export const deleteAuthData = async (keys) => {
  try {
    await SecureStore.deleteItemAsync(keys);
    console.log(`Data under key: ${keys} deleted.`);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};