import styled from "styled-components";

export const Container = styled.SafeAreaView`
  background: #FFFFFF;
  flex: 1;
`;

export const OngName = styled.Text`
  font-family: 'Helvetica';
  font-size: 22px;
  font-weight: 300;
  margin: 15px 0 30px;
`;

export const InfoField = styled.View`
  margin: 0 0 20px;
`;

export const Bold = styled.Text`
  font-family: 'Helvetica';
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Info = styled.Text`
  font-family: 'Helvetica';
`;

export const BankField = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalButton = styled.TouchableOpacity`
  padding: 12px 0;
  width: 100%;
  align-items: center;
  border-radius: 5px;
`;

export const ModalButtonText = styled.Text`
  font-family: 'Helvetica';
  font-size: 16px;
  font-weight: 500;
  color: white;
`;

