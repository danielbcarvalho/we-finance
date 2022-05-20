import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";

import HightLightCard from "../../components/HightLightCard/HightLightCard";
import TransactionCard from "../../components/TransactionCard/TransactionCard";

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

export default function Dashboard() {
  const [transactionList, setTransactionList] = React.useState<ITransaction[]>(
    []
  );
  async function loadData() {
    const dataKey = "@weFinance:transactions";
    // await AsyncStorage.removeItem(dataKey)
    const data = await AsyncStorage.getItem(dataKey);

    const transactions = data ? JSON.parse(data) : [];

    const formatterdTransactions: ITransaction[] = transactions.map(
      (transaction: ITransaction) => {
        const amount = Number(transaction.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(transaction.data));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          date,
          type: transaction.type,
          category: transaction.category,
        };
      }
    );

    setTransactionList(formatterdTransactions);
  }
  React.useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(React.useCallback(() => {
    loadData()
  },[]))

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
          <S.LogoutButton onPress={() => console.log('teste')}>
            <S.Icon name="power" />
          </S.LogoutButton>
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
          data={transactionList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />
      </S.Transactions>
    </S.Container>
  );
}
