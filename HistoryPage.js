import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assume you're using React Navigation

import useStore from './store';

const HistoryPage = () => {
  const { history } = useStore();
  const navigation = useNavigation(); // Hook for navigation

  const styles = StyleSheet.create({
    appStyles: {
      padding: 20,
      // fontFamily: 'Arial',
      backgroundColor: '#f5f5f5'
    },
    titleStyles: {
      color: '#333',
      marginBottom: 10
    },
    inputStyles: {
      width: '100%',
      height: 100,
      padding: 10
    },
    buttonStyles: {
      padding: 10,
      color: 'white',
      backgroundColor: '#007BFF',
      borderRadius: 5,
      marginTop: 10
    },
    audioPlayerStyles: {
      marginTop: 20
    },
    historyItemStyles: {
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    },
    deleteButtonStyles: {
      color: 'red',
      marginTop: 10
    }
  });

  const deleteHistoryItem = (id) => {
    // Call API endpoint to delete item...
    // Then remove it from local state if deletion was successful
  }

  return (
    <ScrollView style={styles.appStyles}>
      <Text style={styles.titleStyles}>History</Text>
      {history.map(item => (
        <TouchableOpacity key={item.history_item_id} style={styles.historyItemStyles} onPress={() => navigation.navigate('HistoryItem', { item })}>
          <Text>{item.text}</Text>
          <Text>{item.voice_name}</Text>
          <Button onPress={() => getAudioFromHistory(item.history_item_id)} title="Play Audio" color="#007BFF" />
          <Button onPress={() => deleteHistoryItem(item.history_item_id)} title="Delete" color="red" style={styles.deleteButtonStyles} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default HistoryPage;
