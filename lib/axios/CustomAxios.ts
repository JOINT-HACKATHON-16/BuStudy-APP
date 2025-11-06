import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface UgaAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const CustomAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
  withCredentials: true,
  timeout: 0, // 타임아웃 없음 (무제한 대기)
});

// 토큰 재발급 상태 관리
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// 새로운 토큰을 받은 후 대기 중이던 요청 처리
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 요청을 대기열에 추가
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

CustomAxios.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");

    // 개발용 임시 토큰
    if (!token && __DEV__) {
      token = process.env.EXPO_PUBLIC_ACCESSTOKEN || "";
      // 임시 토큰을 AsyncStorage에도 저장
      await AsyncStorage.setItem("ACCESS_TOKEN", token);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ⭐ 핵심 수정: FormData는 Content-Type을 자동 설정하도록 함
    if (config.data instanceof FormData) {
      // Content-Type을 삭제하여 axios가 자동으로 boundary를 포함한
      // multipart/form-data를 설정하도록 함
      delete config.headers["Content-Type"];
      console.log("✅ FormData 감지: Content-Type 자동 설정");
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    // 디버깅용 로그
    console.log("=== Request Interceptor ===");
    console.log("URL:", config.url);
    console.log("Method:", config.method);
    console.log("Content-Type:", config.headers["Content-Type"]);
    console.log("Data type:", config.data?.constructor?.name);

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

CustomAxios.interceptors.response.use(
  (response) => {
    console.log("=== Response Success ===");
    console.log("Status:", response.status);
    console.log("URL:", response.config.url);
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as UgaAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // ⭐ 핵심 수정: 재시도 시에도 FormData는 Content-Type 자동 설정
    if (originalRequest.data instanceof FormData) {
      delete originalRequest.headers["Content-Type"];
      console.log("✅ 재시도 - FormData Content-Type 자동 설정");
    } else {
      originalRequest.headers["Content-Type"] = "application/json";
    }

    // 에러 로깅
    console.error("=== Response Error ===");
    console.error("Status:", error.response?.status);
    console.error("URL:", originalRequest.url);
    console.error("Method:", originalRequest.method);
    console.error("Error Data:", JSON.stringify(error.response?.data, null, 2));

    // Feign 에러 특별 처리
    if (error.response?.data?.message?.includes("Feign")) {
      console.error("🚨 Feign Bad Request 발생!");
      console.error("게이트웨이 통과, 내부 서비스 호출 실패");
      console.error("Request Headers:", originalRequest.headers);
    }

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      let refreshToken = await AsyncStorage.getItem("REFRESH_TOKEN");

      // 개발용 임시 리프레시 토큰
      if (!refreshToken && __DEV__) {
        refreshToken = process.env.EXPO_PUBLIC_REFRESHTOKEN || "";
        // 임시 리프레시 토큰을 AsyncStorage에도 저장
        await AsyncStorage.setItem("REFRESH_TOKEN", refreshToken);
      }

      // 리프레시 토큰이 있는 경우
      if (refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const response = await axios.put(
              `${process.env.EXPO_PUBLIC_SERVER_URL}/auth/re-issue`,
              null,
              {
                headers: {
                  "X-Refresh-Token": refreshToken,
                },
              }
            );

            const newAccessToken = response.data.data.accessToken;
            const newRefreshToken = response.data.data.refreshToken;

            await AsyncStorage.setItem("ACCESS_TOKEN", newAccessToken);
            await AsyncStorage.setItem("REFRESH_TOKEN", newRefreshToken);

            // 대기 중인 요청들을 처리
            onRefreshed(newAccessToken);

            // 재발급 완료 후 새로운 토큰으로 요청 다시 보내기
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return CustomAxios(originalRequest);
          } catch (refreshError) {
            // 토큰 재발급 실패 시 처리
            console.error("토큰 재발급 실패:", refreshError);
            await AsyncStorage.removeItem("ACCESS_TOKEN");
            await AsyncStorage.removeItem("REFRESH_TOKEN");
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        // 토큰이 재발급 중이면 대기 중인 요청에 추가
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(CustomAxios(originalRequest));
          });
        });
      } else {
        // refresh token이 없는 경우 에러 처리
        console.error("Refresh token이 없습니다");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default CustomAxios;
