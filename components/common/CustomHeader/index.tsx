import { useThemeColor } from '@/hooks/use-theme-color';
import * as S from './style';
import React from 'react';
import { Pressable } from 'react-native';
import { ThemedText } from '../../themed-text';
import { Colors } from '@/constants/theme';

interface CustomHeader {
  title?:string;
  onPressLeftIcon:()=>void;
  isShowRightIcon?:boolean;
  style?:any;
  contentColor? : string;
}

const CustomHeader = (props:CustomHeader) => {
  const {title, onPressLeftIcon, isShowRightIcon,  style, contentColor} = props;

  const color = useThemeColor({light:Colors.light.gray6, dark:Colors.dark.gray6},'text');

  return (
    <S.Layout style={style}>
      <S.TitleContainer>
        <Pressable 
          style={[{width: 24, height: 24}]} 
          onPress={onPressLeftIcon}
        >
          <ThemedText type="Subtitle1" style={{color:contentColor ?? color}}>{'<'}</ThemedText>
        </Pressable>
          <ThemedText type="Body1" style={{color:contentColor ?? color}}>{title}</ThemedText>
      </S.TitleContainer>

      
    </S.Layout>
  )
}

export default CustomHeader