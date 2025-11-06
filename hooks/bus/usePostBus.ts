import CustomAxios from "@/lib/axios/CustomAxios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

// 1. 요청 본문(Request Body)의 타입을 정의합니다.
// API 스펙에 따라 sx와 sy는 number, streetAddress는 string입니다.
interface BusTravelTimePayload {
  sx: number;
  sy: number;
  streetAddress: string;
}

// 2. 응답 데이터의 타입을 정의합니다 (예시).
// 실제 API 응답 형태에 따라 변경해야 합니다.
interface BusTravelTimeResponse {
  // 예시: 예상 시간 (분), 도착지 정보 등
  estimatedTimeMinutes: number;
  destination: string;
}

// 3. API 호출 함수가 정의된 타입을 사용하도록 수정합니다.
const postBusTravelTime = async (
  data: BusTravelTimePayload
): Promise<BusTravelTimeResponse> => {
  // CustomAxios.post("/bus", data)를 통해 요청 본문을 전송합니다.
  const response = await CustomAxios.post("/bus", data);
  return response.data;
};

// 4. useMutation 훅을 정의합니다.
// 제네릭을 사용하여 타입 안정성을 확보합니다.
export const usePostBusTravelTime = (
  // 필요에 따라 useMutation 옵션(onSuccess, onError 등)을 외부에서 받도록 할 수 있습니다.
  options?: UseMutationOptions<
    BusTravelTimeResponse, // TData (성공 시 응답 데이터 타입)
    Error, // TError (실패 시 에러 타입)
    BusTravelTimePayload, // TVariables (mutation 함수에 전달되는 인자 타입)
    unknown // TContext (옵션, 여기서는 사용하지 않음)
  >
) => {
  return useMutation<BusTravelTimeResponse, Error, BusTravelTimePayload>({
    mutationFn: postBusTravelTime,
    ...options, // 외부에서 받은 옵션을 적용합니다.
  });
};

