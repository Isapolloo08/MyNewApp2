import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Image } from 'react-native'; // Import Picker from react-native
import ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

const CaseReport = () => {
  const [imageUri, setImageUri] = useState(null);
  const [selectedValue, setSelectedValue] = useState('incidentType');

  const selectImage = () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImageUri(source);
        // You can now upload `response.uri` to your server or cloud storage
      }
    });
  };

  const handleCancel = () => {
    // Reset selectedValue or perform any other cancel action
    setSelectedValue('incidentType');
  };

  const handleSave = () => {
    // Handle save action with selectedValue
    console.log('Selected value:', selectedValue);
    // Perform save action or state update as needed
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box1}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Incident No. :</Text>
          <Text style={styles.label}>Case Status :</Text>
        </View>
        <View style={styles.textContainer1}>
          <Text style={styles.label1}>Date :</Text>
          <Text style={styles.label1}>Place of Incident :</Text>
          <Text style={styles.label1}>Type of Incident :</Text>
          <Text style={styles.label1}>Description :</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.ContText}>Description</Text>
        </View>
      </View>
      <View style={styles.box2}>
        <Text style={styles.CIText}>Complainant Information :</Text>
        <Text style={styles.label2}>Name of Complainant :</Text>
        <Text style={styles.label2}>Phone Number :</Text>
        <Text style={styles.label2}>Address :</Text>
      </View>
      <View style={styles.box3}>
        <Text style={styles.RITextt}>Respondent Information :</Text>
        <View style={styles.textContainer2}>
          <Text style={styles.Label3}>Name of Respondent</Text>
          <Text style={styles.Label3}>Address</Text>
        </View>
      </View>
      <View style={styles.box4}>
        <Text style={styles.UPVText}>Upload Photos/Videos (Optional)</Text>
        <View style={styles.picsbox}>
          {imageUri && <Image source={imageUri} style={styles.image} />}
          <Button title="Select Image" onPress={selectImage} />
        </View>
      </View>
      <View style={styles.box5}>
        {/* Other components */}
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Select Incident Type" value="incidentType" />
          <Picker.Item label="Type A" value="typeA" />
          <Picker.Item label="Type B" value="typeB" />
          <Picker.Item label="Type C" value="typeC" />
        </Picker>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleCancel} color="red" />
          <Button title="Save" onPress={handleSave} />
      </View>
      </View>
      {/* Other sections */}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    minHeight: '100%', // Ensure the content is at least the height of the screen
    backgroundColor: '#f0f0f0', // Set a background color for better contrast
  },
  textContainer: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-evenly', // Center items horizontally
  },
  RITextt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginEnd: 'auto',
    color: 'red',
  },
  Label3: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 60,
    color: 'white',
    marginBottom: 5,
    marginTop: 5,
  },
  textContainer2: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#710808',
    justifyContent: 'center',
    marginTop: 10,
    marginVertical: 'auto',
  },
  label2: {
    marginEnd: 'auto',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picsbox: {
    width: '100%', // 90% of the parent width
    minHeight: 200, // Minimum height for each container
    backgroundColor: '#F4EAEA', // White background
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Outline color
    flexDirection: 'column',
  },
  CIText: {
    marginEnd: 'auto',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  textContainer1: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginEnd: 'auto',
  },
  label1: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  Label4: {
    marginRight: 40,
    marginEnd: 'auto',
    marginLeft: 40,
  },
  UPVText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    marginEnd: 'auto',
    marginBottom: 'auto',
  },
  box1: {
    width: '100%', // 90% of the parent width
    minHeight: 100, // Minimum height for each container
    backgroundColor: '#fff', // White background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Outline color
  },
  box2: {
    width: '100%', // 90% of the parent width
    minHeight: 100, // Minimum height for each container
    backgroundColor: '#fff', // White background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Outline color
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 65, // Adjust spacing between labels
  },
  box3: {
    width: '100%', // 90% of the parent width
    minHeight: 200, // Minimum height for each container
    backgroundColor: '#fff', // White background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Outline color
  },
  box: {
    width: '110%', // 90% of the parent width
    minHeight: 130, // Minimum height for each container
    backgroundColor: '#fff', // White background
    padding: 20,
    marginVertical: -10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Outline color
  },
  box4: {
    width: '100%', // 90% of the parent width
    minHeight: 100, // Minimum height for each container
    backgroundColor: '#fff', // White background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Outline color
  },
  box5: {
    width: '100%', // 90% of the parent width
    minHeight: 100, // Minimum height for each container
    backgroundColor: '#fff', // White background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  picker: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default CaseReport;