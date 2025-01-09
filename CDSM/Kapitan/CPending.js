import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert, ScrollView, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const CPending = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [programDetails, setProgramDetails] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rejecting, setRejecting] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    const { programId } = route.params;

    useEffect(() => {
        if (programId) {
            fetchProgramDetails(programId);
        } else {
            setError('Program ID is missing');
            setLoading(false);
        }
    }, [programId]);

    const fetchProgramDetails = async (id) => {
        try {
            const response = await fetch(`http://brgyapp.lesterintheclouds.com/pending.php?programId=${id}`);

            if (!response.ok) {
                const responseBody = await response.text();
                console.error(`Error: ${response.status} - ${response.statusText} - ${responseBody}`);
                throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            if (data) {
                setProgramDetails(data.programDetails);
                setMaterials(data.materials || []);
                setExpenses(data.expenses || []);
            } else {
                setError('No program details found');
            }
        } catch (error) {
            console.error('Error fetching program details:', error);
            setError('Failed to fetch program details');
        } finally {
            setLoading(false);
        }
    };

    const updateProgramStatus = async (status, reason = '') => {
        try {
            const response = await fetch(`http://brgyapp.lesterintheclouds.com/decision.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ programId: programId, status: status, reason: reason, programDetails: programDetails }),
            });

            if (!response.ok) {
                throw new Error('Failed to update the program status');
            }

            const successMessage = status === 'Approved' ? 'Program has been approved successfully.' : 'Program has been rejected successfully.';
            Alert.alert('Success', successMessage);
            navigation.navigate('CProposedProgram'); // Navigate back to History screen
        } catch (error) {
            console.error('Error updating program status:', error);
            setError('Failed to update the program status');
        }
    };

    const handleRejectProposal = () => {
        if (rejectReason.trim() === '') {
            Alert.alert('Error', 'Please provide a reason for rejection.');
            return;
        }

        Alert.alert(
            'Reject Proposal',
            'Are you sure you want to reject this proposal?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => updateProgramStatus('Rejected', rejectReason) }
            ]
        );
    };

    const handleApproveProposal = () => {
        Alert.alert(
            'Approve Proposal',
            'Are you sure you want to approve this proposal?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => updateProgramStatus('Approved') }
            ]
        );
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + parseFloat(item.allocation) || 0, 0).toFixed(2);
    };

    const totalMaterials = calculateTotal(materials);
    const totalExpenses = calculateTotal(expenses);
    const grandTotal = (parseFloat(totalMaterials) + parseFloat(totalExpenses)).toFixed(2);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#710808" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!programDetails) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No details available</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>{programDetails.programName}</Text>
                <View style={styles.eventDetailRow}>
                    <Text style={styles.eventDetailLabel}>Type:</Text>
                    <Text style={styles.eventDetailText}>{programDetails.programType}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                    <Text style={styles.eventDetailLabel}>Location:</Text>
                    <Text style={styles.eventDetailText}>{programDetails.location}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                    <Text style={styles.eventDetailLabel}>Proposed By:</Text>
                    <Text style={styles.eventDetailText}>{programDetails.proposedBy}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                    <Text style={styles.eventDetailLabel}>Committee:</Text>
                    <Text style={styles.eventDetailText}>{programDetails.committee}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                    <Text style={styles.eventDetailLabel}>Budget:</Text>
                    <Text style={styles.eventDetailText}>{programDetails.budget}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                    <Text style={styles.eventDetailLabel}>Start Date:</Text>
                    <Text style={styles.eventDetailText}>{programDetails.startDate}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                    <Text style={styles.eventDetailLabel}>End Date:</Text>
                    <Text style={styles.eventDetailText}>{programDetails.endDate}</Text>
                </View>
            </View>

            <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Materials List</Text>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Name</Text>
                    <Text style={[styles.tableHeaderText, styles.allocationColumn]}>Allocation</Text>
                </View>
                {materials.length > 0 ? (
                    materials.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={[styles.tableRowText, styles.nameColumn]}>{item.name}</Text>
                            <Text style={[styles.tableRowText, styles.allocationColumn]}>{item.allocation}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No materials available</Text>
                )}
            </View>

            <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Expenses List</Text>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Name</Text>
                    <Text style={[styles.tableHeaderText, styles.allocationColumn]}>Allocation</Text>
                </View>
                {expenses.length > 0 ? (
                    expenses.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={[styles.tableRowText, styles.nameColumn]}>{item.name}</Text>
                            <Text style={[styles.tableRowText, styles.allocationColumn]}>{item.allocation}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No expenses available</Text>
                )}
            </View>

            <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Total Program Funds</Text>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Type</Text>
                    <Text style={[styles.tableHeaderText, styles.allocationColumn]}>Amount</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableRowText, styles.nameColumn]}>Total Materials</Text>
                    <Text style={[styles.tableRowText, styles.allocationColumn]}>{totalMaterials}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableRowText, styles.nameColumn]}>Total Expenses</Text>
                    <Text style={[styles.tableRowText, styles.allocationColumn]}>{totalExpenses}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableRowText, styles.nameColumn]}>Total</Text>
                    <Text style={[styles.tableRowText, styles.allocationColumn]}>{grandTotal}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Reject"
                    color="#808080"
                    onPress={() => setRejecting(true)}
                />
                <Button
                    title="Approve"
                    color="#710808"
                    onPress={handleApproveProposal}
                />
            </View>

            {rejecting && (
                <View style={styles.rejectContainer}>
                    <Text style={styles.rejectTitle}>State your reason</Text>
                    <TextInput
                        style={styles.rejectInput}
                        value={rejectReason}
                        onChangeText={setRejectReason}
                        placeholder="Enter reason for rejection"
                        multiline
                    />
                    <Button
                        title="Reject"
                        color="#710808"
                        onPress={handleRejectProposal}
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    topContainer: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#710808',
    },
    eventDetailRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    eventDetailLabel: {
        fontWeight: 'bold',
        marginRight: 8,
        color: '#000000',
    },
    eventDetailText: {
        color: '#000000',
    },
    tableContainer: {
        marginBottom: 16,
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000000',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
    },
    tableHeaderText: {
        fontWeight: 'bold',
        color: '#000000',
    },
    nameColumn: {
        flex: 1,
        paddingLeft: 8,
    },
    allocationColumn: {
        width: 100,
        textAlign: 'right',
        paddingRight: 8,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    tableRowText: {
        color: '#000000',
    },
    noDataText: {
        textAlign: 'center',
        paddingVertical: 8,
        color: '#808080',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#ff0000',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#808080',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    rejectContainer: {
        marginTop: 16,
    },
    rejectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000000',
    },
    rejectInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        height: 80,
        textAlignVertical: 'top',
    },
});

export default CPending;
