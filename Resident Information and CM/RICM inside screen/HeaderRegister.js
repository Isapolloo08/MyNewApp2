import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'; // Import ImagePicker
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderRegister = ({ title }) => {
  const [image, setImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant access to your media library to upload an image.');
      return;
    }

    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        setImage(response.uri);
        setImageModalVisible(true);
      }
    });
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant access to your camera to take a photo.');
      return;
    }

    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
      } else {
        setImage(response.uri);
        setCameraModalVisible(true);
      }
    });
  };

  const handleModalClose = () => {
    setImageModalVisible(false);
    setCameraModalVisible(false);
  };

  const handleCameraPress = () => {
    setShowMenu(true);
  };

  const handleMenuOptionPress = (option) => {
    if (option === 'Take a photo') {
      takePhoto();
    } else if (option === 'Upload an image') {
      pickImage();
    } else if (option === 'Cancel') {
      setShowMenu(false);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <Icon name="arrow-back" size={32} color="#FFFFFF" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.imageFrame}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.defaultImage} />
          )}
          <TouchableOpacity style={styles.addButton} onPress={handleCameraPress}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        {showMenu && (
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuOptionPress('Take a photo')}>
              <Text style={styles.menuText}>Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuOptionPress('Upload an image')}>
              <Text style={styles.menuText}>Upload an image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuOptionPress('Cancel')}>
              <Text style={styles.menuText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Modal visible={imageModalVisible || cameraModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: image }} style={styles.modalImage} />
          <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#710808',
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    padding: 10,
  },
  backIcon: {
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    flex: 1,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  imageFrame: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  defaultImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuContainer: {
    position: 'absolute',
    top: 120,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 4,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HeaderRegister;
