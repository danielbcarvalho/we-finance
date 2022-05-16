import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import * as S from "./styles";

export interface IButton extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress, ...rest }: IButton) {
  return (
    <S.Container onPress={onPress} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
