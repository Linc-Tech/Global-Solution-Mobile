import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useContext, useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../../../context';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ModalButtonText } from '../../onboarding/donate/ongInfos/styles';
import { Button, ButtonText, Form, InputSection, Label } from '../../onboarding/login/styles';
import { Container, Footer, RegistrationContainer } from '../../onboarding/registration/styles';
import { DonationModalButton, Title } from '../donations/styles';
import { donations_confirmed, donations_registrated, ongs_registrated } from '../../../../constants/storage';

export default function Settings({ navigation }) {
  const { signedIn, signOngOut } = useContext(AuthContext);
  const [name, setName] = useState("DoeFácil");
  const [email, setEmail] = useState("ong@gmail.com");
  const [cnpj, setCnpj] = useState("57.847.883/0001-97");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [siteLink, setSiteLink] = useState("http://www.ongdoafacil.com");
  const [text, setText] = useState("A ONG DoaFácil é conhecida por distribuir alimentos de forma gratuita para pessoas carentes e em situações de vulnerabilidade");
  const [bank, setBank] = useState("Banco Bradesco");
  const [agency, setAgency] = useState("0000");
  const [account, setAccount] = useState("00000-0");
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [ongId, setOngId] = useState();

  useFocusEffect(useCallback(() => {
    const fetchOngs = async () => {
      const email = await signedIn();
      const ongs = JSON.parse(await AsyncStorage.getItem(ongs_registrated));
      const individualOng = ongs.filter((attr) => {
        if (attr.email === email) {
          return attr;
        }
      });

      setName(individualOng[0].name);
      setEmail(individualOng[0].email);
      setCnpj(individualOng[0].cnpj);
      setSiteLink(individualOng[0].siteLink);
      setText(individualOng[0].text);
      setBank(individualOng[0].bank);
      setAgency(individualOng[0].agency);
      setAccount(individualOng[0].account);
      setOngId(individualOng[0].id);
    };

    fetchOngs();
  }, []));

  function inputHandle(value, input) {
    if (input === 'agency') {
      if (!!parseInt(value) || parseInt(value) === 0) {
        return setAgency(value);
      } else {
        return setAgency('');
      }

    } else if (input === 'account') {
      if (!!parseInt(value) || parseInt(value) === 0) {
        setAccount(value);
      } else {
        return setAccount('');
      }
    }
  }

  async function updateOngDataHandle() {
    const form = {
      name: name,
      email: email,
      cnpj: cnpj,
      password: password,
      confirmPassword: confirmPassword,
      siteLink: siteLink,
      text: text,
      bank: bank,
      agency: agency,
      account: account,
    };

    let inputIsNull = false;
    Object.keys(form).forEach(elem => {
      const value = form[elem];
      if (!value) return inputIsNull = true;
    });

    if (inputIsNull) {
      setUpdateModalVisible(!updateModalVisible);
      return Alert.alert('Por favor, insira os valores corretamente');
    }

    if (form.password !== form.confirmPassword)
      return  Alert.alert('As senhas estão diferentes');

    await updateOng(form);
  }

  async function updateOng(ong) {
    try {
      const ongs = JSON.parse(await AsyncStorage.getItem(ongs_registrated));
      const currentOngs = ongs ? ongs : [];

      if (!currentOngs) return;

      const ongInfo = currentOngs.filter(attr => {
        return attr.id === ongId;
      });

      const ongInfoUpdated = {
        ...ongInfo[0],
        ...ong
      };

      const currentOngsUpdated = currentOngs.filter(attr => {
        return attr.id !== ongId;
      });

      const ongUpdated = [
        ...currentOngsUpdated,
        ongInfoUpdated
      ];

      await AsyncStorage.setItem(ongs_registrated, JSON.stringify(ongUpdated));
      setUpdateModalVisible(!updateModalVisible);
      navigation.navigate('Início');
    } catch (e) {
      console.error('SETTINGS', e);
    }
  }

  async function deleteAccountHandle() {
    try {
      // Delete Ong
      const ongs = JSON.parse(await AsyncStorage.getItem(ongs_registrated));
      const currentOngs = ongs ? ongs : [];

      if (!currentOngs) return;

      const ongsUpdated = currentOngs.filter(attr => {
        return attr.id !== ongId;
      });

      await AsyncStorage.setItem(ongs_registrated, JSON.stringify(ongsUpdated));

      // Delete Ong's Donations
      const donations = JSON.parse(await AsyncStorage.getItem(donations_registrated));
      const currentDonations = donations ? donations : [];

      if (!currentDonations) return;

      const ongDonationsUpdated = currentDonations.filter(attr => {
        return attr.ongEmail !== email;
      });

      await AsyncStorage.setItem(donations_registrated, JSON.stringify(ongDonationsUpdated));

      // Delete Ong's Confirmed Donations
      const donationsConfirmed = JSON.parse(await AsyncStorage.getItem(donations_confirmed));
      const currentConfirmedDonations = donationsConfirmed ? donationsConfirmed : [];

      const thisOngDonations = currentConfirmedDonations.filter(attr => {
        return attr.ongEmail !== email;
      });

      if (!thisOngDonations) return;

      await AsyncStorage.setItem(donations_confirmed, JSON.stringify(thisOngDonations));

      signOngOut();
    } catch(e) {
      console.error('SETTINGS', e);
    }
  }

  function __renderUpdateModal() {
    return(
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={updateModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ lineHeight: 22, fontSize: 15 }}>
                Você tem certeza que deseja confirmar essa ação?
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <DonationModalButton style={{ marginTop: 20, backgroundColor: '#198754' }}
                  onPress={() => updateOngDataHandle() }
                >
                  <ModalButtonText>Confirmar</ModalButtonText>
                </DonationModalButton>

                <DonationModalButton style={{ marginTop: 20, backgroundColor: '#FF5959' }}
                  onPress={() => setUpdateModalVisible(!updateModalVisible)}
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

  function __renderDeleteModal() {
    return(
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ lineHeight: 22, fontSize: 15 }}>
                Você tem certeza que deseja confirmar essa ação?
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <DonationModalButton style={{ marginTop: 20, backgroundColor: '#198754' }}
                  onPress={() => deleteAccountHandle() }
                >
                  <ModalButtonText>Confirmar</ModalButtonText>
                </DonationModalButton>

                <DonationModalButton style={{ marginTop: 20, backgroundColor: '#FF5959' }}
                  onPress={() => setDeleteModalVisible(!deleteModalVisible)}
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

  function __renderForm() {
    return(
      <Form>
        {/* Ong name */}
        <InputSection>
          <View>
            <Label>
              Nome da ONG
            </Label>
          </View>
          <TextInput
            onChangeText={setName}
            value={name}
            autoCapitalize="none"
            style={styles.input}
            placeholder={name}
          />
        </InputSection>

        {/* Email */}
        <InputSection>
          <View>
            <Label>
              Email
            </Label>
          </View>
          <View pointerEvents="none">
            <TextInput
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              style={styles.input}
              placeholder={email}
            />
          </View>
        </InputSection>


        {/* CNPJ */}
        <InputSection>
          <View>
            <Label>
              CNPJ
            </Label>
          </View>
          <TextInputMask
            type={'cnpj'}
            value={cnpj}
            onChangeText={setCnpj}
            style={styles.input}
            placeholder="57.847.883/0001-97"
          />
        </InputSection>


        {/* Password */}
        <InputSection>
          <View>
            <Label>
              Senha
            </Label>
          </View>
          <TextInput
            onChangeText={setPassword}
            value={password}
            autoCapitalize="none"
            secureTextEntry={true}
            style={styles.input}
            placeholder={password}
          />
        </InputSection>


        {/* Confirm password */}
        <InputSection>
          <View>
            <Label>
              Confirme a sua senha
            </Label>
          </View>
          <TextInput
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            autoCapitalize="none"
            secureTextEntry={true}
            style={styles.input}
            placeholder={confirmPassword}
          />
        </InputSection>


        {/* Site link */}
        <InputSection>
          <View>
            <Label>
              Link do site da ONG
            </Label>
          </View>
          <TextInput
            onChangeText={setSiteLink}
            value={siteLink}
            autoCapitalize="none"
            style={styles.input}
            placeholder={siteLink}
          />
        </InputSection>


        {/* Ong text */}
        <InputSection>
          <View>
            <Label>
              Texto de apresentação da ONG
            </Label>
          </View>
          <TextInput
            onChangeText={setText}
            value={text}
            autoCapitalize="none"
            style={[styles.input, { lineHeight: 24 }]}
            multiline = {true}
            numberOfLines = {6}
            placeholder={text}
          />
        </InputSection>


        {/* Banks */}
        <InputSection>
          <View>
            <Label>
              Banco
            </Label>
          </View>
          <TextInput
            onChangeText={setBank}
            value={bank}
            autoCapitalize="none"
            style={styles.input}
            placeholder={bank}
          />
        </InputSection>


        {/* Agency */}
        <InputSection>
          <View>
            <Label>
              Agência
            </Label>
          </View>
          <TextInput
            onChangeText={value => inputHandle(value, 'agency')}
            value={agency}
            autoCapitalize="none"
            style={styles.input}
            placeholder="0000"
            maxLength={4}
          />
        </InputSection>


        {/* Account */}
        <InputSection>
          <View>
            <Label>
              Conta
            </Label>
          </View>
          <TextInput
            onChangeText={value => inputHandle(value, 'account')}
            value={account}
            autoCapitalize="none"
            style={styles.input}
            placeholder="0000000-0"
            maxLength={9}
          />
        </InputSection>
      </Form>
    );
  }


  return(
    <SafeAreaView  style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 20 }}>
        <Title>
          Configurações
        </Title>
      </View>

      <Container style={{ marginTop: 10, marginBottom: 0 }}>
        {
          updateModalVisible
          ?
          __renderUpdateModal()
          :
          <></>
        }
        {
          deleteModalVisible
          ?
          __renderDeleteModal()
          :
          <></>
        }
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <RegistrationContainer style={{ marginTop: 0 }}>
            {__renderForm()}

          </RegistrationContainer>

          <Footer style={{ marginBottom: 10 }}>
            <Button style={{ marginTop: 20, backgroundColor: '#198754' }}
              onPress={ () => setUpdateModalVisible(!updateModalVisible) }
            >
              <ButtonText>Atualizar dados</ButtonText>
            </Button>

            <Button style={{ marginTop: 10, backgroundColor: '#FF5959' }}
              onPress={ () => setDeleteModalVisible(!deleteModalVisible) }
            >
              <ButtonText>Deletar conta</ButtonText>
            </Button>
          </Footer>

        </ScrollView>
      </Container>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    padding: 14,
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
})