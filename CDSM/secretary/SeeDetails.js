import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const SeeDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [programDetails, setProgramDetails] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            console.log(`Fetching program details for ID: ${programId}`);
            const response = await fetch(`http://192.168.1.4:3001/programs/${id}`);
    
            if (!response.ok) {
                const responseBody = await response.text();
                console.error(`Error: ${response.status} - ${response.statusText} - ${responseBody}`);
                throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Fetched data:', data); // Debugging line
    
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

    const handleCancelProposal = async () => {
        try {
            const response = await fetch(`http://192.168.1.4:3001/programs/${programId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to cancel the proposal');
            }

            Alert.alert('Success', 'Proposal has been canceled successfully.');
            navigation.navigate('History'); // Navigate back to History screen
        } catch (error) {
            console.error('Error canceling proposal:', error);
            setError('Failed to cancel the proposal');
        }
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

           
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    eventDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    eventDetailLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    eventDetailText: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 16,
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
        padding: 16,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    tableContainer: {
        marginTop: 24,
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        paddingBottom: 8,
        marginBottom: 8,
    },
    tableHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    tableRowText: {
        fontSize: 16,
    },
    nameColumn: {
        flex: 2,
    },
    allocationColumn: {
        flex: 1,
        textAlign: 'right',
    },
    noDataText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginVertical: 16,
    },
});

export default SeeDetails;