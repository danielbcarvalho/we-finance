import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

interface IButton extends TouchableOpacityProps {
  title: string;
}

export default function Button({ title, ...rest}: IButton) {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}