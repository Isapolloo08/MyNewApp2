import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import axios from 'axios';

const SConfirmMeeting = ({ navigation, route }) => {
    const { meetingName, startTime, endTime, location, note: initialNote, savedParticipantList, savedExpensesList } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState(initialNote || '');

    // Calculate total funds for expenses
    const fundAllocation = savedExpensesList
        ? savedExpensesList.reduce((total, item) => total + (item.quantity * item.pricePerUnit), 0)
        : 0;

    const handleNextPress = () => {
        setModalVisible(true);
    };

    const handleYesPress = async () => {
        try {
            // Prepare data to send
            const participants = savedParticipantList.map(participant => ({
                participantName: participant.name,
                role: participant.role,
            }));

            const expensesList = savedExpensesList.map(expense => ({
                name: expense.name,
                quantity: expense.quantity,
                pricePerUnit: expense.pricePerUnit,
                total: expense.quantity * expense.pricePerUnit,
            }));

            const allData = {
                meetingName,
                startTime,
                endTime,
                location,
                note,
                participants,
                expensesList,
            };

            // Print all data to console
            console.log('Meeting Data to Print:', JSON.stringify(allData, null, 2));

            // Display data using Alert
            Alert.alert('Meeting Data', JSON.stringify(allData, null, 2));

            // Send data to the meeting.php endpoint
            const response = await axios.post(
                'http://brgyapp.lesterintheclouds.com/meeting.php',
                allData
            );

            if (response.status === 200 && response.data.message === 'Meeting, participants, and expenses saved successfully') {
                navigation.navigate('SPending', {
                    meetingName,
                    startTime,
                    endTime,
                    location,
                    note,
                    participantList: savedParticipantList,
                    expensesList: savedExpensesList,
                });

                setModalVisible(false);
            } else {
                console.error('Error:', response.data.error || 'Unknown error');
                setModalVisible(false);
            }
        } catch (error) {
            console.error('Error saving meeting data:', error.response?.data || error.message);
            setModalVisible(false);
        }
    };

    const handleNoPress = () => {
        setModalVisible(false);
    };

    const renderItem = ({ item, index }) => {
        switch (index) {
            case 0:
                return (
                    <View style={styles.topContainer}>
                        <View style={styles.stepIndicator}>
                            <View style={styles.step}>
                                <Text style={[styles.stepLabel, styles.doneLabel]}>Meeting</Text>
                                <View style={[styles.stepNumber, styles.doneStep]}>
                                    <Icon name="check" size={15} color="#FFF" />
                                </View>
                            </View>
                            <View style={[styles.step, styles.activeStep]}>
                                <Text style={[styles.stepLabel, styles.doneLabel]}>Participants</Text>
                                <View style={[styles.stepNumber, styles.doneStep]}>
                                    <Icon name="check" size={15} color="#FFF" />
                                </View>
                            </View>
                            <View style={[styles.step]}>
                                <Text style={[styles.stepLabel, styles.doneLabel]}>Expenses</Text>
                                <View style={[styles.stepNumber, styles.doneStep]}>
                                    <Icon name="check" size={15} color="#FFF" />
                                </View>
                            </View>
                            <View style={styles.step}>
                                <Text style={[styles.stepLabel, styles.activeLabel]}>Confirmation</Text>
                                <Text style={[styles.stepNumber, styles.activeNumber]}>4</Text>
                            </View>
                        </View>
                        <View style={styles.meetingDetailsContainer}>
                            <Text style={styles.meetingNameText}>{meetingName}</Text>
                            <View style={styles.meetingDetailRow}></View>
                            <Text style={styles.meetingDetailLabel}>Start Time:</Text>
                            <Text style={styles.meetingDetailText}>{startTime}</Text>
                            <Text style={styles.meetingDetailLabel}>End Time:</Text>
                            <Text style={styles.meetingDetailText}>{endTime}</Text>
                            <Text style={styles.meetingDetailLabel}>Location:</Text>
                            <Text style={styles.meetingDetailText}>{location}</Text>
                            <Text style={styles.meetingDetailLabel}>Note:</Text>
                            <TextInput
                                style={styles.noteInput}
                                multiline
                                placeholder="Enter notes here..."
                                value={note}
                                onChangeText={setNote}
                            />
                        </View>
                    </View>
                );
            case 1:
                return (
                    <View style={styles.tableContainer}>
                        <Text style={styles.tableTitle}>Participants List</Text>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Participant</Text>
                            <View style={styles.separator} />
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Role</Text>
                        </View>
                        <FlatList
                            data={savedParticipantList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.name}</Text>
                                    <View style={styles.separator} />
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.role}</Text>
                                </View>
                            )}
                        />
                    </View>
                );
            case 2:
                return (
                    <View style={styles.tableContainer}>
                        <Text style={styles.tableTitle}>Expenses List</Text>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Expense</Text>
                            <View style={styles.separator} />
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Quantity</Text>
                            <View style={styles.separator} />
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Price per Unit (₱)</Text>
                            <View style={styles.separator} />
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Total (₱)</Text>
                        </View>
                        <FlatList
                            data={savedExpensesList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.name}</Text>
                                    <View style={styles.separator} />
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity}</Text>
                                    <View style={styles.separator} />
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.pricePerUnit}</Text>
                                    <View style={styles.separator} />
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity * item.pricePerUnit}</Text>
                                </View>
                            )}
                            ListFooterComponent={
                                <View style={styles.tableFooter}>
                                    <Text style={[styles.tableFooterText, { flex: 1 }]}>TOTAL</Text>
                                    <View style={styles.separator} />
                                    <Text style={[styles.tableFooterText, { flex: 1 }]}>{fundAllocation}</Text>
                                </View>
                            }
                        />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.buttonContainer}>
                        <Button title="Confirm" onPress={handleNextPress} color="#710808" />
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
                contentContainerStyle={styles.contentContainer}
            />
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                backdropColor="rgba(0, 0, 0, 0.5)"
                backdropOpacity={0.5}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <Icon name="question-circle" size={50} color="#710808" />
                    <Text style={styles.modalTitle}>Are you sure you want to confirm this meeting?</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity onPress={handleYesPress} style={styles.modalButtonYes}>
                            <Text style={styles.modalButtonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNoPress} style={styles.modalButtonNo}>
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
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    contentContainer: {
        flexGrow: 1,
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
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    step: {
        alignItems: 'center',
    },
    stepLabel: {
        color: '#D9D9D9',
        marginBottom: 4,
        fontSize: 10,
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
    doneLabel: {
        color: '#710808',
    },
    doneStep: {
        backgroundColor: '#710808',
    },
    activeStep: {
        alignItems: 'center',
    },
    activeLabel: {
        color: '#000',
    },
    activeNumber: {
        backgroundColor: '#710808',
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
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        color: '#000',
    },
    tableFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#CCC',
        paddingVertical: 8,
    },
    tableFooterText: {
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        flex: 1,
    },
    buttonContainer: {
        marginTop: 16,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#710808',
        padding: 8,
    },
    tableHeaderText: {
        color: '#FFF',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    separator: {
        width: 1,
        backgroundColor: '#FFF',
    },
    meetingDetailsContainer: {
        marginBottom: 15,
    },
    meetingNameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    meetingDetailLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 12,
    },
    meetingDetailText: {
        fontSize: 14,
        marginBottom: 12,
    },
    noteInput: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        padding: 8,
        backgroundColor: '#FFF',
        textAlignVertical: 'top',
        minHeight: 80,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButtonYes: {
        backgroundColor: '#710808',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    modalButtonNo: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default SConfirmMeeting;