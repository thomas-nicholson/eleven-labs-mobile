import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View } from'react-native';


import HistoryPage from './HistoryPage'; // make sure the path is correct
import HomePage from './HomePage';

const Stack = createStackNavigator();

const App = () => {
  // App code, but remove the history rendering part

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ElevenLabs" component={HomePage} options={{
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Button
              onPress={() => alert('This is a button!')}
              title="User"
              color="#000"
            />
              <Button
              onPress={() => alert('This is a button!')}
              title="History"
              color="#000"
            />
            </View>
            )}} />
        <Stack.Screen name="History" component={HistoryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
