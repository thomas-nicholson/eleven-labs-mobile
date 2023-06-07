import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const HistoryPage = ({ route }) => {
  const { history } = route.params;

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
  });

  return (
    <ScrollView style={styles.appStyles}>
      <Text style={styles.titleStyles}>History</Text>
      {history.map(item => (
        <View key={item.history_item_id} style={styles.historyItemStyles}>
          <Text>{item.text}</Text>
          <Text>{item.voice_name}</Text>
          <Button onPress={() => getAudioFromHistory(item.history_item_id)} title="Play Audio" color="#007BFF" />
        </View>
      ))}
    </ScrollView>
  );
}

export default HistoryPage;
