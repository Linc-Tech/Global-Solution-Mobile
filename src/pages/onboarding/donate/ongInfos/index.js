import React, { useState } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import ComeBackButton from "../../../../components/ComeBackButton";
import { Buttons } from "../../initial/styles";
import { Container, Button, Form, InputSection, Label, ButtonText } from "../../login/styles";
import { OngName, InfoField, Bold, Info, BankField, ModalButton, ModalButtonText } from "./styles";

export default function Ong({ navigation, route }) {
  const { ong } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log(ong);

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
                    onChangeText={setEmail}
                    value={email}
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
                    onChangeText={setPassword}
                    value={password}
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
                    onChangeText={setPassword}
                    value={password}
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
                    onChangeText={setPassword}
                    value={password}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={styles.input}
                  />
                </InputSection>
              </Form>

              <Buttons>
                <ModalButton style={{ marginTop: 20, backgroundColor: '#198754' }}
                  onPress={() => setModalVisible(!modalVisible) }
                >
                  <ModalButtonText>Enviar</ModalButtonText>
                </ModalButton>

                <ModalButton style={{ marginTop: 20, backgroundColor: '#FF5959' }}
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
          <OngName>{ong.title}</OngName>

          <InfoField>
            <Bold>CNPJ</Bold>
            <Info>{ong.cnpj}</Info>
          </InfoField>

          <InfoField>
            <Bold>Email</Bold>
            <Info>{ong.email}</Info>
          </InfoField>

          <View>
            <Bold>Banco Bradesco</Bold>
            <BankField>
              <InfoField>
                <Info style={{ marginBottom: 5 }}>Agencia</Info>
                <Info>{ong.bank.agency}</Info>
              </InfoField>
              <InfoField>
                <Info style={{ marginBottom: 5 }}>Conta</Info>
                <Info>{ong.bank.account}</Info>
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
    </SafeAreaView>
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
