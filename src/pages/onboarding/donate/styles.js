import styled from "styled-components";

export const Background = styled.View`
  height: 150px;
  width: 100%;
  position: absolute;
  background: #198754;
`;

export const Title = styled.Text`
  margin: 80px 0 30px;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
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
