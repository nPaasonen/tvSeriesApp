import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ShowScreen from './screens/ShowScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Show" component={ShowScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
