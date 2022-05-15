import React from "react";

import * as S from "./styles";

interface ICategory {
  name: string;
  icon: string;
}

interface ITransactionCard {
  data: {
    type: "positive" | "negative";
    date: string;
    title: string;
    amount: string;
    category: ICategory;
  };
}

export default function TransactionCard({ data }: ITransactionCard) {
  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      <S.Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={data.category.icon} type={data.category} />
          <S.CategoryName>{data.category.name}</S.CategoryName>
        </S.Category>
        <S.Title>{data.date}</S.Title>
      </S.Footer>
    </S.Container>
  );
}
