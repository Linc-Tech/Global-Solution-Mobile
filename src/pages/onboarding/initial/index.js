import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import images from '../../../../constants/images';
import { Background, Button, Buttons, ButtonText, Container, Filter, Logo, Subtitle, Title } from './styles';


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
          </Title>
          <Subtitle>
            A sua doação pode ajudar outras famílias
          </Subtitle>
        </View>

        <Buttons>
          <Button style={[styles.button, { backgroundColor: '#198754' }]}
            onPress={ () => navigation.navigate('Donate') }
          >
            <ButtonText>
              DOAR
            </ButtonText>
          </Button>

          <Button style={[styles.button, { marginTop: 10, backgroundColor: '#2b2b2b'}]}
            onPress={ () => navigation.navigate('Login')  }
          >
            <ButtonText>
              ENTRAR
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