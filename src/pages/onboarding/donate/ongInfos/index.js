import React, { useState } from "react";
import { Alert, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { donations_registrated } from "../../../../../constants/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

import ComeBackButton from "../../../../components/ComeBackButton";
import { Buttons } from "../../initial/styles";
import { Container, Button, Form, InputSection, Label, ButtonText } from "../../login/styles";
import { OngName, InfoField, Bold, Info, BankField, ModalButton, ModalButtonText } from "./styles";

export default function Ong({ navigation, route }) {
  const { ong } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [email, setEmail] = useState(null);
  const [value, setValue] = useState(null);

  function confirmDonationHandle() {
    const form = {
      name: name,
      cpf: cpf,
      email: email,
      value: value,
    };

    let inputIsNull = false;
    Object.keys(form).forEach(elem => {
      const value = form[elem];
      if (value === null) return inputIsNull = true;
    });

    if (inputIsNull) return Alert.alert('Por favor, insira os valores corretamente');

    registrateDonation(form);
  }

  async function registrateDonation(data) {
    try {
      const donations = await AsyncStorage.getItem(donations_registrated);
      const currentData = donations ? JSON.parse(donations) : [];

      const dataFormatted = [
        ...currentData,
        data
      ];

      await AsyncStorage.setItem(donations_registrated, JSON.stringify(dataFormatted));

      return setModalVisible(!modalVisible);
    } catch (e) {
      console.error('DONATION \n', e);
    }
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
              <Text style={{ lineHeight: 22, fontSize: 15 }}>
                Fique tranquilo! Suas informações só serão para a ONG confirmar a doação
              </Text>

              <Form>
                <InputSection>
                  <View>
                    <Label>
                      Nome completo
                    </Label>
                  </View>
                  <TextInput
                    onChangeText={setName}
                    value={name}
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </InputSection>

                <InputSection>
                  <View>
                    <Label>
                      CPF
                    </Label>
                  </View>
                  <TextInput
                    onChangeText={setCpf}
                    value={cpf}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={styles.input}
                  />
                </InputSection>

                <InputSection>
                  <View>
                    <Label>
                      Email
                    </Label>
                  </View>
                  <TextInput
                    onChangeText={setEmail}
                    value={email}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={styles.input}
                  />
                </InputSection>

                <InputSection>
                  <View>
                    <Label>
                      Valor
                    </Label>
                  </View>
                  <TextInput
                    onChangeText={setValue}
                    value={value}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={styles.input}
                  />
                </InputSection>
              </Form>

              <Buttons>
                <ModalButton style={{ marginTop: 30, backgroundColor: '#198754' }}
                  onPress={() => confirmDonationHandle() }
                >
                  <ModalButtonText>Enviar</ModalButtonText>
                </ModalButton>

                <ModalButton style={{ marginTop: 10, backgroundColor: '#FF5959' }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <ModalButtonText>Cancelar</ModalButtonText>
                </ModalButton>
              </Buttons>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <ComeBackButton
          navigation={navigation}
        />

        <View style={{ flex: 1, marginTop: 20 }}>
          <OngName>{ong.name}</OngName>

          <InfoField>
            <Bold>CNPJ</Bold>
            <Info>{ong.cnpj}</Info>
          </InfoField>

          <InfoField>
            <Bold>Email</Bold>
            <Info>{ong.email}</Info>
          </InfoField>

          <View>
            <Bold>{ong.bank}</Bold>
            <BankField>
              <InfoField>
                <Info style={{ marginBottom: 5 }}>Agencia</Info>
                <Info>{ong.agency}</Info>
              </InfoField>
              <InfoField>
                <Info style={{ marginBottom: 5 }}>Conta</Info>
                <Info>{ong.account}</Info>
              </InfoField>
            </BankField>
          </View>
        </View>

        {__renderModal()}

        <Button style={{ marginTop: 20, backgroundColor: '#198754' }}
          onPress={ () => setModalVisible(!modalVisible) }
        >
          <ButtonText>Confirmar doação</ButtonText>
        </Button>

      </Container>

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    padding: 10,
    fontSize: 14,
    borderRadius: 5,
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
