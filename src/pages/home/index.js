import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";

export default function Home({ navigation }) {
  return(
    <SafeAreaView  style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>Home</Text>

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  )
}