import CustomView from "@/components/common/CustomView";
import StyledBtn from "@/components/common/StyledBtn";
import StyledInput from "@/components/common/StyledInput";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import * as S from "./style";
import { useLogin } from "@/hooks/auth/useLogin";

const Login = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // TODO: 실제 로그인 API 호출
    if (userId && password) {
      // 임시 로그인 처리
      console.log("Login:", userId, password);
      // 성공 시 메인 화면으로 이동
      router.push("/(tabBar)");
    } else {
      Alert.alert("알림", "아이디와 비밀번호를 입력해주세요.");
    }
  };
  const { mutate: login } = useLogin();

  const handleSignUp = () => {
    router.push("/(SignUp)");
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
          <ThemedText type="Subtitle1">로그인</ThemedText>
          
          <View style={{ gap: 20 }}>
            <View style={{ gap: 8 }}>
              <ThemedText style={{ marginLeft: 4 }}>아이디</ThemedText>
              <StyledInput
                placeholder="아이디를 입력해주세요"
                style={{ width: "100%" }}
                value={userId}
                onChangeText={setUserId}
              />
            </View>

            <View style={{ gap: 8 }}>
              <ThemedText style={{ marginLeft: 4 }}>비밀번호</ThemedText>
              <StyledInput
                placeholder="비밀번호를 입력해주세요"
                style={{ width: "100%" }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <S.SignUpLinkContainer>
            <ThemedText style={{ fontSize: 14, color: "#969696" }}>
              계정이 없으신가요?{" "}
            </ThemedText>
            <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
              <S.SignUpLinkText>회원가입</S.SignUpLinkText>
            </TouchableOpacity>
          </S.SignUpLinkContainer>
        </View>

        <StyledBtn
          label="로그인"
          onPress={() => login({ loginId: userId, password: password })}
          isActive={userId.length > 0 && password.length > 0}
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

export default Login;
