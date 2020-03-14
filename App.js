import React from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './src/HomeScreen';
import TripsScreen from './src/Trips';
import TripScreen from './src/TripScreen';
import AddTripScreen from './src/AddTripScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddTrip">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Trips"
          component={TripsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Trip"
          component={TripScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddTrip"
          component={AddTripScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
