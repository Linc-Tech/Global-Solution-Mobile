import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { v4 as uuid } from 'uuid';
import StackNavigation from './src/navigation/stack';
import TabNavigation from './src/navigation/tab';
import { AuthContext } from './src/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const initialLoginState = {
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIVIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
        };

      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
        };

      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
        };

      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
        }
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signedIn: async (username, password) => {
      let userToken = null;

      if (username == 'galusilva' && password == '123') {
        try {
          userToken = uuid();
          await AsyncStorage.setItem('user-token', userToken);
          return dispatch({ type: 'LOGIN', id: username, token: userToken });
        } catch(e) {
          console.error(e);
        }
      }
    },
    signedOut: async () => {
      try {
        await AsyncStorage.removeItem('user-token');
        return dispatch({ type: 'LOGOUT' });
      } catch(e) {
        console.error(e);
      }
    }
  }), []);

  useEffect(async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem('user-token');
    } catch(e) {
      console.error(e);
    }
    dispatch({ type: 'REGISTER', token: userToken });
  }, []);

  return(
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          loginState.userToken !== null ? (<TabNavigation />) : (<StackNavigation />)
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

