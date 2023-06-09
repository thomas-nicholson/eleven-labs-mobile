import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useStore from './store';

const UserPage = () => {
  const { subscription, userInfo } = useStore();

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
