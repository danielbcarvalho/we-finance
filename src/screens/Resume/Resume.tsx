import React from "react";
import { HistoryCard } from "../../components/HistoryCard";

import * as S from "./styles";

export interface ITransaction {
  id: string;
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  title: string;
  data: string;
}

export default function Resume() {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>
      <HistoryCard 
        title="Resumo"
        amount="R$ 20,00"
        color="red"
      />
    </S.Container>
  );
}
