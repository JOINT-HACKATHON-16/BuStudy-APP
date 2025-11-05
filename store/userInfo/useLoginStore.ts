import { create } from "zustand";

// 스토어의 데이터(상태)와 메서드(액션)를 타입으로 정의
interface useRegisterProps {
  name: string; // 사용자 이름
  userId: string; // 로그인 시 사용할 아이디
  password: string; // 비밀번호
  passwordCheck: string; // 비밀번호 확인용 필드

  // 상태를 변경하는 함수(액션)들을 묶은 객체
  action: {
    setName: (value: string) => void;
    setUserId: (value: string) => void;
    setPassword: (value: string) => void;
    setPasswordCheck: (value: string) => void;
    reset: () => void; // 모든 값을 초기화하는 함수
  };
}

// Zustand로 스토어 생성
export const useRegisterStore = create<useRegisterProps>((set) => ({
  // 초기 상태 정의
  name: "",
  userId: "",
  password: "",
  passwordCheck: "",

  // 상태를 변경하는 액션 정의
  action: {
    // 이름 변경
    setName: (value: string) => set({ name: value }),

    // 아이디 변경
    setUserId: (value: string) => set({ userId: value }),

    // 비밀번호 변경
    setPassword: (value: string) => set({ password: value }),

    // 비밀번호 확인 변경
    setPasswordCheck: (value: string) => set({ passwordCheck: value }),

    // 모든 값 초기화 (회원가입 폼 초기화 등에 사용)
    reset: () =>
      set({
        name: "",
        userId: "",
        password: "",
        passwordCheck: "",
      }),
  },
}));
