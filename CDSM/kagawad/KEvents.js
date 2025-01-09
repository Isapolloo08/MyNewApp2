import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const KEvent = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await fetch('http://brgyapp.lesterintheclouds.com/kevents.php');
            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setItems(data);
            }
        } catch (error) {
            setError('Error fetching programs');
        } finally {
            setLoading(false);
        }
    };

    const handlePress = (programId) => {
        if (programId) {
            navigation.navigate('SeeDetails', { programId });
        } else {
            console.error('Program ID is missing');
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: getBackgroundColorForType(item.programType) }]}>
            <View style={styles.dateContainer}>
                <Text style={styles.eventTypeText}>{item.programType}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name:</Text>
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
                    <Text style={styles.seeDetails}>See Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const getBackgroundColorForType = (type) => {
        switch (type) {
            case 'Event':
                return '#E0E7FF'; // Light Blue for Event
            case 'Activity':
                return '#F4EAEA'; // Light Red for Activity
            case 'Meeting':
                return '#FFF9E5'; // Light Yellow for Meeting
            default:
                return '#FFFFFF'; // White for default
        }
    };

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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Approved Programs</Text>
            </View>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.programId.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
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
    listContainer: {
        padding: 16,
    },
    card: {
        borderRadius: 10,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        backgroundColor: '#FFFFFF',
    },
    dateContainer: {
        paddingVertical: 10,
    },
    eventTypeText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000000',
    },
    detailsContainer: {
        paddingTop: 10,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 8,
    },
    value: {
        fontSize: 14,
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
        color: 'red',
        fontSize: 16,
    },
});

export default KEvent;
