import React from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import uuid from 'react-native-uuid'

import Button from "../../components/Form/Button/Button";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import * as S from "./styles";
import { CategorySelect } from "../CategorySelect";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = {
  navigate:(screen:string) => void;
}

interface FormData {
  [name: string]: any;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export default function Register() {
  const [transactionType, setTransactionType] = React.useState("");
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
  const [category, setCategory] = React.useState({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation<NavigationProps>()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function resetData() {
    reset()
    setCategory({
      key: "category",
      name: "Categoria",
    })

    setTransactionType('')
  }

  function handleChangeTransactionType(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister (form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const data = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      data: new Date()
    };

    try {
      const dataKey = '@weFinance:transactions'
      const storage = await AsyncStorage.getItem(dataKey)
      const currentData = storage ? JSON.parse(storage) : []
      const formmatedData = [
        ...currentData,
        data,
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(formmatedData))

      Alert.alert("Transação salva com sucesso");
      resetData()
      navigation.navigate('Listagem')
    } catch (error) {
      Alert.alert("Não foi possível salvar os dados");
    }
  }  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>
        <S.Form>
          <InputForm
            autoCapitalize="sentences"
            autoCorrect={false}
            name="name"
            placeholder="Nome"
            control={control}
            error={errors.name && errors.name.message}
          />
          <InputForm
            name="amount"
            placeholder="Preço"
            control={control}
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
          />

          <S.TransactionTypesWrapper>
            <TransactionTypeButton
              onPress={() => handleChangeTransactionType("positive")}
              title="Income"
              type="up"
              isActive={transactionType === "positive"}
            />
            <TransactionTypeButton
              onPress={() => handleChangeTransactionType("negative")}
              title="Outcome"
              type="down"
              isActive={transactionType === "negative"}
            />
          </S.TransactionTypesWrapper>
          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </S.Form>
        <Button title="enviar" onPress={handleSubmit(handleRegister)} />
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
