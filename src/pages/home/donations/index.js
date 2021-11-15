import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, Modal, StatusBar, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ModalButtonText } from '../../onboarding/donate/ongInfos/styles';
import { Background, Box, BtnText, Button, Buttons, Container, Donation, DonationContainer, DonationModalButton, DonationText, DonationTitle, DonatorInfo, ModalButtons, Title, TitleContainer, Value } from './styles';
import { donations_registrated } from '../../../../constants/storage';
import { useFocusEffect } from '@react-navigation/core';
import { AuthContext } from '../../../context';
import { EMAIL } from '../../../../App';

export default function Donations({ navigation }) {
  const { signedIn } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [getDonations, setDonations] = useState([]);
  const [ongId, setOngId] = useState();

  console.log(getDonations);

  // useFocusEffect(useCallback(() => {
  //   const { email } = signedIn();

  //   const fetchOngs = async () => {
  //     const donations = JSON.parse(await AsyncStorage.getItem(donations_registrated));
  //     const currentDonations = donations ? donations : [];

  //     const ongDonations = currentDonations.filter(attr => {
  //       if (attr.ongEmail === email) {
  //         return attr;
  //       }
  //     });

  //     setDonations(ongDonations);
  //   };

  //   fetchOngs();
  // }, [navigation]));

  useEffect(() => {

    const fetchOngs = async () => {
      const donations = JSON.parse(await AsyncStorage.getItem(donations_registrated));
      const currentDonations = donations ? donations : [];

      const ongDonations = currentDonations.filter(attr => {
        console.log("CHAMEI1111", attr, EMAIL);
        if (attr.ongEmail === EMAIL) {
          return attr;
        }
      });

      console.log("CHAMEI222", ongDonations);

      setDonations(ongDonations);
    };

    fetchOngs();
    console.log("CHAMEI", getDonations);
  }, [navigation])

  async function declineDonationHandle() {
    try {
      const donations = JSON.parse(await AsyncStorage.getItem(donations_registrated));
      const currentDonations = donations ? donations : [];

      if (!currentDonations) return;

      const ongDonationsUpdated = currentDonations.filter(attr => {
        return attr.id !== ongId;
      });

      await AsyncStorage.setItem(donations_registrated, JSON.stringify(ongDonationsUpdated));
      setModalVisible(!modalVisible);
    } catch(e) {
      console.error('DONATIONS', e);
    }

    return setModalVisible(!modalVisible);
  }

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
                Você tem certeza que deseja confirmar essa ação?
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <DonationModalButton style={{ marginTop: 20, backgroundColor: '#198754' }}
                  onPress={() => declineDonationHandle() }
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

  function __renderDonation({ item }) {
    return(
      <DonationContainer>
        <Donation>
          <DonatorInfo>
            <Box>
              <DonationTitle>Doador</DonationTitle>
              <DonationText>{item.name}</DonationText>
            </Box>

            <Box>
              <DonationTitle>CPF</DonationTitle>
              <DonationText>{item.cpf}</DonationText>
            </Box>

            <Box>
              <DonationTitle>Email</DonationTitle>
              <DonationText>{item.email}</DonationText>
            </Box>
          </DonatorInfo>

          <Value>
            <Box>
              <DonationTitle style={{ textAlign: 'center' }}>Valor</DonationTitle>
              <DonationText>R$ {item.value}</DonationText>
            </Box>
          </Value>
        </Donation>

        <Buttons>
          <Button style={{ backgroundColor: '#198754' }}
            onPress={ () => setModalVisible(!modalVisible) }
          >
            <BtnText>Recebido</BtnText>
          </Button>

          <Button style={{ backgroundColor: '#FF5959' }}
            onPress={ () => {
              setOngId(item.id);
              setModalVisible(!modalVisible);
            }}
          >
            <BtnText>Declinar</BtnText>
          </Button>
        </Buttons>
      </DonationContainer>
    )
  }

  return(
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1.2 }}>
        <Background />
      </View>

      <TitleContainer>
        <Title>
          Doações
        </Title>
      </TitleContainer>

      <Container>
        {
          modalVisible
          ?
          __renderModal()
          :
          <></>
        }
        <FlatList
            data={getDonations}
            renderItem={__renderDonation}
            keyExtractor={ item => item.id }
            showsVerticalScrollIndicator={false}
          />
      </Container>

      <StatusBar barStyle="light-content" />
    </View>
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
