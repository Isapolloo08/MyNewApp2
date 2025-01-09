import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const ListOfRequestDocx = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { requests } = route.params; // Use the requests passed from the route

    const [filter, setFilter] = useState('all');

    const filterRequests = () => {
        if (filter === 'all') {
            return requests;
        }
        return requests.filter(request => request.status === filter);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending':
                return styles.pending;
            case 'unclaimed':
                return styles.unclaimed;
            case 'claimed':
                return styles.claimed;
            case 'printing':
                return styles.printing;
            case 'payment':
                return styles.payment;
            default:
                return {};
        }
    };

    const getIconName = (status) => {
        switch (status) {
            case 'pending':
                return 'hourglass-empty';
            case 'unclaimed':
                return 'cancel';
            case 'claimed':
                return 'check-circle';
            case 'printing':
                return 'print';
            case 'payment':
                return 'payment';
            default:
                return 'info';
        }
    };

    const getIconColor = (status) => {
        switch (status) {
            case 'pending':
                return '#FFBF00'; // Slightly darker yellow
            case 'unclaimed':
                return '#FF0000'; // Slightly darker red
            case 'claimed':
                return '#228C22'; // Slightly darker green
            case 'printing':
                return '#3EB0F7'; // Slightly darker blue
            case 'payment':
                return '#F26302'; // Slightly darker orange
            default:
                return '#000000'; // Default icon color
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.filterContainer}
                style={styles.scrollView}
            >
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                    onPress={() => setFilter('all')}
                >
                    <Text style={[styles.filterButtonText, filter === 'all' && styles.activeFilterText]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
                    onPress={() => setFilter('pending')}
                >
                    <Text style={[styles.filterButtonText, filter === 'pending' && styles.activeFilterText]}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'printing' && styles.activeFilter]}
                    onPress={() => setFilter('printing')}
                >
                    <Text style={[styles.filterButtonText, filter === 'printing' && styles.activeFilterText]}>Printing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'payment' && styles.activeFilter]}
                    onPress={() => setFilter('payment')}
                >
                    <Text style={[styles.filterButtonText, filter === 'payment' && styles.activeFilterText]}>Payment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'claimed' && styles.activeFilter]}
                    onPress={() => setFilter('claimed')}
                >
                    <Text style={[styles.filterButtonText, filter === 'claimed' && styles.activeFilterText]}>Claimed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'unclaimed' && styles.activeFilter]}
                    onPress={() => setFilter('unclaimed')}
                >
                    <Text style={[styles.filterButtonText, filter === 'unclaimed' && styles.activeFilterText]}>Unclaimed</Text>
                </TouchableOpacity>
            </ScrollView>
            <FlatList
                data={filterRequests()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.requestItem, getStatusStyle(item.status)]}>
                        <View style={styles.requestInfo}>
                            <Text>Name: {item.name}</Text>
                            <Text>Document Type: {item.docType}</Text>
                            <Text>Date: {item.date}</Text>
                            <Text>Status: {item.status}</Text>
                        </View>
                        <Icon name={getIconName(item.status)} size={50} color={getIconColor(item.status)} style={styles.icon} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flexGrow: 0,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginRight: 8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    activeFilter: {
        backgroundColor: '#4CAF50',
    },
    filterButtonText: {
        color: '#000000',
        fontSize: 14,
    },
    activeFilterText: {
        color: '#FFFFFF',
    },
    requestItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    requestInfo: {
        flex: 1,
    },
    icon: {
        marginLeft: 8,
    },
    pending: {
        backgroundColor: '#FFF388',
    },
    unclaimed: {
        backgroundColor: '#FFCCCB',
    },
    claimed: {
        backgroundColor: '#90EE90',
    },
    printing: {
        backgroundColor: '#ADD8E6',
    },
    payment: {
        backgroundColor: '#FFDAB9',
    },
});

export default ListOfRequestDocx;
