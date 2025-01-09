// Blotter.js
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList, Modal, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from 'expo-secure-store';
import { getAuthData } from '../SecureStoreage/secureStoreHelpers';


const Blotter = () => {
  const [newdate, dateSelected] = useState('MM/DD/YYYY')
  const [newhour, hourSelected] = useState('HH')
  const [newminute, minuteSelected] = useState('MM')
  const [newPeriod, periodSelected] = useState('AM')
  const [placeData, setPlaceData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [selectedProceed, setSelectedProceed] = useState(null)
  const [incidentData, setIncident] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState([]);
  const [description, setDescription] = useState('');

  const [complainName, setComplainName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const [isChecked, setChecked] = useState(false)
  const [respoInfoArray, setRespoInfoArray] = useState([]);
  const [resiInfo, setResiInfo] = useState("")
  const [isRender, setIsRender] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [inputName, setInputName] = useState()
  const [editName, setEditName] = useState()
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date());
  const [isFocus, setIsFocus] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [isEdit, setisEdit] = useState(true);
  const [addressID, setAddressID] = useState(null);
  const [resID, setResID] = useState(null);
  const [searchRespondentResult, setSearchRespondentResult] = useState([]);
  const [respondentID, setRespondentID] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [userIDD, setUserIDD] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    getPlacess();
    getIncident();
    getUserData();
  }, [])

  const getUserData = async () => {
    const keys = 'UserID';
    try {
      const userData = await getAuthData(keys);
      if (userData) {
        setUserIDD(userData);
        axios.post('http://brgyapp.lesterintheclouds.com/getUserData.php', {userData})
        .then(response => {
          if (response.data.status === 'success') {
            if(response.data.data.role === 'resident'){
              setComplainName(response.data.data.fullname);
              setAddress(response.data.data.userPlace);
              setAddressID(response.data.data.addressID);
              setResID(response.data.data.residentNum);
              setIsEditable(false);
              setisEdit(false);
              setIsVisible(prevState => !prevState);
            }
            else{
              console.log(response.data.data.role);
            }
          }
          else{
            console.log("awwwwwww");
          }
        })
      } else {
        console.log('No data found for the given key.');
      }
    } catch (error) {
      console.error('Error retrieving authentication data:', error);
    }
  }

  const getPlacess = () => {
    axios.get('http://brgyapp.lesterintheclouds.com/getPlaceData.php')
    .then(response => {
      setPlaceData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
  }

  const getIncident = () => {
    axios.get('http://brgyapp.lesterintheclouds.com/getIncidentData.php')
    .then(response => {
        setIncident(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  const submitReport = () => {
    console.log(selectedProceed);
    if (
      newdate === 'MM/DD/YYYY' || 
      newhour === 'HH' || 
      newminute === 'MM' || 
      !selectedPlace ||
      !selectedIncident.length ||
      !description ||
      !complainName ||
      !phoneNumber ||
      !address ||
      !respoInfoArray.length
    ){
      Alert.alert("Error", "Please fill in all the fields correctly.");
      return;
    }

    // console.log(selectedIncident);
    console.log("sumbitss");
    axios.post('http://brgyapp.lesterintheclouds.com/submitBlotter.php', {
      newdate, newhour, newminute, newPeriod, selectedPlace, selectedIncident, description, complainName, phoneNumber, resID, addressID, address, respoInfoArray, selectedImages, selectedProceed})
    .then(response=>{
      if(response.data.success){
        Alert.alert('Succesful', response.data.message);
      }
      else{
        Alert.alert('Faileds', response.data.message);
      }
    })
  }
  
  const datass = [
    { label: 'Under Investigation', value: 'Under Investigation' },
    { label: 'Mediation', value: 'Mediation' },
    { label: '1st Hearing', value: '1st Hearing' },
  ];

  const renderItem = (item) =>{
    return(
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.location}</Text>
      </View>
    )
  }

  const renderItemIncident = (item) => {
    return (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.incidents}</Text>
        </View>
    );
  };

  const addNewResPress = () => {
    if(respondentID == null){
      var resInfo = {
        id: respoInfoArray.length + 1,
        RespondentName: resiInfo
      }
    }
    else{
      var resInfo = {
        id: respondentID,
        RespondentName: resiInfo
      }
    }

    setRespondentID(null);
    setRespoInfoArray([...respoInfoArray, resInfo]);
    setResiInfo('');
  }

  const renderItemList = ({item}) =>{
    return(
      <TouchableOpacity
        onPress={() => onPressItem(item)}>
        <View style={{alignItems: 'center', borderWidth: 1, borderColor: 'gray'}}>
          <Text style={{fontSize: 16}}>{item.RespondentName}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const onPressItem = (item) => {
    setIsModalVisible(true)
    setInputName(item.RespondentName)
    setEditName(item.id)
  }

  const onPressDelete = () => {
    const newData = respoInfoArray.filter(item => item.id !== editName);
    setRespoInfoArray(newData);
    setIsModalVisible(false);
  }

  const onPressSaveEdit = () => {
    handleEditName(editName)
    setIsModalVisible(false)
  }

  const handleEditName = (editNames) => {
    const newData = respoInfoArray.map(item => {
      if (item.id == editNames) {
        item.RespondentName = inputName
        return item
      }
      return item
    })
    setRespoInfoArray(newData)
    setIsRender(!isRender)
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const onChanges = (event, selectedDate) => {
    if(event.type === 'set'){
        if(mode == 'date'){
            const currentDate = selectedDate || date;
            let tempDate = new Date(currentDate);
            let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
            dateSelected(fDate);
        }
        else{
            const currentDate = selectedDate || date;
            let tempDate = new Date(currentDate);
            let sHour = tempDate.getHours();
            sHour = sHour % 12;
            sHour = sHour ? sHour : 12;
            hourSelected(sHour); 

            let sMinute = tempDate.getMinutes();
            let formattedMinute = sMinute.toString().padStart(2, '0');
            minuteSelected(formattedMinute);

            let period = tempDate.getHours() >= 12 ? 'PM' : 'AM';
            periodSelected(period);
        }
    }
    setShow(false);
  }

  const handleSearch = (text) => {
    setComplainName(text);
   
    setIsLoading(true);

    axios.post('http://brgyapp.lesterintheclouds.com/getInfoComplainant.php', {text})
    .then(response=>{
      if(response.data.success){
        if(text.trim() == ''){
          setSearchResults([]);
          setAddress('');
          setIsEditable(true);
          return;
        }
        else{
          setSearchResults(response.data.data);
        }
        
      }
      else{
        setSearchResults([]);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data.');
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  const handleSelect = (selectedItem) => {
    setComplainName(selectedItem.complaintNames);
    setAddress(selectedItem.addressInfo);
    setSearchResults([]);
    setAddressID(selectedItem.addID);
    setResID(selectedItem.resID);
    setIsEditable(false);
  };

  const submitComplaint = (event) => {
    const enteredText = event.nativeEvent.text;
    console.log("Enter Key Pressed. Text:", enteredText);
    setComplainName(enteredText);
    setResID(null);
    setSearchResults([]);
  };

  const searchRespondent = (text) => {
    setResiInfo(text);

    axios.post('http://brgyapp.lesterintheclouds.com/getInfoComplainant.php', {text})
    .then(response=>{
      if(response.data.success){
        if(text.trim() == ''){
          setSearchRespondentResult([]);
          return;
        }
        else{
          setSearchRespondentResult(response.data.data);
        }
        
      }
      else{
        setSearchRespondentResult([]);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data.');
    })
  };

  const selectRespondent = (selectedItem) => {
    setResiInfo(selectedItem.complaintNames);
    setRespondentID(selectedItem.resID);
    setSearchRespondentResult([]);
  };

  const pickImageFromGallery = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!results.canceled) {
      // Append the new image URI to the existing array
      setSelectedImages((prevImages) => [...prevImages, results.assets[0].uri]);
    }
  };


  const takePhoto = async () => {
    // Ask for permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to your camera.");
      return;
    }

    // Launch the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
      console.log("Captured Image URI:", imageUri); // Print the URI to the console
    }
  };

  return (
    <SafeAreaView style={{marginHorizontal: 1, flex: 1, paddingBottom: 15, backgroundColor: '#F2F3F7', paddingTop: 40}}>
      <ScrollView style={{backgroundColor: '#F2F3F7'}}>
        <View style={styles.caseInfo}>
          <View style={styles.datetimes}>
            <Text style={styles.secondaryText}>Date:<Text style={styles.required}>*</Text></Text>
            <TouchableOpacity onPress={() => showMode('date')}>
              <View style={styles.datetimeContainer}>
                <Text style={{fontSize: 14, color: 'gray', fontStyle: 'italic'}}>{newdate}   </Text>
                <Ionicons name='calendar-outline' style={{color: '#710808'}}/>
              </View>
            </TouchableOpacity>
            <Text style={styles.secondaryText}>Time:<Text style={styles.required}>*</Text></Text>
            <TouchableOpacity onPress={() => showMode('time')}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.timeDesign}>{newhour}</Text>
                <Text>:</Text>
                <Text style={styles.timeDesign}>{newminute}</Text>
                <View style={styles.timeContainer}>
                  <Text>{newPeriod}</Text>
                </View>
                <Ionicons name='time-outline' size={15} style={styles.iconsStyle}/>
              </View>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      const currentDate = new Date();
                      if (mode === 'time' && selectedDate) {
                        // Check if the selected date is today
                        const isToday =
                          date.getDate() === currentDate.getDate() &&
                          date.getMonth() === currentDate.getMonth() &&
                          date.getFullYear() === currentDate.getFullYear();

                        // if (isToday && selectedDate.getTime() > currentDate.getTime()) {
                        //   alert("You can't select a future time!");
                        //   return; // Do nothing if time is invalid
                        // }
                      }
                      onChanges(event, selectedDate);
                    }}
                />
            )}
          </View>
          
          <Text style={styles.secondaryText}>Place of Incident:<Text style={styles.required}>*</Text></Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={placeData}
            search
            maxHeight={300}
            labelField="location"
            valueField="id"
            placeholder="Select"
            searchPlaceholder="Search..."
            value={selectedPlace}
            onChange={item => {
              setSelectedPlace(item.id.toString());
            }}
            renderItem={renderItem}
          />
          <Text style={styles.secondaryText}>Type of Incident:<Text style={styles.required}>*</Text></Text>
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            search
            data={incidentData}
            labelField="incidents"
            valueField="id"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={selectedIncident}
            onChange={item => {
                setSelectedIncident(item)
            }}
            selectedStyle={styles.selectedStyles}
            renderItem={renderItemIncident}
          />
          <Text style={styles.secondaryText}>Description:<Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.inputed}
            placeholder='Description of the case...'
            multiline= {true}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>

        <View style={styles.comInformations}>
          <Text style={styles.sectionText}>Complainant Information:</Text>
          <Text style={styles.secondaryText}>Name of Complainant:<Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.informInput}
            placeholder='Name of Complainant'
            multiline= {false}
            value={complainName}
            onChangeText={handleSearch}
            onSubmitEditing={submitComplaint}
            editable={isEdit}
          />
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            searchResults.length > 0 && (
              <FlatList
                scrollEnabled={false}
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item)}>
                    <Text style={{ padding: 10 }}>{item.complaintNames}</Text>
                  </TouchableOpacity>
                )}
              />
            )
          )}
          <Text style={styles.secondaryText}>Phone Number:<Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.informInput}
            placeholder='Phone Number'
            multiline={false}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          <Text style={styles.secondaryText}>
            Address:<Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.informInput}
            placeholder='Address'
            multiline={false}
            value={address}
            onChangeText={text => setAddress(text)}
            editable={isEditable}
          />
        </View>
        
        <View style={styles.respoInformation}>
          <View style={{flexDirection: 'row'}}>
            <Checkbox value={isChecked} onValueChange={setChecked} style={{marginRight: 5, transform:[{scale: .8}]}}/>
            <Text style={{fontSize: 16, marginBottom: 5}}>Unidentified Respondent/s:</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.sectionText}>Respondent Information</Text>
              <TouchableOpacity onPress={() => addNewResPress()} disabled={isChecked} >
                <View style={styles.addNew}>
                  <Ionicons name='add-circle-outline' size={22} style={{color: '#fff'}}/>
                  <Text style={{color: '#fff', marginLeft: 5}}>ADD NEW</Text>
                </View>
            </TouchableOpacity>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.listContainer}>
              <View style={styles.headers}>
                <Text style={[styles.headerText, {width: '100%'}]}>Name of Respondent</Text>
              </View>
            </View>
            <FlatList
              data={respoInfoArray}
              renderItem={renderItemList}
              keyExtractor={itemsss => itemsss.id}
              extraData={isRender}
              scrollEnabled={false}
            />
            <TextInput
              style={styles.inputsNameee}
              value={resiInfo}
              editable={!isChecked}
              keyboardType='default'
              placeholder='Name'
              onChangeText={searchRespondent}
              // onChangeText={value=>{
              //   setResiInfo(value)
              // }}
            />
            {searchRespondentResult.length > 0 && (
              <FlatList
                scrollEnabled={false}
                data={searchRespondentResult}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => selectRespondent(item)}>
                    <Text style={{ padding: 10 }}>{item.complaintNames}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <Modal
              animationType='fade'
              visible={isModalVisible}
              transparent= {true}
              onRequestClose={() => setIsModalVisible(false)}>
              <View style={styles.modalView}>
                <View style={styles.modalEditInput}>
                  <Text>Edit Respondent/s Name:</Text>
                  <TextInput
                    onChangeText={text => setInputName(text)}
                    defaultValue={inputName}
                    editable={true}
                    multiline={false}
                    maxLength={200}
                  />
                  <View>
                    <TouchableOpacity
                      onPress={() => onPressDelete()}>
                      <Text>DELETE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => onPressSaveEdit()}>
                      <Text>SAVE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <View style={styles.proofSection}>
          <Text style={styles.sectionText}>Upload Photos/Videos (Optional)</Text>
          <TouchableOpacity style={styles.imagePickerBackground} onPress={pickImageFromGallery}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name='camera-outline' size={20} style={{color: '#710808'}}/>
              <Text style={{fontSize: 16, color: '#710808', marginLeft: 5}}>Upload Photos/Video</Text>
            </View>
          </TouchableOpacity>
        </View>

        {isVisible && (
          <View style={styles.proceedTos}>
            <Text style={styles.sectionText}>Proceed to:<Text>*</Text></Text>
            <Dropdown
              style={styles.dropdownProc}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={datass}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder=""
              value={selectedProceed}
              onChange={item => {
              setSelectedProceed(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        )}

        <View style={styles.canSub}>
          <TouchableOpacity style={styles.cancelBTN}>
              <Ionicons name='close' size={20} style={{color: '#710808'}}/>
              <Text style={{color: '#710808', fontSize: 14}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBTN}>
            <Ionicons name='checkmark' size={20} style={{color: '#fff'}}/>
            <Text style={{color: 'white', fontSize: 14}} onPress={() => submitReport()}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  sectionText: {
    color:'#710808',
    fontWeight: 'bold',
    fontSize: 20
  },
  required: {
    color: '#710808',
    fontSize: 16
  },
  secondaryText: {
    fontSize: 18,
    fontWeight: 'semibold'
  },
  caseInfo: {
    marginHorizontal: 10,
    backgroundColor: '#F2F3F7'
  },
  datetimes: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  datetimeContainer: { 
    borderWidth: 1,
    borderColor: 'CAD3DF',
    borderRadius: 5,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: 2,
    alignItems: 'center',
    marginHorizontal: 5
  },
  timeDesign: {
    borderWidth: 1,
    borderColor: 'CAD3DF',
    borderRadius: 5,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: 2,
    alignItems: 'center',
    marginHorizontal: 5,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'gray'
  },
  dropdown: {
    height: 30,
    backgroundColor: '#FFFFFF',
    borderWidth:1,
    borderBlockColor: '#A8A8A8',
    borderRadius: 5,
    paddingHorizontal: 8
  },
  placeholderStyle: {  
    fontSize: 13,
    color: 'gray'
  },
  selectedTextStyle: {
    fontSize: 13,
    color: 'black'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 13,
    color: 'black',
  },
  textItem : {
    flex: 1,
    fontSize: 14,
    marginHorizontal: 8
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedStyles: {
    borderRadius: 8
  },
  inputed: {
    width: '100%',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#A8A8A8',
    minHeight: 57,
    textAlignVertical: 'top'
  },
  comInformations: {
    borderTopWidth: 1.5,
    marginTop: 13,
    paddingTop: 7,
    paddingHorizontal: 10,
    borderTopWidth: 1.5,
    borderColor: 'gray',
    backgroundColor: '#F2F3F7'
  },
  informInput: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: 'gray'
  },
  respoInformation: {
    borderTopWidth: 1.5,
    backgroundColor: '#F2F3F7',
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingTop: 7,
    marginTop: 13
  },
  addNew: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#710808',
    paddingHorizontal: 5
  },
  tableContainer: {
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 5
  },
  listContainer: {
    backgroundColor: '#710808',
    borderRadius: 5
  },
  headers: {
    backgroundColor: '#710808',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5
  },
  headerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  },
  inputsNameee:{
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 16
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 128, 255, 0.5)'
  },
  modalEditInput: {
    backgroundColor: '#fff',
    padding: 15,
    width: '98%',
    borderRadius: 8
  },
  proofSection: {
    borderTopWidth: 1.5,
    paddingHorizontal: 10,
    marginTop: 13,
    paddingTop: 7,
    borderColor: 'gray',
    backgroundColor: '#F2F3F7'
  },
  imagePickerBackground: {
    backgroundColor: '#F4EAEA',
    borderRadius: 5,
    minHeight: 100
  },
  proceedTos: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F2F3F7',
    borderTopColor: '#710808',
    borderTopWidth: 3
  },
  dropdownProc: {
    flex: 1,
    margin: 2,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderWidth:1,
    borderBlockColor: '#A8A8A8',
    borderRadius: 5,
    padding: 5,
  },
  canSub: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    gap: 10,
    marginTop: 10
  },
  cancelBTN: {
    backgroundColor: '#D6D6D6',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBTN: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#710808',
    borderRadius: 10,
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Blotter;
