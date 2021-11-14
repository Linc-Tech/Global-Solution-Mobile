import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';

export default function Settings({ navigation }) {
  return(
    <SafeAreaView  style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  )
}