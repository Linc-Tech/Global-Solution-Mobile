import React, { useContext, useState } from "react";
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import ComeBackButton from '../../../components/ComeBackButton'
import { AuthContext } from "../../../context";
import { Button, ButtonText, Container, CreateAccount, Footer, Form, InputSection, Label, Link, LoginContainer, Subtitle, Title } from "./styles";
import { ongs_registrated } from "../../../../constants/storage";

export default function Login({ navigation }) {
  const { signOngIn } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function loginHandle(email, password) {
    if (!email || !password)
      return Alert.alert('Por favor, insira os valores corretamente');

    try {
      const ongs = JSON.parse(await AsyncStorage.getItem(ongs_registrated));
      let invalidLogin = false;

      const individualOng = ongs.filter((attr) => {
        return attr.email == email && attr.password == password;
      });

      if (invalidLogin) return Alert.alert('Dados inválidos');

      signOngIn(individualOng[0]);
    } catch(e) {
      console.error('LOGIN', e);
    }
  }

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <View>
          <ComeBackButton
            navigation={navigation}
          />
        </View>

        <LoginContainer>
          <View>
            <Title>
              Vamos acessar a sua conta.
            </Title>
            <Subtitle>
              Bem-vindo!
            </Subtitle>
          </View>

          <Form>
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
                style={styles.input}
              />
            </InputSection>

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
              />
            </InputSection>


          </Form>
        </LoginContainer>

        <Footer>
          <CreateAccount>
            <Text>
              Ainda não possuo uma conta?
            </Text>
            <TouchableOpacity
              onPress={ () => navigation.navigate('Registration') }
            >
              <Link>Cadastrar</Link>
            </TouchableOpacity>
          </CreateAccount>

          <View>
            <Button style={{ marginTop: 20, backgroundColor: '#198754' }}
              onPress={ () => loginHandle(email, password) }
            >
              <ButtonText>Entrar</ButtonText>
            </Button>
          </View>
        </Footer>
      </Container>

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    padding: 14,
    fontSize: 14,
    borderRadius: 5,
  }
})