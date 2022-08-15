import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { HistoryCard } from "../../components/HistoryCard";

import * as S from "./styles";
import { categories } from "../../utils/categories";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [totalByCategopries, setTotalByCategories] = React.useState<
    ICategoryData[]
  >([]);

  function handleDateChange(action: 'increase' | 'decrease') {
    if(action === 'increase') {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    const dataKey = "@weFinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const formattedResponse = response ? JSON.parse(response) : [];

    const expensives = formattedResponse.filter(
      (expensive: ITransaction) => 
        expensive.type === "negative" &&
        new Date(expensive.data).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.data).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: ITransaction) => {
        return accumulator + Number(expensive.amount);
      },
      0
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

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>

      <S.Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <S.MonthSelect>
          <S.MonthSelectButton onPress={() => handleDateChange('decrease')}>
            <S.MonthSelectIcon name="chevron-left"/>
          </S.MonthSelectButton>

          <S.Month>
            {format(selectedDate, "MMMM yyyy", {locale: ptBR})}
          </S.Month>

          <S.MonthSelectButton onPress={() => handleDateChange('increase')}>
            <S.MonthSelectIcon name="chevron-right"/>
          </S.MonthSelectButton>
        </S.MonthSelect>
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
