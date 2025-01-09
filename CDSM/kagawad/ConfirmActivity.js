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

const ConfirmActivity = ({ navigation, route }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const {
        activityName,
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

    // Calculate total activity funds
    const totalActivityFunds = totalMaterialsFunds + totalOtherExpensesFunds;

    const handleConfirmPress = () => {
        setModalVisible(true);
    };

    const handleYesPress = () => {
        setModalVisible(false);

        // Save data to the backend
        const programData = {
            programName: activityName,
            startDate,
            endDate,
            location,
            note,
            proposedBy,
            committee: selectedCouncilor,
            programType: 'Activity',
            savedMaterialsList,
            savedExpensesList,
            budget: totalActivityFunds,
            status: 'Pending'
        };

        axios.post('http://brgyapp.lesterintheclouds.com/confirmActivity.php', programData)
            .then(response => {
                console.log('Success:', response.data);
                // Navigate to the History screen
                navigation.navigate('History', {
                    activityName,
                    location,
                    startDate,
                    endDate,
                    note,
                    savedMaterialsList,
                    savedExpensesList,
                    totalActivityFunds,
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
                                <Text style={[styles.stepLabel, styles.doneLabel]}>Activity</Text>
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
                        {/* Activity Details */}
                        <View style={styles.activityDetailsContainer}>
                            <Text style={styles.activityNameText}>{activityName}</Text>
                            <View style={styles.activityDetailRow}></View>
                            <Text style={styles.activityDetailLabel}>Proposed By:</Text>
                            <Text style={styles.proposedBy}>{proposedBy}</Text>
                            <Text style={styles.selectedCouncilor}>{selectedCouncilor}</Text>
                            <View style={styles.activityDetailRow}>
                                <Text style={styles.activityDetailLabel}>Start Date:</Text>
                                <Text style={styles.activityDetailText}>{startDate}</Text>
                            </View>
                            <View style={styles.activityDetailRow}>
                                <Text style={styles.activityDetailLabel}>End Date:</Text>
                                <Text style={styles.activityDetailText}>{endDate}</Text>
                            </View>
                            <View style={styles.activityDetailRow}>
                                <Text style={styles.activityDetailLabel}>Location:</Text>
                                <Text style={styles.activityDetailText}>{location}</Text>
                            </View>
                            <Text style={styles.activityDetailLabel}>Note:</Text>
                            <View style={styles.noteContainer}>
                                <View style={styles.noteBox}>
                                    <Text style={styles.activityDetailText}>{note}</Text>
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
                        <Text style={styles.totalLabel}>Total Activity Funds:</Text>
                        <Text style={styles.totalAmount}>₱{totalActivityFunds}</Text>
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
                ListFooterComponent={() => (
                    <View style={styles.confirmContainer}>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
                            <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Are you sure you want to proceed?</Text>
                    <View style={styles.modalButtons}>
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
        backgroundColor: '#f8f9fa',
    },
    topContainer: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    step: {
        alignItems: 'center',
    },
    stepLabel: {
        fontSize: 12,
        color: '#999',
    },
    stepNumber: {
        marginTop: 4,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeStep: {
        borderBottomColor: '#710808',
        borderBottomWidth: 2,
    },
    doneLabel: {
        color: '#710808',
    },
    doneStep: {
        backgroundColor: '#710808',
    },
    activeLabel: {
        color: '#710808',
    },
    activeNumber: {
        backgroundColor: '#710808',
        color: '#fff',
    },
    activityDetailsContainer: {
        marginTop: 16,
    },
    activityNameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#710808',
    },
    activityDetailRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    activityDetailLabel: {
        fontWeight: 'bold',
        width: 100,
        color: '#710808',
    },
    activityDetailText: {
        color: '#333',
    },
    proposedBy: {
        fontWeight: 'bold',
        color: '#333',
    },
    selectedCouncilor: {
        color: '#710808',
        marginBottom: 8,
    },
    noteContainer: {
        marginTop: 8,
    },
    noteBox: {
        backgroundColor: '#f8f9fa',
        padding: 8,
        borderRadius: 4,
    },
    tableContainer: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#710808',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 8,
        marginBottom: 8,
    },
    tableHeaderText: {
        fontWeight: 'bold',
        color: '#710808',
    },
    nameColumn: {
        flex: 3,
    },
    allocationColumn: {
        flex: 1,
        textAlign: 'right',
    },
    tableRow: {
        flexDirection: 'row',
        paddingBottom: 8,
        marginBottom: 8,
    },
    tableRowText: {
        color: '#333',
    },
    totalRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 8,
    },
    totalContainer: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#710808',
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#710808',
        marginTop: 8,
    },
    confirmContainer: {
        margin: 16,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#710808',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 22,
        borderRadius: 8,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#710808',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        backgroundColor: '#710808',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ConfirmActivity;
