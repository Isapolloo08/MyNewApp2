import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, TextInput, Button, ScrollView, ViewBase, FlatList, Modal, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';


const BlotterFrom = () => {
  const [incidentNo, insertNo] = useState(null)
  const [newdate, dateSelected] = useState('MM/DD/YYYY')
  const [newhour, hourSelected] = useState('HH')
  const [newminute, minuteSelected] = useState('MM')
  const [newPeriod, periodSelected] = useState('AM')
  const [value, setValue] = useState(null)
  const [isChecked, setChecked] = useState(false)
  const [resiInfo, setResiInfo] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [inputName, setInputName] = useState()
  const [editName, setEditName] = useState()
  const [isRender, setIsRender] = useState(false)
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');

  const [respoInfoArray, setRespoInfoArray] = useState([]);
  const [placeData, setPlaceData] = useState([]);
  const [incidentData, setIncident] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState([]);
  const [complainName, setComplainName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    getPlaces();
    getIncident();
  }, []);

  const getPlaces = () =>{
    axios.get('http://brgyapp.lesterintheclouds.com/getPlaceData.php')
    .then(response => {
        setPlaceData(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  const submitReport = () => {
    axios.post('http://brgyapp.lesterintheclouds.com/submitBlotter.php', {
        newdate, newhour, newminute, newPeriod, value, selectedIncident: selectedIncident.map(item => item.id), description, complainName, phoneNumber, address, respoInfoArray})
    .then(response => {
        if(response.data.success){
            Alert.alert('Succesful', response.data.message);
        }
        else{
            Alert.alert('Faileds', response.data.message);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
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

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const onPressItem = (item) => {
    setIsModalVisible(true)
    setInputName(item.RespondentName)
    setEditName(item.id)
  }

  const addNewResPress = () => {
    var resInfo = {
      id: respoInfoArray.length + 1,
      RespondentName: resiInfo
    }

    setRespoInfoArray([...respoInfoArray, resInfo]);
    setResiInfo('')
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

  const onPressSaveEdit = () => {
    handleEditName(editName)
    setIsModalVisible(false)
  }

  const onPressDelete = () => {
    const newData = respoInfoArray.filter(item => item.id !== editName);
    setRespoInfoArray(newData);
    setIsModalVisible(false);
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

  return (
    <SafeAreaView style={{marginHorizontal: 1, flex: 1, paddingBottom: 15, backgroundColor: '#F2F3F7', paddingTop: 40}}>
      <ScrollView style={{backgroundColor: '#F2F3F7'}}>
        <View style={styles.caseInfo}>
          <Text style={styles.sectionText}>Incident No. : <Text>{incidentNo}</Text></Text>
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
                    onChange={onChanges}
                />
            )}
          </View>
          <Text style={{fontSize: 8}}></Text>
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
            value={value}
            onChange={item => {
              setValue(item.id.toString());
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
            onChangeText={text => setComplainName(text)}
          />
          <View style={styles.container}>
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
          />
        </View>
        </View>
        <View style={styles.respoInformation}>
            <View style={{flexDirection: 'row'}}>
              <Checkbox value={isChecked} onValueChange={setChecked} style={{marginRight: 5, transform:[{scale: .8}]}}/>
              <Text style={{fontSize: 16, marginBottom: 5}}>Unidentified Respondent/s:</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.sectionText}>Respondent Information</Text>
              <TouchableOpacity onPress={() => addNewResPress()}>
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
              />
              <TextInput
                style={styles.inputsNameee}
                value={resiInfo}
                keyboardType='default'
                placeholder='HIII'
                onChangeText={value=>{
                  setResiInfo(value)
                }}
              />
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
          <TouchableOpacity style={styles.imagePickerBackground} onPress={() => selectFile()}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name='camera-outline' size={20} style={{color: '#710808'}}/>
              <Text style={{fontSize: 16, color: '#710808', marginLeft: 5}}>Upload Photos/Video</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', }}>
            <TouchableOpacity>
                <Text>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => submitReport()}>
              <Text>SUBMIT</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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
  timeContainer: { 
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: 2,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5
  },
  iconsStyle: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: 3,
    alignItems: 'center',
    color: '#710808'
  },
  datetimes: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    margin: 2,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderWidth:1,
    borderBlockColor: '#A8A8A8',
    borderRadius: 5,
    padding: 5,
  },
  icon: {
    marginRight: 5
  },
  informInput: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: 'gray'
  },
  textItem : {
    flex: 1,
    fontSize: 15,
    marginHorizontal: 8
  },
  placeholderStyle: {  
    fontSize: 13,
    color: 'gray'
  },
  selectedTextStyle: {
    fontSize: 13,
    color: 'gray'
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
  iconStyle: {
      width: 20,
      height: 20,
  },
  inputSearchStyle: {
    height: 20,
    fontSize: 13,
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
  respoInformation: {
    borderTopWidth: 1.5,
    backgroundColor: '#F2F3F7',
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingTop: 7,
    marginTop: 13
  },
  header: {
    flexDirection: 'row'
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
  selectedStyles: {
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
  }
})

export default BlotterFrom
