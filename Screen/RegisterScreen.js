import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Pagination from '../Resident Information and CM/RICM inside screen/Pagination'; // Adjust the path if necessary
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = () => {
    const [isHouseholdHead, setIsHouseholdHead] = useState(null);
    const [householdNumber, setHouseholdNumber] = useState('');
    const [householdHeadName, setHouseholdHeadName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [isRelationshipDropdownOpen, setIsRelationshipDropdownOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [isMiddleNameDropdownOpen, setIsMiddleNameDropdownOpen] = useState(false);
    const [middleNameChoice, setMiddleNameChoice] = useState('Select Middle Name');
    const [suffix, setSuffix] = useState('');
    const [isSuffixDropdownOpen, setIsSuffixDropdownOpen] = useState(false);
    const [contactNumber, setContactNumber] = useState('');
    const [purok, setPurok] = useState('');
    const [isPurokDropdownOpen, setIsPurokDropdownOpen] = useState(false);
    const [barangay, setBarangay] = useState('');
    const [isBarangayDropdownOpen, setIsBarangayDropdownOpen] = useState(false);
    const [otherBarangay, setOtherBarangay] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [isSexDropdownOpen, setIsSexDropdownOpen] = useState(false);
    const [civilStatus, setCivilStatus] = useState('');
    const [isCivilStatusDropdownOpen, setIsCivilStatusDropdownOpen] = useState(false);
    const [citizenship, setCitizenship] = useState('');
    const [isCitizenshipDropdownOpen, setIsCitizenshipDropdownOpen] = useState(false);
    const [otherCitizenship, setOtherCitizenship] = useState('');
    const [occupation, setOccupation] = useState('');
    const [isOccupationDropdownOpen, setIsOccupationDropdownOpen] = useState(false);
    const [otherOccupation, setOtherOccupation] = useState('');
    const [educationalAttainment, setEducationalAttainment] = useState('');
    const [isEducationalAttainmentDropdownOpen, setIsEducationalAttainmentDropdownOpen] = useState(false);
    const [religion, setReligion] = useState('');
    const [isReligionDropdownOpen, setIsReligionDropdownOpen] = useState(false);
    const [otherReligion, setOtherReligion] = useState('');
    const [ethnicity, setEthnicity] = useState('');
    const [isEthnicityDropdownOpen, setIsEthnicityDropdownOpen] = useState(false);
    const [psMember, setPsMember] = useState('');
    const [isPsMemberDropdownOpen, setIsPsMemberDropdownOpen] = useState(false);
    const [psHouseholdId, setPsHouseholdId] = useState(''); 
    const [philhealthMember, setPhilhealthMember] = useState('');
    const [isPhilhealthMemberDropdownOpen, setIsPhilhealthMemberDropdownOpen] = useState(false);
    const [philhealthIdNumber, setPhilhealthIdNumber] = useState('');
    const [membershipType, setMembershipType] = useState('');
    const [isMembershipTypeDropdownOpen, setIsMembershipTypeDropdownOpen] = useState(false);
    const [classificationByAgeHealth, setClassificationByAgeHealth] = useState('');
    const [isClassificationByAgeHealthDropdownOpen, setIsClassificationByAgeHealthDropdownOpen] = useState(false);
    const [lmp, setLmp] = useState('');
    const [isLmpDropdownOpen, setIsLmpDropdownOpen] = useState(false);
    const [medicalHistory, setMedicalHistory] = useState('');
    const [isMedicalHistoryDropdownOpen, setIsMedicalHistoryDropdownOpen] = useState(false);
    const [otherMedicalHistory, setOtherMedicalHistory] = useState('');
    const [philhealthCategory, setPhilhealthCategory] = useState('');
    const [isPhilhealthCategoryDropdownOpen, setIsPhilhealthCategoryDropdownOpen] = useState(false);
    const [usingFpMethod, setUsingFpMethod] = useState('');
    const [isUsingFpMethodDropdownOpen, setIsUsingFpMethodDropdownOpen] = useState(false);
    const [familyPlanningMethodUsed, setFamilyPlanningMethodUsed] = useState('');
    const [isFamilyPlanningMethodUsedDropdownOpen, setIsFamilyPlanningMethodUsedDropdownOpen] = useState(false);
    const [otherFamilyPlanningMethodUsed, setOtherFamilyPlanningMethodUsed] = useState('');
    const [familyPlanningStatus, setFamilyPlanningStatus] = useState('');
    const [isFamilyPlanningStatusDropdownOpen, setIsFamilyPlanningStatusDropdownOpen] = useState(false);
    const [typeOfWaterSource, setTypeOfWaterSource] = useState('');
    const [isTypeOfWaterSourceDropdownOpen, setIsTypeOfWaterSourceDropdownOpen] = useState(false);
    const [typeOfToiletFacility, setTypeOfToiletFacility] = useState('');
    const [isTypeOfToiletFacilityDropdownOpen, setIsTypeOfToiletFacilityDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 2;

    const handlePageChange = (page) => {
        if (page <= totalPages && page >= 1) {
            setCurrentPage(page);
        }
    };

    const handleSave = () => {
        // Handle save logic here
        console.log('Data saved');
        navigation.navigate('CreateAccount');
    };
    
    const navigation = useNavigation();

    const handleIsHouseholdHeadChange = (value) => {
        setIsHouseholdHead(value);

        if (value === 'no') {
            setHouseholdHeadName('');
            setRelationship('');
            setSelectedValue('');
        } else {
            setLastName('');
            setFirstName('');
            setMiddleName('');
            setMiddleNameChoice('Select Middle Name');
            setSuffix('');
            setContactNumber('');
            setPurok('');
            setBarangay('');
            setOtherBarangay('');
            setDateOfBirth('');
            setAge('');
            setSex('');
            setCivilStatus('');
            setCitizenship('');
            setOtherCitizenship('');
            setOccupation('');
            setOtherOccupation('');
            setEducationalAttainment('');
            setReligion('');
            setOtherReligion('');
            setEthnicity('');
            setPsMember('');
            setPsHouseholdId('');
            setPhilhealthMember('');
            setPhilhealthIdNumber('');
            setMembershipType('');
            setClassificationByAgeHealth('');
            setLmp('');
            setMedicalHistory('');
            setOtherMedicalHistory('');
            setPhilhealthCategory('');
            setUsingFpMethod('');
            setFamilyPlanningMethodUsed('');
            setOtherFamilyPlanningMethodUsed('');
            setFamilyPlanningStatus('');
            setTypeOfWaterSource('');
            setTypeOfToiletFacility('');
        }
    };

    const renderHouseholdHeadQuestions = () => {
        if (isHouseholdHead === 'no') {
            return (
                <>
                    <View style={styles.inputContainer}>
                        <Text>Household Head:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter household head's name"
                            value={householdHeadName}
                            onChangeText={setHouseholdHeadName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Relationship with household head:</Text>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setIsRelationshipDropdownOpen(!isRelationshipDropdownOpen)}
                        >
                            <Text>{selectedValue || 'Select relationship'}</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        transparent={true}
                        visible={isRelationshipDropdownOpen}
                        onRequestClose={() => setIsRelationshipDropdownOpen(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <FlatList
                                    data={['Spouse', 'Son', 'Daughter', 'Other']}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.dropdownItem}
                                            onPress={() => handleRelationshipSelection(item)}
                                        >
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item}
                                />
                            </View>
                        </View>
                    </Modal>
                    {selectedValue === 'Other' && (
                        <TextInput
                            style={[styles.input, { marginTop: 10 }]}
                            placeholder="Specify relationship"
                            value={relationship}
                            onChangeText={setRelationship}
                            onBlur={() => {
                                if (relationship.trim() !== '') {
                                    setSelectedValue(relationship.trim());
                                } else {
                                    setSelectedValue('');
                                }
                            }}
                        />
                    )}
                    <View style={styles.inputContainer}>
                        <Text>Household Number:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter household number (e.g. 202411-02565)"
                            value={householdNumber}
                            onChangeText={setHouseholdNumber}
                        />
                    </View>
                </>
            );
        } else if (isHouseholdHead === 'yes') {
            return (
                <View style={styles.inputContainer}>
                    <Text>Household Number:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter household number (e.g. 202411-02565)"
                        value={householdNumber}
                        onChangeText={setHouseholdNumber}
                    />
                </View>
            );
        }
        return null;
    };

    const handleRelationshipSelection = (item) => {
        setSelectedValue(item);
        setIsRelationshipDropdownOpen(false);
        if (item !== 'Other') {
            setRelationship(item.toLowerCase());
        } else {
            setRelationship('');
        }
    };

    const toggleChoice = (choice) => {
        if (isHouseholdHead !== choice) {
            handleIsHouseholdHeadChange(choice);
        }
    };

    const handleMiddleNameSelection = (item) => {
        setMiddleNameChoice(item);
        setIsMiddleNameDropdownOpen(false);
        if (item === 'Enter Middle Name' || item === 'No Middle Name') {
            setMiddleName('');
        }
    };

    const handleMiddleNameInput = (text) => {
        setMiddleName(text);
    };

    const handleMiddleNameDone = () => {
        setMiddleNameChoice(middleName.trim() !== '' ? middleName : 'Enter Middle Name');
    };

    const handleSexSelection = (item) => {
        setSex(item);
        setIsSexDropdownOpen(false);
    };

    const handleCivilStatusSelection = (selectedCivilStatus) => {
        setCivilStatus(selectedCivilStatus);
    };

    const handleSuffixSelection = (item) => {
        setSuffix(item);
        setIsSuffixDropdownOpen(false);
    };

    const handlePurokSelection = (item) => {
        setPurok(item);
        setIsPurokDropdownOpen(false);
    };

    const handleBarangaySelection = (item) => {
        setBarangay(item);
        setIsBarangayDropdownOpen(false);
        if (item !== 'Other') {
            setOtherBarangay('');
        } else {
            setOtherBarangay('');
        }
    };

    const handleCitizenshipSelection = (item) => {
        setCitizenship(item);
        setIsCitizenshipDropdownOpen(false);
        if (item !== 'Other') {
            setOtherCitizenship('');
        } else {
            setOtherCitizenship('');
        }
    };
    

    const handleOccupationSelection = (item) => {
        setOccupation(item);
        setIsOccupationDropdownOpen(false);
        if (item !== 'Other') {
            setOtherOccupation('');
        } else {
            setOtherOccupation('');
        }
    };

    const handleEducationalAttainmentSelection = (item) => {
        setEducationalAttainment(item);
        setIsEducationalAttainmentDropdownOpen(false);
    };
    
    const handleReligionSelection = (item) => {
        setReligion(item);
        setIsReligionDropdownOpen(false);
        if (item !== 'Other') {
            setOtherReligion('');
        } else {
            setOtherReligion('');
        }
    };

    const handleEthnicitySelection = (item) => {
        setEthnicity(item);
        setIsEthnicityDropdownOpen(false);
    };

    const handlePsMemberSelection = (item) => {
        setPsMember(item);
        setIsPsMemberDropdownOpen(false);
        if (item !== 'Yes') {
            setPsHouseholdId('');
        } else {
            setPsHouseholdId('');
        }
    };

    const handlePhilhealthMemberSelection = (item) => {
        setPhilhealthMember(item);
        setIsPhilhealthMemberDropdownOpen(false);
    };

    const handleMembershipTypeSelection = (item) => {
        setMembershipType(item);
        setIsMembershipTypeDropdownOpen(false);
    };

    const handlePhilhealthCategorySelection = (item) => {
        setPhilhealthCategory(item);
        setIsPhilhealthCategoryDropdownOpen(false);
    };

    const handleMedicalHistorySelection = (item) => {
        setMedicalHistory(item);
        setIsMedicalHistoryDropdownOpen(false);
        if (item !== 'Other') {
            setOtherMedicalHistory('');
        } else {
            setOtherMedicalHistory('');
        }
    };

    const handleClassificationByAgeHealthSelection = (item) => {
        setClassificationByAgeHealth(item);
        setIsClassificationByAgeHealthDropdownOpen(false);
    };

    const handleLmpSelection = (item) => {
        setLmp(item);
        setIsLmpDropdownOpen(false);
    }; 

    const handleUsingFpMethodSelection = (item) => {
        setUsingFpMethod(item);
        setIsUsingFpMethodDropdownOpen(false);
    }; 

    const handleFamilyPlanningMethodUsedSelection = (item) => {
        setFamilyPlanningMethodUsed(item);
        setIsFamilyPlanningMethodUsedDropdownOpen(false);
        if (item !== 'Other') {
            setOtherFamilyPlanningMethodUsed('');
        } else {
            setOtherFamilyPlanningMethodUsed('');
        }
    };

    const handleFamilyPlanningStatusSelection = (item) => {
        setFamilyPlanningStatus(item);
        setIsFamilyPlanningStatusDropdownOpen(false);
    }; 

    const handleTypeOfWaterSourceSelection = (item) => {
        setTypeOfWaterSource(item);
        setIsTypeOfWaterSourceDropdownOpen(false);
    }; 

    const handleTypeOfToiletFacilitySelection = (item) => {
        setTypeOfToiletFacility(item);
        setIsTypeOfToiletFacilityDropdownOpen(false);
    }; 

    return (
        <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
                <View style={styles.box}>
                    {currentPage === 1 && (
                        <>
                            <Text style={styles.title}>I. Personal Information</Text>
                            <View style={styles.inputContainer}>
                                <Text>Are you the household head?</Text>
                                <View style={styles.choiceContainer}>
                                    <TouchableOpacity
                                        style={[styles.choiceButton, isHouseholdHead === 'yes' && styles.selectedChoice]}
                                        onPress={() => toggleChoice('yes')}
                                    >
                                        <Text style={styles.choiceText}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.choiceButton, isHouseholdHead === 'no' && styles.selectedChoice]}
                                        onPress={() => toggleChoice('no')}
                                    >
                                        <Text style={styles.choiceText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {renderHouseholdHeadQuestions()}
                            <View style={styles.inputContainer}>
                                <Text>Last Name:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>First Name:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Middle Name:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsMiddleNameDropdownOpen(!isMiddleNameDropdownOpen)}
                                >
                                    <Text>{middleNameChoice}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isMiddleNameDropdownOpen}
                                    onRequestClose={() => setIsMiddleNameDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Enter Middle Name', 'No Middle Name']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleMiddleNameSelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                                {middleNameChoice === 'Enter Middle Name' && (
                                    <TextInput
                                        style={[styles.input, { marginTop: 10 }]}
                                        placeholder="Enter Middle Name"
                                        value={middleName}
                                        onChangeText={handleMiddleNameInput}
                                        onBlur={handleMiddleNameDone}
                                    />
                                )}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Suffix:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsSuffixDropdownOpen(!isSuffixDropdownOpen)}>
                                    <Text>{suffix || 'Select Suffix'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isSuffixDropdownOpen}
                                    onRequestClose={() => setIsSuffixDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Jr.', 'Sr.', 'III', 'IV', 'None']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleSuffixSelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Contact Number:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Contact Number"
                                    value={contactNumber}
                                    onChangeText={setContactNumber}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Purok:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsPurokDropdownOpen(!isPurokDropdownOpen)}>
                                    <Text>{purok || 'Select Purok'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isPurokDropdownOpen}
                                    onRequestClose={() => setIsPurokDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handlePurokSelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Barangay:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsBarangayDropdownOpen(!isBarangayDropdownOpen)}
                                >
                                    <Text>{barangay || 'Select Barangay'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isBarangayDropdownOpen}
                                    onRequestClose={() => setIsBarangayDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Barangay III', 'Other']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleBarangaySelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                                {barangay === 'Other' && (
                                    <TextInput
                                        style={[styles.input, { marginTop: 10 }]}
                                        placeholder="Specify barangay"
                                        value={otherBarangay}
                                        onChangeText={setOtherBarangay}
                                        onBlur={() => {
                                            if (otherBarangay.trim() !== '') {
                                                setBarangay(otherBarangay.trim());
                                            } else {
                                                setBarangay('Other');
                                            }
                                        }}
                                    />
                                )}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Date of Birth:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Date of Birth"
                                    value={dateOfBirth}
                                    onChangeText={setDateOfBirth}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Age:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Age"
                                    value={age}
                                    onChangeText={setAge}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Sex:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsSexDropdownOpen(!isSexDropdownOpen)}
                                >
                                    <Text>{sex || 'Select Sex'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isSexDropdownOpen}
                                    onRequestClose={() => setIsSexDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Male', 'Female']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => {
                                                            handleSexSelection(item);
                                                            setIsSexDropdownOpen(false);
                                                        }}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Civil Status:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsCivilStatusDropdownOpen(!isCivilStatusDropdownOpen)}
                                >
                                    <Text>{civilStatus || 'Select Civil Status'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isCivilStatusDropdownOpen}
                                    onRequestClose={() => setIsCivilStatusDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Single', 'Married', 'Separated', 'Widow/er', 'Cohabitation']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => {
                                                            handleCivilStatusSelection(item);
                                                            setIsCivilStatusDropdownOpen(false);
                                                        }}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Citizenship:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsCitizenshipDropdownOpen(!isCitizenshipDropdownOpen)}
                                >
                                    <Text>{citizenship || 'Select Citizenship'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isCitizenshipDropdownOpen}
                                    onRequestClose={() => setIsCitizenshipDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Filipino', 'Other']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleCitizenshipSelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                                {citizenship === 'Other' && (
                                    <TextInput
                                        style={[styles.input, { marginTop: 10 }]}
                                        placeholder="Specify citizenship"
                                        value={otherCitizenship}
                                        onChangeText={setOtherCitizenship}
                                        onBlur={() => {
                                            if (otherCitizenship.trim() !== '') {
                                                setCitizenship(otherCitizenship.trim());
                                            } else {
                                                setCitizenship('Other');
                                            }
                                        }}
                                    />
                                )}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Occupation:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsOccupationDropdownOpen(!isOccupationDropdownOpen)}
                                >
                                    <Text>{occupation || 'Select Occupation'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isOccupationDropdownOpen}
                                    onRequestClose={() => setIsOccupationDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Student','Farmer', 'Fisherman', 'Housewife', 'Driver', 'Laborer', 'Vendor', 'Security Guard', 'Nurse', 'Teacher', 'Engineer', 'Office Worker', 'Unemployed', 'Other']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleOccupationSelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                                {occupation === 'Other' && (
                                    <TextInput
                                        style={[styles.input, { marginTop: 10 }]}
                                        placeholder="Specify occupation"
                                        value={otherOccupation}
                                        onChangeText={setOtherOccupation}
                                        onBlur={() => {
                                            if (otherOccupation.trim() !== '') {
                                                setOccupation(otherOccupation.trim());
                                            } else {
                                                setOccupation('Other');
                                            }
                                        }}
                                    />
                                )}
                            </View>
                        </>
                    )}

                    {currentPage === 2 && (
                        <>
                            <Text style={styles.title}>II. Additional Information</Text>
                            <View style={styles.inputContainer}>
                                <Text>Educational Attainment:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsEducationalAttainmentDropdownOpen(!isEducationalAttainmentDropdownOpen)}>
                                    <Text>{educationalAttainment || 'Select Educational Attainment'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isEducationalAttainmentDropdownOpen}
                                    onRequestClose={() => setIsEducationalAttainmentDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['None', 'Pre-School', 'Elem Student', 'Elem Undergrad', 'Elem Graduate', 'HS Student', 'HS Undergrad', 'HS Graduate', 'Senior H/S', 'ALS (Adv Learning System)', 'Vocational Course', 'College Student', 'College Undergrad', 'College Graduate', 'Postgrad/Masteral/Doctorate']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleEducationalAttainmentSelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Religion:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsReligionDropdownOpen(!isReligionDropdownOpen)}>
                                    <Text>{religion || 'Select Religion'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isReligionDropdownOpen}
                                    onRequestClose={() => setIsReligionDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Roman Catholic', 'Christian', 'INC', 'Catholic', 'Islam', 'Baptist', 'Born Again', 'Buddhism', 'Church of God', 'Jehovahs Witness', 'Protestant', 'Seventh Day Adventist', 'LDS-Mormons', 'Evangeilcal', 'Pentecostal', 'Unknown', 'Other']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleReligionSelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                                {religion === 'Other' && (
                                    <TextInput
                                        style={[styles.input, { marginTop: 10 }]}
                                        placeholder="Specify religion"
                                        value={otherReligion}
                                        onChangeText={setOtherReligion}
                                        onBlur={() => {
                                            if (otherReligion.trim() !== '') {
                                                setReligion(otherReligion.trim());
                                            } else {
                                                setReligion('Other');
                                            }
                                        }}
                                    />
                                )}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Ethnicity:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsEthnicityDropdownOpen(!isEthnicityDropdownOpen)}>
                                    <Text>{ethnicity || 'Select Ethnicity'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isEthnicityDropdownOpen}
                                    onRequestClose={() => setIsEthnicityDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['IPs', 'Non-IPs']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleEthnicitySelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>4P's member?</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsPsMemberDropdownOpen(!isPsMemberDropdownOpen)}>
                                    <Text>{psMember || 'Select 4PS member'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isPsMemberDropdownOpen}
                                    onRequestClose={() => setIsPsMemberDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Yes', 'No']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handlePsMemberSelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>

                            <View style={styles.inputContainer}>
                                {psMember === 'Yes' && (
                                    <>
                                        <Text>4Ps Household ID No.</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter 4Ps Household ID No."
                                            value={psHouseholdId}
                                            onChangeText={setPsHouseholdId}
                                        />
                                    </>
                                )}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text>Philhealth Member?</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsPhilhealthMemberDropdownOpen(!isPhilhealthMemberDropdownOpen)}
                                >
                                    <Text>{philhealthMember || 'Select Philhealth Member'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isPhilhealthMemberDropdownOpen}
                                    onRequestClose={() => setIsPhilhealthMemberDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Yes', 'No']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => {
                                                            handlePhilhealthMemberSelection(item);
                                                            setIsPhilhealthMemberDropdownOpen(false);
                                                        }}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        
                            <View style={styles.inputContainer}>
                                {philhealthMember === 'Yes' && (
                                    <>
                                        <Text>Philhealth ID Number:</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter Philhealth ID Number"
                                            value={philhealthIdNumber}
                                            onChangeText={setPhilhealthIdNumber}
                                        />

                                        <Text></Text>
                                        <Text>Membership Type:</Text>
                                        <TouchableOpacity
                                            style={styles.dropdownButton}
                                            onPress={() => setIsMembershipTypeDropdownOpen(!isMembershipTypeDropdownOpen)}>
                                            <Text>{membershipType || 'Select Membership Type'}</Text>
                                        </TouchableOpacity>
                                        <Modal
                                            transparent={true}
                                            visible={isMembershipTypeDropdownOpen}
                                            onRequestClose={() => setIsMembershipTypeDropdownOpen(false)}
                                        >
                                            <View style={styles.modalBackground}>
                                                <View style={styles.modalContainer}>
                                                    <FlatList
                                                        data={['Member', 'Dependent']}
                                                        renderItem={({ item }) => (
                                                            <TouchableOpacity
                                                                style={styles.dropdownItem}
                                                                onPress={() => handleMembershipTypeSelection(item)}
                                                            >
                                                                <Text>{item}</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                        keyExtractor={(item) => item}
                                                    />
                                                </View>
                                            </View>
                                        </Modal>

                                        <Text></Text>
                                        <Text>Philhealth Category:</Text>
                                        <TouchableOpacity
                                            style={styles.dropdownButton}
                                            onPress={() => setIsPhilhealthCategoryDropdownOpen(!isPhilhealthCategoryDropdownOpen)}>
                                            <Text>{philhealthCategory || 'Select Philhealth Category'}</Text>
                                        </TouchableOpacity>
                                        <Modal
                                            transparent={true}
                                            visible={isPhilhealthCategoryDropdownOpen}
                                            onRequestClose={() => setIsPhilhealthCategoryDropdownOpen(false)}
                                        >
                                            <View style={styles.modalBackground}>
                                                <View style={styles.modalContainer}>
                                                    <FlatList
                                                        data={['Direct Contributors', 'Indirect Contributors', 'Unknown']}
                                                        renderItem={({ item }) => (
                                                            <TouchableOpacity
                                                                style={styles.dropdownItem}
                                                                onPress={() => handlePhilhealthCategorySelection(item)}
                                                            >
                                                                <Text>{item}</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                        keyExtractor={(item) => item}
                                                    />
                                                </View>
                                            </View>
                                        </Modal>
                                    </>
                                )}
                            </View>
                            
                            <View style={styles.inputContainer}>
                                <Text>Medical History:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsMedicalHistoryDropdownOpen(!isMedicalHistoryDropdownOpen)}>
                                    <Text>{medicalHistory || 'Select Medical History'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isMedicalHistoryDropdownOpen}
                                    onRequestClose={() => setIsMedicalHistoryDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Hypertension', 'Diabetes', 'Tuberculosis', 'Other']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleMedicalHistorySelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                                {medicalHistory === 'Other' && (
                                    <TextInput
                                        style={[styles.input, { marginTop: 10 }]}
                                        placeholder="Specify Medical History"
                                        value={otherMedicalHistory}
                                        onChangeText={setOtherMedicalHistory}
                                        onBlur={() => {
                                            if (otherMedicalHistory.trim() !== '') {
                                                setMedicalHistory(otherMedicalHistory.trim());
                                            } else {
                                                setMedicalHistory('Other');
                                            }
                                        }}
                                    />
                                )}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Classification By Age/Health Risk Group:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsClassificationByAgeHealthDropdownOpen(!isClassificationByAgeHealthDropdownOpen)}>
                                    <Text>{classificationByAgeHealth || 'Select Classification By Age/Health Risk Group'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isClassificationByAgeHealthDropdownOpen}
                                    onRequestClose={() => setIsClassificationByAgeHealthDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Newborn (0-28 days)', 'Infant (0-1 y/o)', 'Pre-School Age (1-4 y/o)', 'School Age (5-9 y/o)', 'Adolescent (10-19 y/o)', 'Adult (20-59 y/o)', 'Senior Citizen (60-above y/o)']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleClassificationByAgeHealthSelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>

                            <View style={styles.inputContainer}>
                                {sex === 'Female' && (
                                    <>
                                        <Text>Last Menstrual Period (LMP):</Text>
                                        <Text>If Pregnant, Write the LMP in this date format:</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter LMP (yyyy-mm-dd) "
                                            value={lmp}
                                            onChangeText={setLmp}
                                        />

                                        <Text></Text>
                                        <Text>If Women of Reproductive Age (WRA)</Text>
                                        <Text>Using any FP method?</Text>
                                        <TouchableOpacity
                                            style={styles.dropdownButton}
                                            onPress={() => setIsUsingFpMethodDropdownOpen(!isUsingFpMethodDropdownOpen)}>
                                            <Text>{usingFpMethod || 'Select Using FP Method'}</Text>
                                        </TouchableOpacity>
                                        <Modal
                                            transparent={true}
                                            visible={isUsingFpMethodDropdownOpen}
                                            onRequestClose={() => setIsUsingFpMethodDropdownOpen(false)}
                                        >
                                            <View style={styles.modalBackground}>
                                                <View style={styles.modalContainer}>
                                                    <FlatList
                                                        data={['Yes', 'No']}
                                                        renderItem={({ item }) => (
                                                            <TouchableOpacity
                                                                style={styles.dropdownItem}
                                                                onPress={() => handleUsingFpMethodSelection(item)}
                                                            >
                                                                <Text>{item}</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                        keyExtractor={(item) => item}
                                                    />
                                                </View>
                                            </View>
                                        </Modal>
                                        
                                        {usingFpMethod === 'Yes' && (
                                            <>
                                                <Text></Text>
                                                <Text>Family Planning Method Used:</Text>
                                                <TouchableOpacity
                                                    style={styles.dropdownButton}
                                                    onPress={() => setIsFamilyPlanningMethodUsedDropdownOpen(!isFamilyPlanningMethodUsedDropdownOpen)}>
                                                    <Text>{familyPlanningMethodUsed || 'Select Family Planning Method Used'}</Text>
                                                </TouchableOpacity>
                                                <Modal
                                                    transparent={true}
                                                    visible={isFamilyPlanningMethodUsedDropdownOpen}
                                                    onRequestClose={() => setIsFamilyPlanningMethodUsedDropdownOpen(false)}
                                                >
                                                    <View style={styles.modalBackground}>
                                                        <View style={styles.modalContainer}>
                                                            <FlatList
                                                                data={['COC', 'POP', 'Injectables', 'IUD', 'Condom', 'LAM', 'BTL', 'Implant', 'SDM', 'DPT', 'Withdrawal', 'Other']}
                                                                renderItem={({ item }) => (
                                                                    <TouchableOpacity
                                                                        style={styles.dropdownItem}
                                                                        onPress={() => handleFamilyPlanningMethodUsedSelection(item)}
                                                                    >
                                                                        <Text>{item}</Text>
                                                                    </TouchableOpacity>
                                                                )}
                                                                keyExtractor={(item) => item}
                                                            />
                                                        </View>
                                                    </View>
                                                </Modal>
                                                {familyPlanningMethodUsed === 'Other' && (
                                                    <TextInput
                                                        style={[styles.input, { marginTop: 10 }]}
                                                        placeholder="Specify citizenship"
                                                        value={otherFamilyPlanningMethodUsed}
                                                        onChangeText={setOtherFamilyPlanningMethodUsed}
                                                        onBlur={() => {
                                                            if (otherFamilyPlanningMethodUsed.trim() !== '') {
                                                                setFamilyPlanningMethodUsed(otherFamilyPlanningMethodUsed.trim());
                                                            } else {
                                                                setFamilyPlanningMethodUsed('Other');
                                                            }
                                                        }}
                                                    />
                                                )}

                                                <Text></Text>
                                                <Text>Family Planning Status:</Text>
                                                <TouchableOpacity
                                                    style={styles.dropdownButton}
                                                    onPress={() => setIsFamilyPlanningStatusDropdownOpen(!isFamilyPlanningStatusDropdownOpen)}>
                                                    <Text>{familyPlanningStatus || 'Select Family Planning Status'}</Text>
                                                </TouchableOpacity>
                                                <Modal
                                                    transparent={true}
                                                    visible={isFamilyPlanningStatusDropdownOpen}
                                                    onRequestClose={() => setIsFamilyPlanningStatusDropdownOpen(false)}
                                                >
                                                    <View style={styles.modalBackground}>
                                                        <View style={styles.modalContainer}>
                                                            <FlatList
                                                                data={['New Acceptor', 'Current User', 'Changing Method', 'Changing Clinic', 'Dropout', 'Restarter']}
                                                                renderItem={({ item }) => (
                                                                    <TouchableOpacity
                                                                        style={styles.dropdownItem}
                                                                        onPress={() => handleFamilyPlanningStatusSelection(item)}
                                                                    >
                                                                        <Text>{item}</Text>
                                                                    </TouchableOpacity>
                                                                )}
                                                                keyExtractor={(item) => item}
                                                            />
                                                        </View>
                                                    </View>
                                                </Modal>
                                            </>
                                        )}
                                    </>
                                )}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Type of Water Source:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsTypeOfWaterSourceDropdownOpen(!isTypeOfWaterSourceDropdownOpen)}>
                                    <Text>{typeOfWaterSource || 'Select Type of Water Source'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isTypeOfWaterSourceDropdownOpen}
                                    onRequestClose={() => setIsTypeOfWaterSourceDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['Lv I - Point Source', 'Lv II - Communal faucet system or stand posts', 'Lv III - Waterworks system or individual house connection', 'O - For doubtful sources, open dug well etc.']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleTypeOfWaterSourceSelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Type of Toilet Facility:</Text>
                                <TouchableOpacity
                                    style={styles.dropdownButton}
                                    onPress={() => setIsTypeOfToiletFacilityDropdownOpen(!isTypeOfToiletFacilityDropdownOpen)}>
                                    <Text>{typeOfToiletFacility || 'Select Type of Toilet Facility'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={isTypeOfToiletFacilityDropdownOpen}
                                    onRequestClose={() => setIsTypeOfToiletFacilityDropdownOpen(false)}
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={['P - Pour/flush toilet connected to septic tank', 'PF - Pour/flush toilet connected to septic tank and to sewage system', 'VIP - Ventilated improved pit latrine (VIP) or composting toilet', 'WS - Water-sealed connected to open drain', 'OH - Overhung Latrine', 'OP - Open-pit Latrine','WO - Without toilet']}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        style={styles.dropdownItem}
                                                        onPress={() => handleTypeOfToiletFacilitySelection(item)}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item) => item}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </>
                    )}
        

                    <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onSave={handleSave}
                    containerStyle={styles.paginationContainer}
                    />
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F3F7',
        padding: 10,
    },
    box: {
        width: '100%',
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
        color: 'red',
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    choiceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    choiceButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    choiceText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedChoice: {
        backgroundColor: '#d3d3d3',
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    paginationContainer: {
        marginTop: 20,
        alignSelf: 'center',
    },
});


export default RegisterScreen;
