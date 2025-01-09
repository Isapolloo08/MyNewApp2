import * as MediaLibrary from 'expo-media-library';
import * as Print from 'expo-print';
import React from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ConfirmationScreen = ({ route, navigation }) => {
    const { name, address, docType, purpose, dateOfClaim, timeClaim } = route.params;

    const handlePrintAndNavigate = async () => {
        const htmlContent = `
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        h2 { color: #333; }
                        p { margin: 10px 0; }
                        .container { width: 100%; max-width: 300px; margin: 0 auto; padding: 20px; }
                        .box { padding: 8px; background-color: lightgray; border: 1px solid lightgray; border-radius: 10px; margin-bottom: 15px; }
                        .row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid black; padding-bottom: 10px; }
                        .label { font-weight: bold; margin-right: 10px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Document Request Confirmation</h2>
                        <div class="box">
                            <div class="row">
                                <div class="label">Name:</div>
                                <div>${name}</div>
                            </div>
                            <div class="row">
                                <div class="label">Address:</div>
                                <div>${address}</div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="row">
                                <div class="label">Document Type:</div>
                                <div>${docType}</div>
                            </div>
                            <div class="row">
                                <div class="label">Purpose:</div>
                                <div>${purpose}</div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="row">
                                <div class="label">Date of Claim:</div>
                                <div>${dateOfClaim}</div>
                            </div>
                            <div class="row">
                                <div class="label">Time Claim:</div>
                                <div>${timeClaim}</div>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `;

        try {
            const { uri } = await Print.printToFileAsync({ 
                html: htmlContent, 
                width: 3.5 * 72,   // 8.5 inches converted to points (1 inch = 72 points)
                height: 5.00 * 72, // 4.25 inches converted to points
            });

            if (Platform.OS === 'ios') {
                await MediaLibrary.saveToLibraryAsync(uri);
                Alert.alert('Confirmation', 'Confirmation PDF downloaded successfully!');
            } else {
                const permission = await MediaLibrary.requestPermissionsAsync();
                if (permission.status === 'granted') {
                    await MediaLibrary.saveToLibraryAsync(uri);
                    Alert.alert('Confirmation', 'Confirmation PDF downloaded successfully!');
                } else {
                    throw new Error('Permission to save PDF not granted');
                }
            }

            // After printing and saving the PDF, navigate to ListOfRequestDocx
            navigation.navigate('ListOfRequestDocx', {
                requests: [
                    { name, address, docType, purpose, date: dateOfClaim, status: 'pending', timeClaim },
                ],
            });

        } catch (error) {
            console.error('Error printing PDF:', error);
            Alert.alert('Error', 'Failed to download PDF. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.box1}>
                    <View style={styles.box}>
                        <View style={styles.row}>
                            <Text style={styles.label}>NAME :</Text>
                            <Text>{name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>ADDRESS :</Text>
                            <Text>{address}</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.row}>
                            <Text style={styles.label}>DOCUMENT TYPE :</Text>
                            <Text>{docType}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>PURPOSE :</Text>
                            <Text>{purpose}</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.row}>
                            <Text style={styles.label}>DATE OF CLAIM :</Text>
                            <Text>{dateOfClaim}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>TIME :</Text>
                            <Text>{timeClaim}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.finishButton} onPress={handlePrintAndNavigate}>
                    <Text style={styles.buttonText}>Download PDF Confirmation</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F3F7',
        paddingHorizontal: 20,
    },
    content: {
        width: '100%',
        maxWidth: 600,
    },
    box1: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    box: {
        backgroundColor: '#DBDBDB',
        borderWidth: 1,
        borderColor: '#9B9B9B',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 4,
    },
    finishButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default ConfirmationScreen;
