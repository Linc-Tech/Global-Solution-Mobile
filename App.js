import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Initial from './src/pages/onboarding/initial';
import Login from './src/pages/onboarding/login';
import Registration from './src/pages/onboarding/registration';
import Donate from './src/pages/onboarding/donate';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName='Initial'
        >
          <Stack.Screen name='Initial' component={Initial} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Registration' component={Registration} />
          <Stack.Screen name='Donate' component={Donate} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

