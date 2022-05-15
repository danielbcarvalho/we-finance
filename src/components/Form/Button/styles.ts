import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
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