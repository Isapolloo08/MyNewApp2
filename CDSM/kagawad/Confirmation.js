import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import axios from 'axios';

const councilors = {
    'Councilor for Disaster Preparedness': 'Councilor Ramon F. Labarro',
    'Councilor for Agriculture & Food': 'Councilor Ramon F. Labarro',
    'Councilor for Non-Government Org./People': 'Councilor Gigi M. Consuleo',
    'Councilor for Social Services': 'Councilor Arthur M. Panotes',
    'Councilor for Education, Culture & Arts': 'Councilor Paul Steven M. Ricasio',
    'Councilor for Labor & Employment/Livelihood': 'Councilor Rachel Jan S. Rafael',
    'Councilor for Finance, Budget & Appropriations': 'Councilor Paul Steven M. Ricasio',
    'Councilor for Senior Citizen': 'Councilor Alfonz Brien T. Cacayan',
    'Councilor for Women\'s, Children & Family Welfare': 'Councilor Gigi M. Consuleo',
    'Councilor for Personnel': 'Councilor Paul Steven M. Ricasio',
    'Councilor for Games & Amusement': 'Councilor Jose Aurelio A. Puso',
    'Councilor for Ways and Means/Tourism': 'Councilor Rachel Jan S. Rafael',
    'Councilor for Environmental Protection & Ecology': 'Councilor Arthur M. Panotes',
    'Councilor for PWD': 'Councilor Alfonz Brien T. Cacayan',
    'Councilor for Good Governance': 'Councilor Alfonz Brien T. Cacayan',
    'Councilor for Public Works and Infrastructure': 'Councilor Jose Aurelio A. Puso',
    'Councilor for Trade & Sanitation': 'Councilor Gigi M. Consuleo',
    'Councilor for Human Rights': 'Councilor Alfonz Brien T. Cacayan',
    'Councilor for Peace & Order': 'Councilor Arthur M. Panotes',
};

