import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const History = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { refresh } = route.params || {};
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState('Pending');

    useEffect(() => {
        fetchData();
    }, [refresh, selectedTab]);

    const fetchData = async () => {
        console.log('Fetching data...');
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://brgyapp.lesterintheclouds.com/history.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: selectedTab }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch data: ${errorText}`);
            }

            const result = await response.json();
            console.log('Fetched data:', result);

            if (result.error) {
                setError(result.error);
            } else if (Array.isArray(result)) {
                setData(result);
            } else {
                setError('Invalid data received from the server');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(`Failed to load data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelProposal = async (id, type) => {
        try {
            const response = await fetch(`http://brgyapp.lesterintheclouds.com/${type}s/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Cancelled' }),
            });

            if (!response.ok) {
                throw new Error('Failed to cancel the proposal');
            }

            Alert.alert('Success', 'Proposal has been cancelled successfully.', [
                {
                    text: 'OK',
                    onPress: () => fetchData(),
                },
            ]);
        } catch (error) {
            console.error('Error canceling proposal:', error);
            setError('Failed to cancel the proposal. Please try again later.');
        }
    };

    const navigateToDetails = (id, type) => {
        if (type === 'program' && id) {
            navigation.navigate('Pending', { programId: id });
        } else if (type === 'meeting' && id) {
            navigation.navigate('Pending', { meetingId: id });
        } else {
            console.error('ID or type is missing');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={[styles.typeIndicator, { backgroundColor: item.programType === 'meeting' ? '#E0E7FF' : '#F4EAEA' }]}>
                    {item.programType === 'meeting' ? '' : ''}
                </Text>
                <Text style={styles.headerText}>
                    {item.programType || 'Program'}
                </Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Program Name:</Text>
                        <Text style={styles.value}>{item.programName || 'N/A'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Location:</Text>
                        <Text style={styles.value}>{item.location || 'N/A'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Proposed By:</Text>
                        <Text style={styles.value}>{item.proposedBy || 'N/A'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Committee:</Text>
                        <Text style={styles.value}>{item.committee || 'N/A'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Budget:</Text>
                        <Text style={styles.value}>{item.budget || 'N/A'}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigateToDetails(item.programId, 'program')}>
                <Text style={styles.buttonText}>See Details</Text>
            </TouchableOpacity>
            {item.status === 'Pending' && (
                <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelProposal(item.programId, 'program')}>
                    <Text style={styles.cancelButtonText}>Cancel Proposal</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                {['Pending', 'Approved', 'Rejected'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, selectedTab === tab && styles.activeTab]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.programId?.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tab: {
        fontSize: 16,
        color: '#000',
    },
    activeTab: {
        fontWeight: 'bold',
        color: '#710808',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailsContainer: {
        marginVertical: 10,
    },
    infoContainer: {
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        flex: 1,
        textAlign: 'left',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#710808',
        padding: 10,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: '#D9534F',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    errorText: {
        color: '#D9534F',
        textAlign: 'center',
    },
});

export default History;
