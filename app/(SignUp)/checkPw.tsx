import React, { useState } from "react";
import { ThemedView } from "@/components/themed-view";
import CustomView from "@/components/common/CustomView";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { Alert, View } from "react-native";
import StyledBtn from "@/components/common/StyledBtn";
import StyledInput from "@/components/common/StyledInput";
import { useRegisterStore } from "@/store/userInfo/useLoginStore";
import { Colors } from "@/constants/theme";
import { useSignUp } from "@/hooks/auth/useSignUp";
import * as S from "./style";

const SignUp = () => {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const {
    name: registerName,
    userId,
    password,
  } = useRegisterStore((state) => state);
  
  const { mutate: signUp, isPending } = useSignUp();

  const changePw = (text: string) => {
    setPw(text);
  };

  const handleSignUp = () => {
    signUp(
      {
        loginId: userId,
        passwordCheck: pw,
        password: password,
        name: registerName,
      },
      {
        onSuccess: () => {
          Alert.alert("가입 완료", "회원가입이 완료되었습니다!");
          router.push("/(Login)");
        },
        onError: (error) => {
          Alert.alert("가입 실패", "회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      }
    );
  };

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
        <View style={{ width: "100%", alignItems: "stretch", gap: 32 }}>
          <View style={{ gap: 8 }}>
            <ThemedText type="Subtitle1">비밀번호를 입력해주세요</ThemedText>
            <ThemedText type="Body2" style={{ color: Colors.light.gray7 }}>
              {" "}
              비밀번호는 8자 이상, 특수문자를 포함해 주세요
            </ThemedText>
          </View>

          <View style={{ gap: 20 }}>
            <View style={{ gap: 8 }}>
              <ThemedText style={{ marginLeft: 4 }}>비밀번호 확인</ThemedText>
              <StyledInput
                placeholder="비밀번호를 입력해주세요"
                style={{ width: "100%" }}
                value={pw}
                onChangeText={changePw}
                secureTextEntry
                error={pw.length > 0 && pw !== password}
                errorMessage="비밀번호가 일치하지 않습니다."
              />
            </View>
            <View style={{ gap: 8 }}>
              <ThemedText style={{ marginLeft: 4 }}>비밀번호</ThemedText>
              <S.Input editable={false} pointerEvents="none" secureTextEntry>
                {password}
              </S.Input>
            </View>

            <View style={{ gap: 8 }}>
              <ThemedText style={{ marginLeft: 4 }}>아이디</ThemedText>
              <S.Input editable={false} pointerEvents="none">
                {userId}
              </S.Input>
            </View>

            <View style={{ gap: 8 }}>
              <ThemedText style={{ marginLeft: 4 }}>이름</ThemedText>
              <S.Input editable={false} pointerEvents="none">
                {registerName}
              </S.Input>
            </View>
          </View>
        </View>

        <StyledBtn
          label={isPending ? "가입 중..." : "가입 완료"}
          onPress={handleSignUp}
          isActive={pw.length >= 8 && pw === password && !isPending}
          style={{
            position: "absolute",
            bottom: 0,
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