import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { v4 as uuid } from 'uuid';
import StackNavigation from './src/navigation/stack';
import TabNavigation from './src/navigation/tab';
import { AuthContext } from './src/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ong_login } from './constants/storage';

export default function App() {
  const initialLoginState = {
    userName: null,
    userToken: null,
  };

  async function storageEmail(email) {
    try {
      await AsyncStorage.setItem('email', email);
    } catch (e) {
      console.error(e);
    }
  }

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIVIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
        };

      case 'LOGIN':
        storageEmail(action.id);

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
    signOngIn: async (foundUser) => {
      try {
        const userToken = uuid();
        const id = foundUser.email;
        await AsyncStorage.setItem(ong_login, userToken);

        return dispatch({ type: 'LOGIN', id: id, token: userToken });
      } catch(e) {
        console.error('LOGIN AUTH CONTEXT', e);
      }
    },
    signOngOut: async () => {
      try {
        await AsyncStorage.removeItem(ong_login);
        return dispatch({ type: 'LOGOUT' });
      } catch(e) {
        console.error(e);
      }
    },
    signedIn: async () => {
      try {
        return await AsyncStorage.getItem('email');
      } catch(e) {
        console.error(e);
      }
    },
  }), []);

  useEffect(async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem(ong_login);
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

