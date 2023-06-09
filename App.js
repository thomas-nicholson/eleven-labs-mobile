import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View } from 'react-native';

import HistoryPage from './HistoryPage'; // make sure the path is correct
import HomePage from './HomePage';
import UserPage from './UserPage';
import useStore from './store';

const Stack = createStackNavigator();
const API_KEY = ''; // Your API key

const App = () => {
  const { setSubscription, setUserInfo } = useStore();

  useEffect(() => {
    // Get subscription info
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ElevenLabs" component={HomePage}
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <Button
                  onPress={() => navigation.navigate('User')}
                  title="User"
                  color="#000"
                />
                <Button
                  onPress={() => navigation.navigate('History')}
                  title="History"
                  color="#000"
                />
              </View>
            )
          })} />
        <Stack.Screen name="History" component={HistoryPage} />
        <Stack.Screen name="User" component={UserPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
