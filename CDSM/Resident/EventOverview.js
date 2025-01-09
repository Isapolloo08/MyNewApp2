import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function EventOverview({ route, navigation }) {
  const { event, residentId } = route.params;

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubmissionStatus = async () => {
      try {
        const response = await axios.get(
          `https://brgyapp.lesterintheclouds.com/api/check_submission_status.php?programId=${event.id}&residentId=${residentId}`
        );
        if (response.data.success) {
          setHasSubmitted(response.data.hasSubmitted);
        } else {
          Alert.alert('Error', response.data.message || 'Failed to check submission status.');
        }
      } catch (error) {
        console.error('Error checking submission status:', error);
        Alert.alert('Error', 'Unable to check submission status. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    checkSubmissionStatus();
  }, [event.id, residentId]);

  const handleApply = () => {
    Alert.alert(
      'Apply Confirmation',
      `Are you sure you want to apply for "${event.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Apply',
          onPress: () => {
            navigation.navigate('SubmitRequirements', {
              requirements: event.requirements || [],
              programId: event.id,
              residentId,
            });
          },
        },
      ]
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{event.title || 'No Title Provided'}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x150' }}
          style={styles.image}
        />
      </View>
      <Text style={styles.description}>
        {event.description ||
          `Join us for ${event.title?.toLowerCase()} to build a better community and connect with others.`}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>WHEN:</Text> {event.startFormatted?.fullDate || 'Date Unavailable'}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>WHERE:</Text> {event.location || 'No Location Provided'}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>WHO’S ELIGIBLE:</Text> {event.participant || 'No Participants Specified'}
      </Text>

      {event.status?.toLowerCase() === 'open' && (
        <TouchableOpacity
          style={[styles.applyButton, hasSubmitted && styles.disabledButton]}
          onPress={handleApply}
          disabled={hasSubmitted}
        >
          <Text style={styles.applyButtonText}>
            {hasSubmitted ? 'Already Submitted' : 'Apply'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7B0A0A',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'justify',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#7B0A0A',
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: '#7B0A0A',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
});