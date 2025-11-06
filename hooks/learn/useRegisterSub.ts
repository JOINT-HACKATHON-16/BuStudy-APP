import CustomAxios from "@/lib/axios/CustomAxios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

// 1. 요청 페이로드 타입 정의
// React Native에서는 FormData에 이미지 URI 정보를 담아 전송합니다.
interface SubjectRegistrationPayload {
  imageUri: string; // 이미지 파일의 로컬 URI
  fileName?: string; // 파일명 (선택적)
  fileType?: string; // MIME 타입 (선택적)
}

// 2. 응답 데이터 타입 정의 (201 성공 시 응답 예시가 없으므로 일반적인 성공 메시지 가정)
interface SubjectRegistrationResponse {
  status: string; // 예시 응답 구조의 status (400 에러 응답 구조 참고)
  message: string; // 예시 응답 구조의 Message
  // 성공 시 실제 등록된 과목 정보가 추가될 수 있습니다.
  // subjectId: number;
}

// 3. API 호출 함수
const postSubject = async (
  payload: SubjectRegistrationPayload
): Promise<SubjectRegistrationResponse> => {
  // 파일을 전송하기 위해 FormData 객체를 사용합니다.
  const formData = new FormData();

  // React Native에서 FormData에 파일 추가
  // URI에서 파일 이름 추출
  const filename =
    payload.fileName || payload.imageUri.split("/").pop() || "photo.jpg";

  // 파일 확장자에서 mime type 추출
  const match = /\.(\w+)$/.exec(filename);
  const type = payload.fileType || (match ? `image/${match[1]}` : "image/jpeg");

  formData.append("image", {
    uri: payload.imageUri,
    name: filename,
    type: type,
  } as any);

  // Axios는 FormData 객체를 인식하여 Content-Type을 'multipart/form-data'로 자동 설정합니다.
  const response = await CustomAxios.post("/subject", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 4. useMutation 훅 정의
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
