import CustomAxios from "@/lib/axios/CustomAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

interface LoginParams {
  loginId: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const loginApi = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await CustomAxios.post("/auth/login", params);
  return response.data;
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data;

      // 토큰을 AsyncStorage에 저장
      await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
      await AsyncStorage.setItem("REFRESH_TOKEN", refreshToken);

      router.replace("/(tabBar)/TabBarLayout");

    },
    onError: (error) => {
      console.error("Login error:", error);
      Alert.alert("로그인 실패", "아이디 또는 비밀번호를 확인해주세요.");
    }
  })
}