import { View, Text, Alert } from "react-native";
import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSVG from "../../assets/apple.svg";
import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";

import * as S from "./styles";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const { signInWithGoogle } = useAuth();
  
  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.log("🚀 ~ file: SignIn.tsx ~ line 20 ~ handleSignInWithGoogle ~ error", error)
      Alert.alert("Erro ao fazer login", "Tente novamente mais tarde");
    }
  }
  
  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />
          <S.Title>
            {"\n"}Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </S.Title>
        </S.TitleWrapper>
        <S.SignInTitle>
          Faça seu login com {"\n"}uma das contas abaixo
        </S.SignInTitle>
      </S.Header>
      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSVG} onPress={handleSignInWithGoogle}/>
          <SignInSocialButton title="Entrar com Apple" svg={AppleSVG} />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
}
