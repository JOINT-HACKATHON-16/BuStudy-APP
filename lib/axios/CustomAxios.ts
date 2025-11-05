import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UgaAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const UgaAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
  headers: {
    Accept: "application/json, text/plain, */*, multipart/form-data",
  },
  withCredentials: true,
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

UgaAxios.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorage.getItem("ACCESS_TOKEN"); // 나중에 const로 변경

    // 개발용 임시 토큰
    if (!token && __DEV__) {
      token = process.env.EXPO_PUBLIC_ACCESSTOKEN || "";
      // 임시 토큰을 AsyncStorage에도 저장
      await AsyncStorage.setItem("ACCESS_TOKEN", token);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

UgaAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as UgaAxiosRequestConfig;

    if (originalRequest.data instanceof FormData) {
      originalRequest.headers["Content-Type"] = "multipart/form-data";
    } else {
      originalRequest.headers["Content-Type"] = "application/json";
    }
    if (originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      let refreshToken = await AsyncStorage.getItem("REFRESH_TOKEN"); //나중에 const로 변경

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
            const response = await axios.post(
              `${process.env.EXPO_PUBLIC_SERVER_URL}/auth/refresh`,
              {
                token: refreshToken,
              }
            );

            const newAccessToken = response.data.data.accessToken;
            const newRefreshToken = response.data.data.refreshToken;

            AsyncStorage.setItem("ACCESS_TOKEN", newAccessToken);
            AsyncStorage.setItem("REFRESH_TOKEN", newRefreshToken);

            // 대기 중인 요청들을 처리
            onRefreshed(newAccessToken);

            // 재발급 완료 후 새로운 토큰으로 요청 다시 보내기
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return UgaAxios(originalRequest);
          } catch (refreshError) {
            // 토큰 재발급 실패 시 처리
            AsyncStorage.removeItem("ACCESS_TOKEN");
            AsyncStorage.removeItem("REFRESH_TOKEN");
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        // 토큰이 재발급 중이면 대기 중인 요청에 추가
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(UgaAxios(originalRequest));
          });
        });
      } else {
        // refresh token이 없는 경우 에러 처리
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default UgaAxios;
