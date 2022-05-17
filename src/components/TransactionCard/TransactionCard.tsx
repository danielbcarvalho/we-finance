import React from "react";
import { categories } from "../../utils/categories";

import * as S from "./styles";

interface ITransactionCard {
  data: {
    type: "positive" | "negative";
    date: string;
    name: string;
    amount: string;
    category: string;
  };
}

export default function TransactionCard({ data }: ITransactionCard) {
  const category = categories.filter(item => item.key === data.category)[0]
  return (
    <S.Container>
      <S.Title>{data.name}</S.Title>
      <S.Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={category?.icon} type={category?.key} />
          <S.CategoryName>{category?.name}</S.CategoryName>
        </S.Category>
        <S.Title>{data.date}</S.Title>
      </S.Footer>
    </S.Container>
  );
}
