import CustomView from "@/components/common/CustomView";
import StyledBtn from "@/components/common/StyledBtn";
import StyledInput from "@/components/common/StyledInput";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRegisterStore } from "@/store/userInfo/useLoginStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import * as S from './style';

const SignUp = () => {
  const router = useRouter();
  const [ id, setId ] = useState("");
  const { name : registerName} = useRegisterStore((state) => state);
  const setUserId = useRegisterStore((state) => state.action.setUserId);


  const changeId = (text: string) => {
    setId(text);
  }
  return (
    <CustomView
      onPressLeftIcon={() => {
        router.back();
      }}
      themeType="Bright"
    >
      <ThemedView
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
        type="Bright"
      >
        <View style={{ width: "100%", alignItems: "stretch" , gap:32}}>
          <ThemedText type="Subtitle1">아이디를 입력해주세요</ThemedText>
          <View style={{gap: 20}}>
          <View style={{gap:8}}>
          <ThemedText style={{marginLeft:4}}>아이디</ThemedText>
          <StyledInput
            placeholder="아이디를 입력해주세요"
            style={{ width: "100%" , }}
            value={id}
            onChangeText={changeId}
          />
          </View>
          
          <View style={{gap:8}}>
          <ThemedText style={{marginLeft:4}}>이름</ThemedText>
          <S.Input editable={false} pointerEvents="none">
            {registerName}
          </S.Input>
          </View>
          
          </View>
          
        </View>
        

        <StyledBtn
          label="다음"
          onPress={() => {router.push('/(SignUp)/pwSetting'); setUserId(id);}}
          isActive={id.length > 0}
          style={{
            position: "absolute",
            bottom:0,
            width: "100%",
            alignItems: "center",
            gap: 12,
          }}
        />
      </ThemedView>
    </CustomView>
  );
};

export default SignUp;
