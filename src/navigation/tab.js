import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Home from '../pages/home';
import Settings from '../pages/home/settings';
import Donations from '../pages/home/donations';

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Início':
              iconName = 'home';
              break;
            case 'Doações':
              iconName = 'bell';
              break;
            case 'Configurações':
              iconName = 'settings';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        headerShown: false,
        tabBarActiveTintColor: `#198754`,
        tabBarLabel: ({ focused, color }) => {
          color = focused ? '#198754' : '#E6E6E6'
        },
      })}
    >
      <Tab.Screen name='Início' component={Home} />
      <Tab.Screen name='Doações' component={Donations} />
      <Tab.Screen name='Configurações' component={Settings} />
    </Tab.Navigator>
  );
}