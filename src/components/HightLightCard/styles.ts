import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

import styled, { css } from "styled-components/native";

interface ITypes {
  type: "up" | "down" | "total";
}

export const Container = styled.View<ITypes>`
  width: ${RFValue(300)}px;
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};
  border-radius: 7px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather as unknown as typeof Feather)<ITypes>`
  color: ${({ theme }) => theme.colors.success_light};
  font-size: ${RFValue(40)}px;
  ${(props) =>
    props.type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.success_light};
    `}
  ${(props) =>
    props.type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.attention_light};
    `}
  ${(props) =>
    props.type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(32)}px;
`;

export const LastTransaction = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;
