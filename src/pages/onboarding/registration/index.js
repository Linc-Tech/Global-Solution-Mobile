import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from "react-native";

import ComeBackButton from "../../../components/ComeBackButton";
import { Button, ButtonText, Footer, Form, InputSection, Label, Subtitle, Title } from "../login/styles";
import { Container, RegistrationContainer } from "./styles";

export default function Registration({ navigation }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [cnpj, setCnpj] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [siteLink, setSiteLink] = useState();
  const [text, setText] = useState();
  const [bank, setBank] = useState();
  const [agency, setAgency] = useState();
  const [account, setAccount] = useState();

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <View>
          <ComeBackButton
            navigation={navigation}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <RegistrationContainer>
            <View>
              <Title>
                Vamos cadastrar a sua ONG.
              </Title>
              <Subtitle>
                Obrigado pela escolha!
              </Subtitle>
            </View>

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
                  placeholder="DoaFácil"
                />
              </InputSection>

              {/* Email */}
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
                  placeholder="doa_facil@gmail.com"
                />
              </InputSection>


              {/* CNPJ */}
              <InputSection>
                <View>
                  <Label>
                    CNPJ
                  </Label>
                </View>
                <TextInput
                  onChangeText={setCnpj}
                  value={cnpj}
                  autoCapitalize="none"
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
                  placeholder="◦◦◦◦◦◦◦◦◦◦◦◦"
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
                  placeholder="◦◦◦◦◦◦◦◦◦◦◦◦"
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
                  placeholder="http://www.ongdoafacil.com"
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
                  placeholder="
                    A ONG DoaFácil é conhecida por distribuir alimentos de forma gratuita
                    para pessoas carentes e em situações de vulnerabilidade
                  "
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
                  placeholder="Banco Bradesco"
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
                  onChangeText={setAgency}
                  value={agency}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="0000"
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
                  onChangeText={setAccount}
                  value={account}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="00000-0"
                />
              </InputSection>
            </Form>
          </RegistrationContainer>

          <Footer>
            <Button style={{ marginTop: 20, backgroundColor: '#198754' }}
              onPress={ () => navigation.navigate('Login') }
            >
              <ButtonText>Cadastrar ONG</ButtonText>
            </Button>
          </Footer>

        </ScrollView>
      </Container>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    padding: 14,
    fontSize: 14,
    borderRadius: 5,
  }
})