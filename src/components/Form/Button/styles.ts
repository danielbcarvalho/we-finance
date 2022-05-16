import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { IButton } from "./Button";

export const Container = styled(RectButton)<IButton>`
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 7px;
  padding: 19px;
  font-family: ${({ theme }) => theme.fonts.regular};
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 14px;
`;