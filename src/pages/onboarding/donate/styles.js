import styled from "styled-components";

export const BackgroundContainer = styled.View`
  flex: 0.25;
`;

export const Background = styled.View`
  height: 100%;
  width: 100%;
  background: #198754;
`;

export const ComeBackButtonContainer = styled.View`
  position: absolute;
  height: 100%;
  justify-content: center;
  z-index: 100;
  flex: 1;
  margin: 20px 30px 0;
`;

export const ComeBackButtonCover = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: #EEEEEE;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const ComeBackButtonBackground = styled.Image`
  width: 20px;
  height: 20px;
`;

export const TitleContainer = styled.View`
  margin: 30px 0 0;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const Item = styled.View`
  border: 1px solid #EEEEEE;
  padding: 25px;
  margin-top: 30px;
`;

export const OngName = styled.Text`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const TextField = styled.View``;

export const ItemFooter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: #198754;
  padding: 8px 30px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
`;
