import React from 'react';
import { ThemedText } from '@/components/themed-text';
import * as S from './style';

const Header = () => {
  return (
    <S.Header>
      <ThemedText type="Subtitle1">bustudy</ThemedText>
    </S.Header>
  );
};

export default Header;