import CustomView from "@/components/common/CustomView";
import StyledBtn from "@/components/common/StyledBtn";
import StyledInput from "@/components/common/StyledInput";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useRegisterStore } from "@/store/userInfo/useLoginStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import * as S from "./style";

const SignUp = () => {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const {
    name: registerName,
    userId,
    password,
  } = useRegisterStore((state) => state);
  const setPassword = useRegisterStore((state) => state.action.setPassword);

  const changePw = (text: string) => {
    setPw(text);
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
              <ThemedText style={{ marginLeft: 4 }}>비밀번호</ThemedText>
              <StyledInput
                placeholder="비밀번호를 입력해주세요"
                style={{ width: "100%" }}
                value={pw}
                onChangeText={changePw}
                secureTextEntry
                error={
                  pw.length > 0 &&
                  (pw.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(pw))
                }
                errorMessage={
                  pw.length < 8
                    ? "비밀번호는 8자 이상이어야 합니다."
                    : "특수문자를 포함해야 합니다."
                }
              />
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
          label="다음"
          onPress={() => {
            router.push("/(SignUp)/checkPw");
            setPassword(pw);
          }}
          isActive={pw.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(pw)}
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
