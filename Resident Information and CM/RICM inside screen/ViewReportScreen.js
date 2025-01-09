import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useReportContext } from './ReportContext'; // Adjust the import path as needed

const ViewReportScreen = ({ route }) => {
  const { report } = route.params;
  const { reportData } = useReportContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Report: {report}</Text>
      <View style={styles.reportBox}>
        <Text style={[styles.reportTitle, { fontFamily: reportData[report].font, fontSize: reportData[report].fontSize, fontStyle: reportData[report].fontStyle }]}>{report}</Text>
        <Text style={{ fontFamily: reportData[report].font, fontSize: reportData[report].fontSize, fontStyle: reportData[report].fontStyle }}>
          {reportData[report].content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportBox: {
    backgroundColor: 'lightyellow',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ViewReportScreen;
