import React, { useCallback, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container } from "../login/styles";
import { Background, BackgroundContainer, Button, ButtonText, ComeBackButtonBackground, ComeBackButtonContainer, ComeBackButtonCover, Header, Item, ItemFooter, OngName, TextField, Title, TitleContainer } from "./styles";
import { donations_confirmed, ongs_registrated } from "../../../../constants/storage";
import { useFocusEffect } from "@react-navigation/core";
import icons from "../../../../constants/icons";

export default function Donate({ navigation }) {
  const [ongs, setOngs] = useState([]);
  const [donationsQuantify, setDonationsQuantify] = useState(0);

  useFocusEffect(useCallback(() => {
    const fetchOngs = async () => {
      const ongs = await AsyncStorage.getItem(ongs_registrated);
      setOngs(JSON.parse(ongs));
    };

    fetchOngs();
  }, []));

  function __renderItem({ item }) {
    return(
      <Item>
        <TextField>
          <OngName>
            {item.name}
          </OngName>
          <Text
            numberOfLines={8}
          >
            {item.text}
          </Text>
        </TextField>
        <ItemFooter>
          <Button
            onPress={ () => navigation.navigate('Ong', { ong: item }) }
          >
            <ButtonText>Doar</ButtonText>
          </Button>
        </ItemFooter>
      </Item>
    )
  }

  const __renderComeBackButton = () => {
    return(
      <ComeBackButtonContainer opacity={0.5}>
        <ComeBackButtonCover
          style={{ transform: [{ rotate: "180deg" }] }}
          onPress={() => navigation.goBack() }
        >
          <ComeBackButtonBackground
            source={icons.arrow}
          />
        </ComeBackButtonCover>
      </ComeBackButtonContainer>
    );
  }

  return(
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <BackgroundContainer>
        {__renderComeBackButton()}
        <Background />
      </BackgroundContainer>

      <TitleContainer>
        <Title>
          Selecione a ONG que deseja doar
        </Title>
      </TitleContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <View style={{ flex: 1 }}>
            {
              ongs.length !== 0 ?
              <FlatList
                data={ongs}
                renderItem={__renderItem}
                keyExtractor={ item => item.cnpj }
                showsVerticalScrollIndicator={false}
              />
              :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', lineHeight: 24, fontFamily: 'Helvetica', fontSize: 16, color: '#198754'}}>
                  Ainda não possuímos ONGs cadastradas para você doar...
                </Text>
              </View>
            }
          </View>

        </Container>
      </SafeAreaView>
    </View>
  );
}