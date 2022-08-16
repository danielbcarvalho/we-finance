import { View, Text } from "react-native";
import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSVG from "../../assets/apple.svg";
import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";

import * as S from "./styles";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const data = useAuth();
  console.log("🚀 ~ file: SignIn.tsx ~ line 15 ~ SignIn ~ data", data)
  
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
          <SignInSocialButton title="Entrar com Google" svg={GoogleSVG} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSVG} />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
}
