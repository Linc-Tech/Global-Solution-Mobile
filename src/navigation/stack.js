import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Initial from '../pages/onboarding/initial';
import Login from '../pages/onboarding/login';
import Registration from '../pages/onboarding/registration';
import Donate from '../pages/onboarding/donate';
import Ong from '../pages/onboarding/donate/ongInfos';

export default function StackNavigation() {
  const Stack = createNativeStackNavigator();

  return(
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
      <Stack.Screen name='Ong' component={Ong} />
    </Stack.Navigator>
  )
}