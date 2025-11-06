import CustomAxios from "@/lib/axios/CustomAxios";
import { useMutation } from "@tanstack/react-query";

interface SignUpParams {
  loginId: string;
  passwordCheck: string;
  password: string;
  name: string;
}

const signUpApi = async (params: SignUpParams) => {
  console.log("=== Sign-up Request ===");
  console.log("URL:", "/auth/sign-up");
  console.log("Params:", JSON.stringify(params, null, 2));
  console.log("======================");

  const response = await CustomAxios.post("/auth/sign-up", params);
  return response.data;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUpApi,
    onSuccess: async (data) => {
      console.log("✅ Sign-up success:", data);
    },
    onError: (error: any) => {
      console.error("❌ Sign-up error:");
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
      console.error("Message:", error.message);
    },
  });
};
