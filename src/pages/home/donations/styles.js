import styled from "styled-components";

export const Background = styled.View`
  height: 100%;
  width: 100%;
  background: #198754;
`;

export const TitleContainer = styled.View`
  margin: 20px 0;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  font-family: 'Helvetica';
  margin: 30px 0 20px;
`;

export const Container = styled.SafeAreaView`
  flex: 5;
  margin: 15px 30px 15px;
`;

export const DonationContainer = styled.View`
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #EEE;
  margin-bottom: 20px;
`;

export const Donation = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 22px;
  padding-bottom: 32px;
`;

export const DonatorInfo = styled.View`

`;

export const Box = styled.View`
`;

export const DonationTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Helvetica';
  margin: 10px 0 5px;
`;

export const DonationText = styled.Text`
  font-family: 'Helvetica';
  margin-bottom: 5px;
`;

export const Value = styled.View`
  justify-content: center;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = styled.TouchableOpacity`
  margin-left: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 30px;
`;

export const BtnText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Helvetica';
  color: #fff;
`;

export const DonationModalButton = styled.TouchableOpacity`
  padding: 10px 10px;
  border-radius: 5px;
`;
