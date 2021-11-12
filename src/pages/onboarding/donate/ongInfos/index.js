import React from "react";
import { SafeAreaView, View } from "react-native";
import ComeBackButton from "../../../../components/ComeBackButton";

export default function Ong({ navigation, route }) {
  const { ong } = route.params;

  console.log(ong);

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ComeBackButton
        navigation={navigation}
      />
    </SafeAreaView>
  )
}