import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HistoryPage from './HistoryPage'; // make sure the path is correct
import HomePage from './HomePage';

const Stack = createStackNavigator();

const App = () => {
  // App code, but remove the history rendering part

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="History" component={HistoryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
