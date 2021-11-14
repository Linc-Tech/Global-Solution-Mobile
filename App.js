import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import StackNavigation from './src/navigation/stack';
import TabNavigation from './src/navigation/tab';

import { AuthContext } from './src/context';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const authContext = useMemo(() => {
    return {
      signedIn: () => {
        setIsSignedIn(true)
      },
      signedOut: () => {
        setIsSignedIn(false)
      }
    }
  })

  return(
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          isSignedIn
          ?
          <TabNavigation />
          :
          <StackNavigation />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

