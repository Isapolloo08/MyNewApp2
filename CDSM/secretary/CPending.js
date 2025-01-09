import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

const SPending = ({ navigation, route }) => {
    const { programId } = route.params;
    const [isRejecting, setIsRejecting] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [programDetails, setProgramDetails] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [totalMaterialsFunds, setTotalMaterialsFunds] = useState(0);
    const [totalOtherExpensesFunds, setTotalOtherExpensesFunds] = useState(0);

    useEffect(() => {
        const fetchProgramDetails = async () => {
            try {
                let response = await fetch(`http://192.168.1.6:3001/pending_programs/${programId}`);
                if (response.status !== 200) {
                    const errorText = await response.text();
                    console.error('Error fetching program details:', errorText);
                    Alert.alert('Failed to fetch program details');
                    return;
                }
                const { program, materials, expenses } = await response.json();
                setProgramDetails(program);
                setMaterials(materials);
                setExpenses(expenses);

                // Calculate total funds
                const totalMaterials = materials.reduce((total, item) => total + item.allocation, 0);
                const totalExpenses = expenses.reduce((total, item) => total + item.allocation, 0);
                setTotalMaterialsFunds(totalMaterials);
                setTotalOtherExpensesFunds(totalExpenses);

            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Failed to fetch data');
            }
        };

        fetchProgramDetails();
    }, [programId]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const deleteProgram = async () => {
        try {
            let response = await fetch(`http://192.168.1.4:3001/delete_program/${programId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Alert.alert('Success', 'Program and associated data deleted successfully.');
                navigation.navigate('Kproposedprogram');
            } else {
                const errorText = await response.text();
                console.error('Error deleting program:', errorText);
                Alert.alert('Failed to delete program');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Failed to delete program');
        }
    };

    const handleConfirmPress = () => {
        deleteProgram();
        toggleModal();
    };

    const handleCancelPress = () => {
        toggleModal();
    };

    const handleRejectPress = () => {
        setIsRejecting(true);
    };

    const handleApprovePress = async () => {
        try {
            const response = await fetch(`http://192.168.1.4:3001/pending_programs/${programId}/approve`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json(); // Attempt to parse response body as JSON
    
            if (response.ok) {
                console.log('Program approved successfully:', data);
                Alert.alert('Success', 'Program approved successfully.');
                navigation.navigate('CProposedProgram');
            } else {
                console.error('Error approving program:', data); // Log error message received from server
                Alert.alert('Failed to approve program');
            }
        } catch (error) {
            console.error('Error approving program:', error);
            Alert.alert('Failed to approve program');
        }
    };
    
    

    if (!programDetails) {
        return <Text>Loading...</Text>;
    }

    const { programName, startDate, location, proposedBy, committee, budget } = programDetails;

    const renderItem = ({ item, index }) => {
        switch (index) {
            case 0:
                return (
                    <View style={styles.topContainer}>
                        <View style={styles.eventDetailsContainer}>
                            <Text style={styles.eventNameText}>{programName}</Text>
                            <View style={styles.eventDetailRow}>
                                <Text style={styles.eventDetailLabel}>Start Date:</Text>
                                <Text>{startDate}</Text>
                            </View>
                            <View style={styles.eventDetailRow}>
                                <Text style={styles.eventDetailLabel}>Location:</Text>
                                <Text>{location}</Text>
                            </View>
                            <View style={styles.eventDetailRow}>
                                <Text style={styles.eventDetailLabel}>Proposed By:</Text>
                                <Text>{proposedBy}</Text>
                            </View>
                            <View style={styles.eventDetailRow}>
                                <Text style={styles.eventDetailLabel}>Committee:</Text>
                                <Text>{committee}</Text>
                            </View>
                            <View style={styles.eventDetailRow}>
                                <Text style={styles.eventDetailLabel}>Budget:</Text>
                                <Text>{budget}</Text>
                            </View>
                        </View>
                    </View>
                );
            case 1:
                return (
                    <View style={styles.tableContainer}>
                        <Text style={styles.tableTitle}>Materials List</Text>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Material</Text>
                            <View style={styles.separator} />
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Allocation (₱)</Text>
                        </View>
                        <FlatList
                            data={materials}
                            keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}  // Use Math.random() as fallback
                            renderItem={({ item }) => (
                                <View style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.name}</Text>
                                    <View style={styles.separator} />
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.allocation.toLocaleString()}</Text>
                                </View>
                            )}
                            ListFooterComponent={
                                <View style={styles.tableFooter}>
                                    <Text style={[styles.tableFooterText, { flex: 1 }]}>TOTAL</Text>
                                    <View style={styles.separator} />
                                    <Text style={[styles.tableFooterText, { flex: 1 }]}>{totalMaterialsFunds.toLocaleString()}</Text>
                                </View>
                            }
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
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Allocation (₱)</Text>
                        </View>
                        <FlatList
                            data={expenses}
                            keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}  // Use Math.random() as fallback
                            renderItem={({ item }) => (
                                <View style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.name}</Text>
                                    <View style={styles.separator} />
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.allocation.toLocaleString()}</Text>
                                </View>
                            )}
                            ListFooterComponent={
                                <View style={styles.tableFooter}>
                                    <Text style={[styles.tableFooterText, { flex: 1 }]}>TOTAL</Text>
                                    <View style={styles.separator} />
                                    <Text style={[styles.tableFooterText, { flex: 1 }]}>{totalOtherExpensesFunds.toLocaleString()}</Text>
                                </View>
                            }
                        />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.tableContainer}>
                        <Text style={styles.tableTitle}>Total Event Funds</Text>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Type</Text>
                            <View style={styles.separator} />
                            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Allocation (₱)</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { flex: 1 }]}>Materials</Text>
                            <View style={styles.separator} />
                            <Text style={[styles.tableCell, { flex: 1 }]}>{totalMaterialsFunds.toLocaleString()}</Text>
                        </View>
                        <View style={[styles.tableRow, styles.tableRowEven]}>
                            <Text style={[styles.tableCell, { flex: 1 }]}>Other Expenses</Text>
                            <View style={styles.separator} />
                            <Text style={[styles.tableCell, { flex: 1 }]}>{totalOtherExpensesFunds.toLocaleString()}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { flex: 1 }]}>Total</Text>
                            <View style={styles.separator} />
                            <Text style={[styles.tableCell, { flex: 1 }]}>{(totalMaterialsFunds + totalOtherExpensesFunds).toLocaleString()}</Text>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={[1, 2, 3, 4]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.rejectButton} onPress={handleRejectPress}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.approveButton} onPress={handleApprovePress}>
                    <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Confirm Deletion</Text>
                    <Text>Are you sure you want to delete this program and associated data?</Text>
                    <View style={styles.modalButtons}>
                        <Button title="Cancel" onPress={handleCancelPress} />
                        <Button title="Confirm" onPress={handleConfirmPress} />
                    </View>
                </View>
            </Modal>
            <Modal isVisible={isRejecting} onBackdropPress={() => setIsRejecting(false)}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Reject Program</Text>
                    <TextInput
                        placeholder="Enter rejection reason"
                        value={rejectionReason}
                        onChangeText={setRejectionReason}
                        style={styles.input}
                        multiline
                        numberOfLines={4}
                    />
                    <Button
                        title="Submit"
                        onPress={() => {
                            // Handle submission of rejection reason here
                            setIsRejecting(false);
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    topContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    eventDetailsContainer: {
        padding: 10,
    },
    eventNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    eventDetailRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    eventDetailLabel: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    tableContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: '#f1f1f1',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeaderText: {
        fontWeight: 'bold',
    },
    separator: {
        width: 1,
        height: 20,
        backgroundColor: '#ccc',
    },
    tableRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableRowEven: {
        backgroundColor: '#f9f9f9',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    tableFooter: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    tableFooterText: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    rejectButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    approveButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
});

export default SPending;