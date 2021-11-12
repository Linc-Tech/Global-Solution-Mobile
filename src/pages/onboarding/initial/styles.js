import styled from 'styled-components/native';

export const Background = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 50;
`;

export const Filter = styled.View`
  background-color: #1b1b1b;
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 60px 30px 15px;
  z-index: 150;
`;

export const Logo = styled.Image`
  width: 80px;
  height: 80px;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  line-height: 50px;
  color: white;
  font-family: 'Helvetica';
`;

export const Buttons = styled.View`
  margin-bottom: 30px;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  padding: 18px 0;
  width: 100%;
  align-items: center;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  font-family: 'Helvetica';
  font-size: 16px;
  font-weight: 500;
  color: white;
`;