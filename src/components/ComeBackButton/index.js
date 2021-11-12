import React from 'react';
import icons from '../../../constants/icons';
import { Container, Background, Cover } from './styles';

const ComeBackButton = ({ navigation }) => {
  return (
    <Container opacity={0.5}>
      <Cover
        style={{ transform: [{ rotate: "180deg" }] }}
        onPress={() => navigation.goBack() }
      >
        <Background
          source={icons.arrow}
        />
      </Cover>
    </Container>
  );
};

export default ComeBackButton;
