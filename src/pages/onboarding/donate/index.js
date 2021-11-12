import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import ComeBackButton from "../../../components/ComeBackButton";
import { Container } from "../login/styles";
import { Background, Button, ButtonText, Item, ItemFooter, OngName, TextField, Title } from "./styles";

export default function Donate({ navigation }) {
  const arr = [
    {
      id: 1,
      title: 'DoaFácil',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et velit in libero vulputate ultrices nec non dolor. Sed fringilla magna varius est volutpat, sit amet aliquam tortor ornare. Duis dictum rhoncus purus vel tempus. Etiam varius est sed massa maximus vehicula. Nunc vestibulum id turpis non eleifend.',
      donationsQuantify: 200,
    },
    {
      id: 2,
      title: 'DoaFácil',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et velit in libero vulputate ultrices nec non dolor. Sed fringilla magna varius est volutpat, sit amet aliquam tortor ornare. Duis dictum rhoncus purus vel tempus. Etiam varius est sed massa maximus vehicula. Nunc vestibulum id turpis non eleifend.',
      donationsQuantify: 200,
    },
    {
      id: 3,
      title: 'DoaFácil',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et velit in libero vulputate ultrices nec non dolor. Sed fringilla magna varius est volutpat, sit amet aliquam tortor ornare. Duis dictum rhoncus purus vel tempus. Etiam varius est sed massa maximus vehicula. Nunc vestibulum id turpis non eleifend.',
      donationsQuantify: 200,
    }
  ];


  function __renderScreenHeader() {
    return(
      <View>
        <ComeBackButton
          navigation={navigation}
        />

        <View>
          <Title>
            Escolhe uma ONG
          </Title>
        </View>
      </View>
    )
  }

  function __renderItem({ item }) {
    return(
      <Item>
        <TextField>
          <OngName>
            {item.title}
          </OngName>
          <Text
            numberOfLines={8}
          >
            {item.text}
          </Text>
        </TextField>
        <ItemFooter>
          <Button>
            <ButtonText>Doar</ButtonText>
          </Button>

          <Text>+ {item.donationsQuantify} doações</Text>
        </ItemFooter>
      </Item>
    )
  }

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Background />
      <Container>
        {__renderScreenHeader()}

        <View style={{ flex: 1 }}>
          <FlatList
            data={arr}
            renderItem={__renderItem}
            keyExtractor={ item => item.id }
            // ListHeaderComponent={__renderScreenHeader}
            showsVerticalScrollIndicator={false}
          />
        </View>

      </Container>
    </SafeAreaView>
  );
}