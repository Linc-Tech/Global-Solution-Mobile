import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import images from '../../../../constants/images';
import { Background, Button, Buttons, ButtonText, Container, Filter, Logo, Title } from './styles';


export default function Initial({ navigation }) {

  return(
    <View style={{ flex: 1 }}>
      <Background source={images.initialImage} />
      <Filter opacity={0.3}/>

      <Container>
        <View style={{ alignItems: 'flex-end' }}>
          <Logo source={images.logo}/>
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Title numberOfLines={8}>
            Faça o bem também e doe de coração!
            A sua doação pode ajudar outras famílias a colocarem
            comida na mesa.
          </Title>
        </View>

        <Buttons>
          <Button style={[styles.button, { backgroundColor: '#198754'}]}>
            <ButtonText>
              QUERO RECEBER
            </ButtonText>
          </Button>

          <Button style={[styles.button, { backgroundColor: '#2b2b2b' }]}>
            <ButtonText>
              QUERO DOAR
            </ButtonText>
          </Button>
        </Buttons>

      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
  },

  button: {
    marginTop: 20,
  }
})