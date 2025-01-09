import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Pagination = ({ currentPage, totalPages, onPageChange, onSave }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  


  return (
    <View style={styles.paginationContainer}>
      {currentPage > 1 && (
        <TouchableOpacity
          onPress={() => onPageChange(currentPage - 1)}
          style={styles.previousButton}
        >
          <Text style={styles.previousButtonText}>Previous</Text>
        </TouchableOpacity>
      )}
      <View style={styles.pageNumbersContainer}>
        {pages.map((page) => (
          <TouchableOpacity
            key={page}
            onPress={() => onPageChange(page)}
            style={[styles.pageNumber, currentPage === page && styles.selectedPage]}
          >
            <Text style={[styles.pageText, currentPage === page && styles.selectedPageText]}>{page}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {currentPage < totalPages ? (
        <TouchableOpacity
          onPress={() => onPageChange(currentPage + 1)}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onSave}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Takes up remaining space between Previous and Next buttons
  },
  pageNumber: {
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedPage: {
    backgroundColor: 'red',
  },
  pageText: {
    fontSize: 16,
  },
  selectedPageText: {
    color: '#fff',
  },
  previousButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  previousButtonText: {
    fontSize: 16,
    color: 'red',
  },
  nextButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 16,
    color: 'red',
  },
  saveButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 16,
    color: 'red',
  },
});

export default Pagination;
