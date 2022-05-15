import React from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import Button from "../../components/Form/Button/Button";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import * as S from "./styles";
import { CategorySelect } from "../CategorySelect";
import { useForm } from "react-hook-form";

interface FormData {
  [name: string]: any;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor númerico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório'),
});

export default function Register() {
  const [transactionType, setTransactionType] = React.useState("");
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
  const [category, setCategory] = React.useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleChangeTransactionType(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
    };
    console.log(
      "🚀 ~ file: Register.tsx ~ line 40 ~ handleRegister ~ form",
      data
    );
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
            onPress={() => handleChangeTransactionType("up")}
            title="Income"
            type="up"
            isActive={transactionType === "up"}
          />
          <TransactionTypeButton
            onPress={() => handleChangeTransactionType("down")}
            title="Outcome"
            type="down"
            isActive={transactionType === "down"}
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
