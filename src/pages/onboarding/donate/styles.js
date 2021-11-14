import styled from "styled-components";

export const Background = styled.View`
  height: 20%;
  width: 100%;
  position: absolute;
  background: #198754;
`;

export const Header = styled.View`
  height: 22%;
`;

export const TitleContainer = styled.View`
  flex: 1;
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
  justify-content: space-between;
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
