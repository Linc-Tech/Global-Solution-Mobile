import React, { useState } from 'react';
import { FlatList, Modal, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ModalButton, ModalButtonText } from '../../onboarding/donate/ongInfos/styles';
import { Background, Box, BtnText, Button, Buttons, Container, Donation, DonationContainer, DonationModalButton, DonationText, DonationTitle, DonatorInfo, ModalButtons, Title, TitleContainer, Value } from './styles';

export default function Donations({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const arr = [
    {
      id: 1,
      donator: 'Gabriel Lucas Alves da Silva',
      cpf: '503.481.888-46',
      email: 'gabriel@gmail.com',
      value: 4000,
    },
    {
      id: 2,
      donator: 'Gabriel Lucas Alves da Silva',
      cpf: '503.481.888-46',
      email: 'gabriel@gmail.com',
      value: 4000,
    },
    {
      id: 3,
      donator: 'Gabriel Lucas Alves da Silva',
      cpf: '503.481.888-46',
      email: 'gabriel@gmail.com',
      value: 4000,
    },
    {
      id: 4,
      donator: 'Gabriel Lucas Alves da Silva',
      cpf: '503.481.888-46',
      email: 'gabriel@gmail.com',
      value: 4000,
    },
  ];

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
                  onPress={() => setModalVisible(!modalVisible) }
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
              <DonationText>{item.donator}</DonationText>
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
            onPress={ () => setModalVisible(!modalVisible) }
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
            Escolhe uma ONG
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
            data={arr}
            renderItem={__renderDonation}
            keyExtractor={ item => item.id }
            showsVerticalScrollIndicator={false}
          />
      </Container>

      <StatusBar barStyle="dark-content" />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    padding: 10,
    fontSize: 14
  },
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
