import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

import styled from "styled-components/native";
import { TextInput } from "react-native";



export const Container = styled(TextInput)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 7px;
  padding: 19px;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.regular}
`;