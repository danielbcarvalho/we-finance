import React from "react";
import { FlatList, ListRenderItem } from 'react-native'

import HightLightCard from "../../components/HightLightCard/HightLightCard";
import TransactionCard from "../../components/TransactionCard/TransactionCard";

import * as S from "./styles";

export interface ITransaction {
  id: string;
  type: "positive" | "negative",
  amount: string,
  category: {
    name: string,
    icon: string,
  },
  title: string,
  date: string,
}

export default function Dashboard() {
  const data: ITransaction[]= [
    {
      id: '1',
      type: "positive",
      amount: "R$ 500,00",
      category: {
        name: "vendas",
        icon: "dollar-sign",
      },
      title: "Desenvolvimento de site",
      date: "01/01/2022",
    },
    {
      id: '2',
      type: "negative",
      amount: "R$ 123,00",
      category: {
        name: "vendas",
        icon: "coffee",
      },
      title: "Cachaça",
      date: "01/01/2022",
    },
    {
      id: '3',
      type: "positive",
      amount: "R$ 3435,00",
      category: {
        name: "emprego",
        icon: "dollar-sign",
      },
      title: "Salário",
      date: "01/01/2022",
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.Photo
              source={{ uri: "https://github.com/danielbcarvalho.png" }}
            />
            <S.User>
              <S.UserGreeting>Olá,</S.UserGreeting>
              <S.UserName>Daniel</S.UserName>
            </S.User>
          </S.UserInfo>
          <S.Icon name="power" />
        </S.UserWrapper>
      </S.Header>
      <S.HightLightCards>
        <HightLightCard
          type="up"
          title="Entradas"
          amount="R$ 175.500,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HightLightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 04 de abril"
        />
        <HightLightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 a 16 de abril"
        />
      </S.HightLightCards>
      <S.Transactions>
        <S.Title>Listagem</S.Title>
        <FlatList
          data={data}
          keyExtractor={( item ) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30
          }}
        />
      </S.Transactions>
    </S.Container>
  );
}
