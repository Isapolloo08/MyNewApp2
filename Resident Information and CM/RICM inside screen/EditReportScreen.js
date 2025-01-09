import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useReportContext } from './ReportContext'; // Adjust the import path as needed

const EditReportScreen = ({ route, navigation }) => {
  const { report } = route.params;
  const { reportData, setReportData } = useReportContext();
  const [font, setFont] = useState(reportData[report].font);
  const [fontSize, setFontSize] = useState(reportData[report].fontSize);
  const [fontStyle, setFontStyle] = useState(reportData[report].fontStyle);
  const [content, setContent] = useState(reportData[report].content);

  const showCancelAlert = () => {
    Alert.alert(
      "Are you sure you want to cancel?",
      "Any unsaved changes will be lost.",
      [
        {
          text: "No",
          style: "cancel"
        },
        { text: "Yes", onPress: () => navigation.goBack() }
      ]
    );
  };

  const showSaveAlert = () => {
    Alert.alert(
      "Your changes have been saved successfully.",
      "",
      [{ text: "Proceed", onPress: () => {
          const newReportData = {
            ...reportData,
            [report]: { font, fontSize, fontStyle, content }
          };
          setReportData(newReportData);
          navigation.navigate('ViewReportScreen', { report });
        }
      }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Report: {report}</Text>
      <View style={styles.editBox}>
        <Text>Font:</Text>
        <Picker selectedValue={font} onValueChange={(itemValue) => setFont(itemValue)}>
          <Picker.Item label="Arial" value="Arial" />
          <Picker.Item label="Times New Roman" value="Times New Roman" />
          <Picker.Item label="Courier New" value="Courier New" />
        </Picker>
        <Text>Font Size:</Text>
        <Picker selectedValue={fontSize} onValueChange={(itemValue) => setFontSize(itemValue)}>
          <Picker.Item label="10" value={10} />
          <Picker.Item label="12" value={12} />
          <Picker.Item label="14" value={14} />
          <Picker.Item label="16" value={16} />
          <Picker.Item label="18" value={18} />
          <Picker.Item label="20" value={20} />
          <Picker.Item label="22" value={22} />
          <Picker.Item label="24" value={24} />
        </Picker>
        <Text>Font Style:</Text>
        <Picker selectedValue={fontStyle} onValueChange={(itemValue) => setFontStyle(itemValue)}>
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Italic" value="italic" />
          <Picker.Item label="Bold" value="bold" />
        </Picker>
        <Text>Content:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setContent(text)}
          value={content}
        />
      </View>
      <Text style={[styles.preview, { fontFamily: font, fontSize: fontSize, fontStyle: fontStyle }]}>
        {content || 'Preview of the report content here'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={showCancelAlert} />
        <Button title="Save" onPress={showSaveAlert} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editBox: {
    backgroundColor: 'lightgray',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  preview: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditReportScreen;
