import React, { useCallback, useContext, useState } from 'react';
import { FlatList, Modal, StatusBar, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ModalButtonText } from '../../onboarding/donate/ongInfos/styles';
import { Background, Box, BtnText, Button, Buttons, Container, Donation, DonationContainer, DonationModalButton, DonationText, DonationTitle, DonatorInfo, ModalButtons, Title, TitleContainer, Value } from './styles';
import { donations_confirmed, donations_registrated } from '../../../../constants/storage';
import { useFocusEffect } from '@react-navigation/core';
import { AuthContext } from '../../../context';

export default function Donations({ navigation }) {
  const { signedIn } = useContext(AuthContext);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [getDonations, setDonations] = useState([]);
  const [ongId, setOngId] = useState();

  useFocusEffect(useCallback(() => {
    const fetchOngs = async () => {
      const email = await signedIn();
      const donations = JSON.parse(await AsyncStorage.getItem(donations_registrated));
      const currentDonations = donations ? donations : [];

      const ongDonations = currentDonations.filter(attr => {
        if (attr.ongEmail === email) {
          return attr;
        }
      });

      setDonations(ongDonations);
    };

    fetchOngs();
  }, []));

  async function confirmDonationHandle() {
    try {
      const donations = JSON.parse(await AsyncStorage.getItem(donations_registrated));
      const currentDonations = donations ? donations : [];

      if (!currentDonations) return;

      const donationInfo = currentDonations.filter(attr => {
        return attr.id === ongId;
      });

      const donationInfoUpdated = {
        ...donationInfo[0],
        donationConfirmed: true,
      };

      const donationsConfirmed = JSON.parse(await AsyncStorage.getItem(donations_confirmed));
      const currentConfirmedDonations = donationsConfirmed ? donationsConfirmed : [];

      if (!currentConfirmedDonations) return;

      const donationsInfoToSave = [
        ...currentConfirmedDonations,
        donationInfoUpdated
      ];

      await AsyncStorage.setItem(donations_confirmed, JSON.stringify(donationsInfoToSave));


      const ongDonationsUpdated = currentDonations.filter(attr => {
        return attr.id !== ongId;
      });

      await AsyncStorage.setItem(donations_registrated, JSON.stringify(ongDonationsUpdated));

      setConfirmModalVisible(false);
    } catch (e) {
      console.error('DONATIONS', e);
    }
  }

  async function declineDonationHandle() {
    try {
      const donations = JSON.parse(await AsyncStorage.getItem(donations_registrated));
      const currentDonations = donations ? donations : [];

      if (!currentDonations) return;

      const ongDonationsUpdated = currentDonations.filter(attr => {
        return attr.id !== ongId;
      });

      await AsyncStorage.setItem(donations_registrated, JSON.stringify(ongDonationsUpdated));

      setDonations(ongDonationsUpdated);
      setDeclineModalVisible(!declineModalVisible);
      return;
    } catch(e) {
      console.error('DONATIONS', e);
    }

    return setModalVisible(!declineModalVisible);
  }

  function __renderConfirmModal() {
    return(
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ lineHeight: 22, fontSize: 15, fontFamily: 'Helvetica' }}>
                Você tem certeza que deseja confirmar essa ação?
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <DonationModalButton style={{ marginTop: 20, backgroundColor: '#198754' }}
                  onPress={() => confirmDonationHandle() }
                >
                  <ModalButtonText>Confirmar</ModalButtonText>
                </DonationModalButton>

                <DonationModalButton style={{ marginTop: 20, backgroundColor: '#FF5959' }}
                  onPress={() => setConfirmModalVisible(!confirmModalVisible) }
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

  function __renderDeclineModal() {
    return(
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={declineModalVisible}
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
                  onPress={() => setDeclineModalVisible(!declineModalVisible) }
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
            onPress={ () => {
              setOngId(item.id);
              setConfirmModalVisible(!confirmModalVisible);
            }}
          >
            <BtnText>Recebido</BtnText>
          </Button>

          <Button style={{ backgroundColor: '#FF5959' }}
            onPress={ () => {
              setOngId(item.id);
              setDeclineModalVisible(!declineModalVisible);
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
          confirmModalVisible
          ?
          __renderConfirmModal()
          :
          <View></View>
        }
        {
          declineModalVisible
          ?
          __renderDeclineModal()
          :
          <View></View>
        }
        <View style={{ height: '100%' }}>
          {
            getDonations.length !== 0 ?
            (<FlatList
              data={getDonations}
              renderItem={__renderDonation}
              keyExtractor={ item => item.id }
              showsVerticalScrollIndicator={false}
            />)
            :
            (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
              <Text style={{ textAlign: 'center', fontFamily: 'Helvetica', fontSize: 16, color: '#198754', lineHeight: 24 }}>
                Você ainda não recebeu nenhuma confirmação de doação...
              </Text>
            </View>)
          }
        </View>
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
