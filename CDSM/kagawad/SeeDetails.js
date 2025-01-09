import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const SeeDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [programDetails, setProgramDetails] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { programId } = route.params || {};

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
            const response = await fetch(`http://brgyapp.lesterintheclouds.com/seedetails.php?programId=${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setProgramDetails(data.programDetails || {});
                setMaterials(data.materials || []);
                setExpenses(data.expenses || []);
            }
        } catch (error) {
            setError('Failed to fetch program details');
        } finally {
            setLoading(false);
        }
    };

    const calculateTotals = (items) => {
        return items.reduce((total, item) => total + (item.quantity * item.pricePerUnit), 0);
    };

    const totalMaterials = calculateTotals(materials);
    const totalExpenses = calculateTotals(expenses);
    const grandTotal = totalMaterials + totalExpenses;

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {programDetails ? (
                <>
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>{programDetails.programName || 'N/A'}</Text>
                        <View style={styles.eventDetailRow}>
                            <Text style={styles.eventDetailLabel}>Type:</Text>
                            <Text style={styles.eventDetailText}>{programDetails.programType || 'N/A'}</Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                            <Text style={styles.eventDetailLabel}>Location:</Text>
                            <Text style={styles.eventDetailText}>{programDetails.location || 'N/A'}</Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                            <Text style={styles.eventDetailLabel}>Proposed By:</Text>
                            <Text style={styles.eventDetailText}>{programDetails.proposedBy || 'N/A'}</Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                            <Text style={styles.eventDetailLabel}>Committee:</Text>
                            <Text style={styles.eventDetailText}>{programDetails.committee || 'N/A'}</Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                            <Text style={styles.eventDetailLabel}>Budget:</Text>
                            <Text style={styles.eventDetailText}>{programDetails.budget || 'N/A'}</Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                            <Text style={styles.eventDetailLabel}>Start Date:</Text>
                            <Text style={styles.eventDetailText}>{programDetails.startDate || 'N/A'}</Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                            <Text style={styles.eventDetailLabel}>End Date:</Text>
                            <Text style={styles.eventDetailText}>{programDetails.endDate || 'N/A'}</Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                            <Text style={styles.eventDetailLabel}>Note:</Text>
                            <Text style={styles.eventDetailText}>{programDetails.note || 'N/A'}</Text>
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
                                    <Text style={[styles.tableRowText, styles.nameColumn]}>{item.name || 'N/A'}</Text>
                                    <Text style={[styles.tableRowText, styles.allocationColumn]}>{item.allocation || 'N/A'}</Text>
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
                                    <Text style={[styles.tableRowText, styles.nameColumn]}>{item.name || 'N/A'}</Text>
                                    <Text style={[styles.tableRowText, styles.allocationColumn]}>{item.allocation || 'N/A'}</Text>
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
                            <Text style={[styles.tableRowText, styles.allocationColumn]}>{totalMaterials.toFixed(2)}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableRowText, styles.nameColumn]}>Total Expenses</Text>
                            <Text style={[styles.tableRowText, styles.allocationColumn]}>{totalExpenses.toFixed(2)}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableRowText, styles.nameColumn]}>Total</Text>
                            <Text style={[styles.tableRowText, styles.allocationColumn]}>{grandTotal.toFixed(2)}</Text>
                        </View>
                    </View>
                </>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No details available</Text>
                </View>
            )}
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
