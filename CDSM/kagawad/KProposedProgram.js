import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const KProposedProgram = () => {
    const navigation = useNavigation();
    const [pendingPrograms, setPendingPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingPrograms = async () => {
            try {
                const response = await fetch('http://brgyapp.lesterintheclouds.com/kproposedprogram.php');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Check data structure
                setPendingPrograms(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingPrograms();
    }, []);

    const getBackgroundColorForType = (type) => {
        switch (type) {
            case 'Event':
                return '#E0E7FF'; // Light Blue
            case 'Activity':
                return '#F4EAEA'; // Light Red
            case 'Meeting':
                return '#FFF9E5'; // Light Yellow
            default:
                return '#FFFFFF'; // White
        }
    };

    const getColorForType = (type) => {
        switch (type) {
            case 'Event':
                return '#0C08C1'; // Blue
            case 'Activity':
                return '#710808'; // Dark Red
            case 'Meeting':
                return '#FFC700'; // Yellow
            default:
                return '#000000'; // Black
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return 'Date Not Available'; // Handle undefined or null values
        }
        const parts = dateString.split(', ');
        if (parts.length < 2) {
            return 'Invalid Date'; // Handle improperly formatted dates
        }
        return parts[1];
    };

    const renderItem = ({ item }) => {
        const startDate = item.startDate ? formatDate(item.startDate) : 'Date Not Available';

        return (
            <View style={[styles.card, { backgroundColor: getBackgroundColorForType(item.programType) }]}>
                <View style={styles.dateContainer}>
                    <Text style={styles.eventTypeText}>{item.programType}</Text>
                    <View style={[styles.dateBox, { backgroundColor: getColorForType(item.programType) }]}>
                        <Text style={styles.dateText}>{startDate}</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
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
                        <Text style={styles.value}>{item.budget !== null ? item.budget : 'N/A'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Pending', { programId: item.programId })}>
                        <Text style={styles.seeDetails}>See details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#710808" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Pending Programs</Text>
                <TouchableOpacity
                    style={styles.historyButton}
                    onPress={() => navigation.navigate('History')}
                >
                    <Ionicons name="time-outline" size={24} color="#710808" />
                </TouchableOpacity>
            </View>
            <View style={styles.innerContainer}>
                <FlatList
                    data={pendingPrograms}
                    renderItem={renderItem}
                    keyExtractor={item => item.programId.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#710808',
    },
    historyButton: {
        padding: 8,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 16,
        borderRadius: 10,
        padding: 5,
    },
    listContainer: {
        padding: 16,
    },
    card: {
        borderRadius: 10,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        padding: 5,
        width: '100%',
    },
    dateContainer: {
        width: 65,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    eventTypeText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000000',
        marginBottom: 5,
        textAlign: 'center',
    },
    dateBox: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    dateText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    detailsContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingVertical: 0,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 8,
    },
    value: {
        fontSize: 12,
        flex: 1,
    },
    seeDetails: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#0000FF',
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
    },
    errorText: {
        color: '#FF0000',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default KProposedProgram;
