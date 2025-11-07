import CustomAxios from "@/lib/axios/CustomAxios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

// 요청 페이로드 타입 정의
interface SubjectRegistrationPayload {
  imageUri: string;
}

// 응답 데이터 타입 정의
interface SubjectRegistrationResponse {
  subject: string;
}

// API 호출 함수
const postSubject = async (
  payload: SubjectRegistrationPayload
): Promise<SubjectRegistrationResponse> => {
  const formData = new FormData();

  // URI에서 파일 이름 추출
  const filename = payload.imageUri.split("/").pop() || "photo.jpg";

  // 파일 확장자에서 mime type 추출
  const match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : "image/jpeg";

  // jpg를 jpeg로 정규화
  if (type.includes("jpg")) {
    type = "image/jpeg";
  }

  // React Native FormData 구성
  const fileObject: any = {
    uri: payload.imageUri,
    name: filename,
    type: type,
  };

  // ⭐ 핵심: Swagger에서 요구하는 필드명은 'image'
  formData.append("image", fileObject);

  console.log("=== FormData 전송 정보 ===");
  console.log("필드명: image");
  console.log("파일 정보:", fileObject);

  // FormData의 실제 내용 확인 (React Native)
  if ((formData as any)._parts) {
    console.log("FormData parts:", (formData as any)._parts);
  }

  try {
    // CustomAxios interceptor가 자동으로 Content-Type을 설정함
    const response = await CustomAxios.post<SubjectRegistrationResponse>(
      "/subject",
      formData
    );

    console.log("=== API 응답 성공 ===");
    console.log("응답 데이터:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("=== API 호출 에러 ===");
    console.error("Status:", error.response?.status);
    console.error(
      "에러 데이터:",
      JSON.stringify(error.response?.data, null, 2)
    );
    console.error("에러 헤더:", error.response?.headers);
    console.error("요청 URL:", error.config?.url);
    console.error("요청 메서드:", error.config?.method);
    throw error;
  }
};

// useMutation 훅 정의
export const usePostSubject = (
  options?: UseMutationOptions<
    SubjectRegistrationResponse,
    Error,
    SubjectRegistrationPayload
  >
) => {
  return useMutation<
    SubjectRegistrationResponse,
    Error,
    SubjectRegistrationPayload
  >({
    mutationFn: postSubject,
    ...options,
  });
};
