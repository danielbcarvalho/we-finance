import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

interface Prop {
  active: boolean;
}

export const Container = styled(TextInput)<Prop>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 7px;
  padding: 19px;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};

  ${({ active, theme }) => active && css`
  border-width: 3px;
  border-color: ${theme.colors.attention};
  `};
`;