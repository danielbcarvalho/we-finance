import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

import styled from "styled-components/native";

interface ITypes {
  type: "positive" | "negative";
}

export const Container = styled.View`
  width: ${RFValue(300)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 7px;

  padding: 19px 23px;
  margin-right: 16px;
  margin-bottom: 16px;
`;

export const Category = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather as unknown as typeof Feather)<ITypes>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(30)}px;
  padding-right: 10px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Amount = styled.Text<ITypes>`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme, type }) => 
    type === 'positive' ? theme.colors.success : theme.colors.attention};
  font-size: ${RFValue(25)}px;
`;

export const LastTransaction = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;
