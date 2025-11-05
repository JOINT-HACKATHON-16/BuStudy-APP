import { Colors } from '@/constants/theme';
import * as S from './style'
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface StyledInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
  secureTextEntry?: boolean;
  error?: boolean; // 에러 여부
  errorMessage?: string; // 에러 메시지
  style?: any;
  onKeyboardShow?: () => void;
  onKeyboardHide?: () => void;
}

const StyledInput = (props: StyledInputProps) => {
  const {
    placeholder,
    value,
    onChangeText,
    keyboardType,
    secureTextEntry = false,
    error,
    errorMessage,
    style,
    onKeyboardShow,
    onKeyboardHide
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [secure, setSecure] = useState(secureTextEntry);

  const handleFocus = () => {
    setIsFocused(true);
    onKeyboardShow?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onKeyboardHide?.();
  };

  return (
    <View>
      <View style={styles.inputWrapper}>
        <S.Input
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor={Colors.light.gray8}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secure}
          style={[
            isFocused && { borderColor: Colors.light.primary },
            error && {
              borderColor: Colors.light.error
            },
            { paddingRight: secureTextEntry ? 40 : 12 }, // 아이콘 공간 확보
            style
          ]}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            style={styles.iconWrapper}
          >
            {secure ? (
              <EyeOff size={20} color={Colors.light.gray6} />
            ) : (
              <Eye size={20} color={Colors.light.gray6} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && <S.ErrorText type='Caption'>{errorMessage}</S.ErrorText>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -10 }],
    
  },
});

export default StyledInput;
