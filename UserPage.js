import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const API_KEY = '8a8ca1298db8e97112bda505bd0dd32e'; // Your API key

const UserPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(() => {
    // Get subscription info
    // ... fetch logic
    fetch('https://api.elevenlabs.io/v1/user/subscription', {
      headers: {
        'Xi-Api-Key': API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setSubscription(data);
      });

    // Get user info
    // ... fetch logic
    fetch('https://api.elevenlabs.io/v1/user', {
      headers: {
        'Xi-Api-Key': API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
      });
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <Text style={styles.titleStyles}>Subscription</Text>
      {subscription && (
        <View style={styles.historyItemStyles}>
          <Text>Tier: {subscription.tier}</Text>
          <Text>Character Limit: {subscription.character_limit}</Text>
          <Text>Voice Limit: {subscription.voice_limit}</Text>
        </View>
      )}
      {userInfo && (
        <View style={styles.historyItemStyles}>
          <Text style={styles.titleStyles}>User</Text>
          <Text>Email: {userInfo.email}</Text>
          <Text>Is New User: {userInfo.is_new_user}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UserPage;
