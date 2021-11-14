import React from 'react';
import { FlatList, SafeAreaView, StatusBar, View } from 'react-native';
import { Background, Box, Container, Donation, DonationText, DonationTitle, DonatorInfo, Title, TitleContainer, Value } from './styles';

export default function Donations({ navigation }) {
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
  ]

  function __renderDonation({ item }) {
    return(
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