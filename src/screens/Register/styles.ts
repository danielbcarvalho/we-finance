import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from "@expo/vector-icons";

import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: ${getStatusBarHeight()}px;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(16)}px;
`;

export const Form = styled.View`
  padding: 24px;
  flex: 1;
`;

export const TransactionTypesWrapper = styled.View`
  flex-direction: row;
  margin: 10px 0 20px 0;
  justify-content: space-around;
`;

