import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import ComeBackButton from '../../../components/ComeBackButton'
import { Button, ButtonText, Container, CreateAccount, Footer, Form, InputSection, Label, Link, LoginContainer, Subtitle, Title } from "./styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
            <TouchableOpacity>
              <Link>Cadastrar</Link>
            </TouchableOpacity>
          </CreateAccount>

          <View>
            <Button style={{ marginTop: 20, backgroundColor: '#198754' }}>
              <ButtonText>Entrar</ButtonText>
            </Button>
          </View>
        </Footer>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    padding: 14,
    fontSize: 14
  }
})