const Confirmation = ({ navigation, route }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const {
        eventName,
        startDate,
        endDate,
        location,
        note,
        savedMaterialsList,
        savedExpensesList,
        selectedCouncilor
    } = route.params;

    const proposedBy = selectedCouncilor ? councilors[selectedCouncilor] : 'Unknown';

    // Calculate total funds for materials
    const totalMaterialsFunds = savedMaterialsList ? savedMaterialsList.reduce((total, item) => total + item.allocation, 0) : 0;

    // Calculate total funds for other expenses
    const totalOtherExpensesFunds = savedExpensesList ? savedExpensesList.reduce((total, item) => total + item.allocation, 0) : 0;

    // Calculate total event funds
    const totalEventFunds = totalMaterialsFunds + totalOtherExpensesFunds;

    const handleConfirmPress = () => {
        setModalVisible(true);
    };

    const handleYesPress = () => {
        setModalVisible(false);

        // Save data to the backend
        const programData = {
            programName: eventName,
            startDate,
            endDate,
            location,
            note,
            proposedBy,
            committee: selectedCouncilor,
            programType: 'Event',
            savedMaterialsList,
            savedExpensesList,
            budget: totalEventFunds,
            status: 'Pending'
        };

        axios.post('http://brgyapp.lesterintheclouds.com/confirmEvent.php', programData)
            .then(response => {
                console.log('Success:', response.data);
                // Navigate to the History screen
                navigation.navigate('History', {
                    eventName,
                    location,
                    startDate,
                    endDate,
                    note,
                    savedMaterialsList,
                    savedExpensesList,
                    totalEventFunds,
                });
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    };

    const handleNoPress = () => {
        setModalVisible(false);
    };

    const renderItem = ({ item, index }) => {
        switch (index) {
            case 0:
                return (
                    <View style={styles.topContainer}>
                        {/* Step Indicator */}
                        <View style={styles.stepIndicator}>
                            <View style={styles.step}>
                                <Text style={[styles.stepLabel, styles.doneLabel]}>Event</Text>
                                <View style={[styles.stepNumber, styles.doneStep]}>
                                    <Icon name="check" size={15} color="#FFF" />
                                </View>
                            </View>
                            <View style={[styles.step, styles.activeStep]}>
                                <Text style={[styles.stepLabel, styles.doneLabel]}>Materials</Text>
                                <View style={[styles.stepNumber, styles.doneStep]}>
                                    <Icon name="check" size={15} color="#FFF" />
                                </View>
                            </View>
                            <View style={[styles.step]}>
                                <Text style={[styles.stepLabel, styles.doneLabel]}>Other Expenses</Text>
                                <View style={[styles.stepNumber, styles.doneStep]}>
                                    <Icon name="check" size={15} color="#FFF" />
                                </View>
                            </View>
                            <View style={styles.step}>
                                <Text style={[styles.stepLabel, styles.activeLabel]}>Confirmation</Text>
                                <Text style={[styles.stepNumber, styles.activeNumber]}>4</Text>
                            </View>
                        </View>
                        {/* Event Details */}
                        <View style={styles.eventDetailsContainer}>
                            <Text style={styles.eventNameText}>{eventName}</Text>
                            <View style={styles.eventDetailRow}></View>
                            <Text style={styles.eventDetailLabel}>Proposed By:</Text>
                            <Text style={styles.proposedBy}>{proposedBy}</Text>
                            <Text style={styles.selectedCouncilor}>{selectedCouncilor}</Text>
                            <View style={styles.eventDetailRow}>
                                <Text style={styles.eventDetailLabel}>Start Date:</Text>
                                <Text style={styles.eventDetailText}>{startDate}</Text>
                            </View>
                            <View style={styles.eventDetailRow}>
                                <Text style={styles.eventDetailLabel}>End Date:</Text>
                                <Text style={styles.eventDetailText}>{endDate}</Text>
                            </View>
                            <View style={styles.eventDetailRow}>
                                <Text style={styles.eventDetailLabel}>Location:</Text>
                                <Text style={styles.eventDetailText}>{location}</Text>
                            </View>
                            <Text style={styles.eventDetailLabel}>Note:</Text>
                            <View style={styles.noteContainer}>
                                <View style={styles.noteBox}>
                                    <Text style={styles.eventDetailText}>{note}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case 1:
                return (
                    <View style={styles.tableContainer}>
                        <Text style={styles.tableTitle}>Materials List</Text>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, styles.nameColumn]}>Name</Text>
                            <Text style={[styles.tableHeaderText, styles.allocationColumn]}>Allocation</Text>
                        </View>
                        {savedMaterialsList.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.tableRowText, styles.nameColumn]}>{item.name}</Text>
                                <Text style={[styles.tableRowText, styles.allocationColumn]}>₱{item.allocation}</Text>
                            </View>
                        ))}
                        <View style={styles.totalRow}>
                            <Text style={[styles.tableHeaderText, styles.nameColumn]}>Total:</Text>
                            <Text style={[styles.tableHeaderText, styles.allocationColumn]}>₱{totalMaterialsFunds}</Text>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.tableContainer}>
                        <Text style={styles.tableTitle}>Other Expenses List</Text>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, styles.nameColumn]}>Name</Text>
                            <Text style={[styles.tableHeaderText, styles.allocationColumn]}>Allocation</Text>
                        </View>
                        {savedExpensesList.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.tableRowText, styles.nameColumn]}>{item.name}</Text>
                                <Text style={[styles.tableRowText, styles.allocationColumn]}>₱{item.allocation}</Text>
                            </View>
                        ))}
                        <View style={styles.totalRow}>
                            <Text style={[styles.tableHeaderText, styles.nameColumn]}>Total:</Text>
                            <Text style={[styles.tableHeaderText, styles.allocationColumn]}>₱{totalOtherExpensesFunds}</Text>
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total Event Funds:</Text>
                        <Text style={styles.totalAmount}>₱{totalEventFunds}</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={[{}, {}, {}, {}]}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                    <View style={styles.confirmationContainer}>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
                            <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <Modal isVisible={isModalVisible} onBackdropPress={handleNoPress}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Confirmation</Text>
                    <Text style={styles.modalMessage}>Are you sure you want to confirm this event?</Text>
                    <View style={styles.modalButtonsContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleYesPress}>
                            <Text style={styles.modalButtonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleNoPress}>
                            <Text style={styles.modalButtonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    topContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    step: {
        alignItems: 'center',
    },
    stepLabel: {
        color: '#D9D9D9',
        marginBottom: 4,
        fontSize: 10,
    },
    doneLabel: {
        color: '#710808',
    },
    activeLabel: {
        color: '#000',
    },
    stepNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
        color: '#FFF',
        textAlign: 'center',
        lineHeight: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneStep: {
        backgroundColor: '#710808',
    },
    activeNumber: {
        backgroundColor: '#710808',
        color: '#FFF',
    },
    eventDetailsContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 16,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#DDD',
    },
    eventNameText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 1,
    },
    eventDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
    },
    eventDetailLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    eventDetailText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
        marginTop: 10,
    },
    noteContainer: {
        marginTop: 2,
        
    },
    noteBox: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 9,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    tableContainer: {
        marginBottom: 16,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    tableTitle: {
        fontSize: 16,
        backgroundColor: '#FFF',
        padding: 8,
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#710808',
        padding: 8,
    },
    tableHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        flex: 1,
        marginRight: 30,
        marginLeft: 30
    },
    nameColumn: {
        flex: 1,
    },
    allocationColumn: {
        flex: 1,
        textAlign: 'right',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    tableRowText: {
        fontSize: 14,

    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalContainer: {
        marginBottom: 16,
        backgroundColor: '#ffff',
        borderRadius: 10,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#DDD',

    },
    totalLabel: {
        fontSize: 16,
        backgroundColor: '#710808',
        padding: 8,
        color: '#ffff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 22,
    },
    totalAmount: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#710808',
        textAlign: 'center',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#710808', // Set button color to red
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
    },
    modalButton: {
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4caf50',
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    selectedCouncilor: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 20,
    },
    proposedBy: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 3,
    },
});

export default Confirmation;
