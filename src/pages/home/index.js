import React, { useCallback, useContext, useEffect, useState } from "react";
import { Modal, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../context";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ModalButtonText } from "../onboarding/donate/ongInfos/styles";
import { Container, DonationModalButton } from "./donations/styles";
import { BtnSignOut, Content, HomeBox, HomeMainTxt, HomeSubtitleTxt, HomeTxtValues, SignOutTxt, Welcome } from "./styles";
import { donations_confirmed, ongs_registrated } from "../../../constants/storage.js";
import { useFocusEffect } from "@react-navigation/core";

export default function Home() {
  const { signOngOut, signedIn } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [donations, setDonations] = useState(0);
  const [collections, setCollections] = useState(0);
  const [name, setName] = useState();

  useFocusEffect(useCallback(() => {
    const fetchOng = async () => {
      const email = await signedIn();
      const ongs = JSON.parse(await AsyncStorage.getItem(ongs_registrated));
      const individualOng = ongs.filter((attr) => {
        if (attr.email === email) {
          return attr;
        }
      });

      setName(individualOng[0].name);

      const donationsConfirmed = JSON.parse(await AsyncStorage.getItem(donations_confirmed));
      const currentConfirmedDonations = donationsConfirmed ? donationsConfirmed : [];

      const thisOngDonations = currentConfirmedDonations.filter(attr => {
        return attr.ongEmail === email;
      });

      if (thisOngDonations.length === 0) return;

      let donations = 0;
      let collections = 0;
      thisOngDonations.map(donation => {
        collections += parseInt(donation.value);
        donations++;
      });

      setCollections(collections);
      setDonations(donations);
    }

    fetchOng();

  }, []));

  function __renderModal() {
    return(
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ lineHeight: 22, fontSize: 15, fontFamily: 'Helvetica' }}>
                Você tem certeza que deseja sair?
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <DonationModalButton style={{ marginTop: 20, backgroundColor: '#198754' }}
                  onPress={() => signOngOut() }
                >
                  <ModalButtonText>Confirmar</ModalButtonText>
                </DonationModalButton>

                <DonationModalButton style={{ marginTop: 20, backgroundColor: '#FF5959' }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <ModalButtonText>Cancelar</ModalButtonText>
                </DonationModalButton>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }


  return(
    <SafeAreaView  style={{ flex: 1, backgroundColor: 'white' }}>
      <Container style={{ marginTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Welcome numberOfLines={1}>Seja bem-vinde, {name}</Welcome>
          <BtnSignOut onPress={ () => setModalVisible(!modalVisible) }>
            <SignOutTxt>Sair</SignOutTxt>
          </BtnSignOut>
        </View>

        <Content>
          <View>
            <HomeBox>
              <View>
                <HomeMainTxt>Qtd</HomeMainTxt>
                <HomeSubtitleTxt>doações</HomeSubtitleTxt>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <HomeTxtValues>{donations}</HomeTxtValues>
              </View>
            </HomeBox>

            <View>
              <HomeBox style={{ marginTop: 60, flexDirection: 'row-reverse' }}>
                <View>
                  <HomeMainTxt>Valores</HomeMainTxt>
                  <HomeSubtitleTxt>arrecadaos</HomeSubtitleTxt>
                </View>
                <></>
              </HomeBox>
              <View style={{ alignItems: 'start' }}>
                {/* <HomeTxtValues>R$ 18.378,32</HomeTxtValues> */}
                <HomeTxtValues>R$ {collections}</HomeTxtValues>
              </View>
            </View>
            {
              modalVisible
              ?
              __renderModal()
              :
              <></>
            }
          </View>
        </Content>
      </Container>

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});