import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SApprovedProgram = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await fetch('http://brgyapp.lesterintheclouds.com/kevents.php');
            const data = await response.json();

            if (!Array.isArray(data)) {
                console.error('Expected an array but got:', data);
                setItems([]);
                return;
            }

            const approvedPrograms = data.filter(program => program.status && program.status.trim().toLowerCase() === 'approved');
            setItems(approvedPrograms);
        } catch (error) {
            console.error('Error fetching programs:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        try {
            const parts = dateString.split(', ');
            if (parts.length < 2) {
                throw new Error('Invalid date format');
            }
            return parts[1];
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    const handlePress = (programId) => {
        if (programId) {
            // Navigate to Pending screen with the programId
            navigation.navigate('SeeDetails', { programId });
        } else {
            console.error('Program ID is missing');
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: getBackgroundColorForType(item.programType) }]}>
            <View style={styles.dateContainer}>
                <Text style={styles.eventTypeText}>{item.programType}</Text>
                <View style={[styles.dateBox, { backgroundColor: getColorForType(item.programType) }]}>
                    <Text style={styles.dateText}>{formatDate(item.startDate)}</Text>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <View style={styles.infoRow}>
                 
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>{item.programType} Name:</Text>
                    <Text style={styles.value}>{item.programName}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Location:</Text>
                    <Text style={styles.value}>{item.location}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Proposed By:</Text>
                    <Text style={styles.value}>{item.proposedBy}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Committee:</Text>
                    <Text style={styles.value}>{item.committee}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Budget:</Text>
                    <Text style={styles.value}>{item.budget}</Text>
                </View>
                <TouchableOpacity onPress={() => handlePress(item.programId)}>
                    <Text style={styles.seeDetails}>See details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const getBackgroundColorForType = (type) => {
        switch (type) {
            case 'Event':
                return '#E0E7FF'; // Light Blue for Event container
            case 'Activity':
                return '#F4EAEA'; // Light Red for Activity container
            case 'Meeting':
                return '#FFF9E5'; // Light Yellow for Meeting container
            default:
                return '#FFFFFF'; // White for default
        }
    };

    const getColorForType = (type) => {
        switch (type) {
            case 'Event':
                return '#0C08C1'; // Blue for Event
            case 'Activity':
                return '#710808'; // Dark Red for Activity
            case 'Meeting':
                return '#FFC700'; // Yellow for Meeting
            default:
                return '#000000'; // Black for default
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>All Programs</Text>
               
            </View>
            <View style={styles.innerContainer}>
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()} // Fallback key
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
    innerContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 16,
        borderRadius: 10,
        padding: 5,
    },
    historyButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        padding: 10,
        elevation: 4,
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
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        padding: 5,
        width: '100%',
    },
    dateContainer: {
        width: 100,
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
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 5,
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
    timeContainer: {
        alignSelf: 'flex-end',
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
    timeText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000000',
    },
    seeDetails: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#0000FF',
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SApprovedProgram;