import React from "react";
import { ScroolHorizontalText } from "../../global/componentsStyled";

import * as S from "./styles";

interface IHightLightCard {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "up" | "down" | "total";
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export default function HightLightCard({
  type,
  title,
  amount,
  lastTransaction,
}: IHightLightCard) {
  return (
    <S.Container type={type}>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.Icon name={icon[type]} type={type} />
      </S.Header>

      <S.Footer>
        <ScroolHorizontalText >
          <S.Amount>{amount}</S.Amount>
        </ScroolHorizontalText>
        <S.LastTransaction>{lastTransaction}</S.LastTransaction>
      </S.Footer>
    </S.Container>
  );
}
