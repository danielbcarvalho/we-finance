import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";

import { HistoryCard } from "../../components/HistoryCard";

import * as S from "./styles";
import { categories } from "../../utils/categories";
import { useFocusEffect } from "@react-navigation/native";

export interface ITransaction {
  id: string;
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  title: string;
  data: string;
}

interface ICategoryData {
  name: string;
  total: string;
  totalRaw: number;
  color: string;
  percent: string;
}

export default function Resume() {
  const [totalByCategopries, setTotalByCategories] = React.useState<
    ICategoryData[]
  >([]);

  async function loadData() {
    const dataKey = "@weFinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const formattedResponse = response ? JSON.parse(response) : [];

    const expensives = formattedResponse.filter(
      (expensive: ITransaction) => expensive.type === "negative"
    );

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: ITransaction) => {
        return accumulator + Number(expensive.amount);
      },
      0
    );
    console.log(
      "🚀 ~ file: Resume.tsx ~ line 47 ~ loadData ~ expensivesTotal",
      expensivesTotal
    );

    const totalByCategory: ICategoryData[] = [];
    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expense: ITransaction) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )} %`;

        totalByCategory.push({
          name: category.name,
          color: category.color,
          totalRaw: categorySum,
          total,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  React.useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>

      <S.Content>
        <S.ChartContainer>
          <VictoryPie
            data={totalByCategopries}
            x="percent"
            y="totalRaw"
            colorScale={totalByCategopries.map((category) => category.color)}
            style={{ 
              labels: {
                fontSize: 20,
                fontWeight: "bold",
              },
            }}
            labelRadius={110}
          />
        </S.ChartContainer>
        {totalByCategopries.map((category) => (
          <HistoryCard
            key={category.name}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </S.Content>
    </S.Container>
  );
}
