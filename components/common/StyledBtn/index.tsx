import { Colors } from '@/constants/theme';
import * as S from './style'
import React, { useState } from 'react';

interface StyledBtn {
  label: string; // 버튼에 표시할 텍스트
  isActive: boolean; // 활성화 여부
  onPress: () => void; // 버튼 클릭 시 실행할 함수
  style?:any;
  textStyle?:any;
}

const StyledBtn = (props:StyledBtn) => {
  const { label, isActive, onPress, style, textStyle } = props;
  const [ isPressed, setIsPressed ] = useState(false);


  const handleBtn = () => {
    if (isActive) onPress();
  };

  return (
    <S.Btn
      onPress={handleBtn}

      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        !isActive && { backgroundColor: Colors.light.primary20, },
        isPressed && { backgroundColor: Colors.light.gray2 },
        style
      ]}
    >
      <S.BtnText style={[
        !isActive && { color: Colors.light.gray6 },
        textStyle
      ]}>
        {label}
      </S.BtnText>
    </S.Btn>
  );
}

export default StyledBtn