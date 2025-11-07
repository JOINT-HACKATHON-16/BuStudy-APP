import CustomAxios from "@/lib/axios/CustomAxios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

// 퀴즈 응답: 문제 리스트 Question 타입 (PDF 명세 기반)
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// 퀴즈 응답 전체 타입
interface QuizResponse {
  contentType: "QUIZ";
  uploadId: string;
  subject: string;
  questions: Question[];
  totalQuestions: number;
}

// 강의 응답 타입
interface LectureResponse {
  contentType: "LECTURE";
  lectureId: string;
}

// 오디오 응답 타입
interface AudioResponse {
  contentType: "AUDIO";
  uploadId: string;
  subject: string;
  duration: number;
  content: string;
}

// API 응답의 최종 유니언 타입
type LearningStartResponse = QuizResponse | LectureResponse | AudioResponse;

// POST 요청 시 서버에 전달할 본문(Payload) 타입
interface LearningStartPayload {
  subjectId: number; // Path Parameter로 사용될 subjectId (number 타입)만 필요
}
// --- 2. API 호출 함수 ---

const postLearningStart = async (
  payload: LearningStartPayload
): Promise<LearningStartResponse> => {
  const { subjectId } = payload;

  console.log("학습 시작 API 호출:", { subjectId, estimatedTime: 45 });

  // 엔드포인트를 POST /study/{subject-id} 패턴에 맞춥니다.
  const endpoint = `/study/${subjectId}`;

  try {
    // POST 요청으로 Request Body를 전송합니다.
    const response = await CustomAxios.post<LearningStartResponse>(endpoint, {
      estimatedTime: 10,
    });

    console.log("학습 시작 API 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("학습 시작 API 에러:", error);
    console.error("에러 응답:", error.response?.data);
    console.error("에러 상태:", error.response?.status);
    throw error;
  }
};

// --- 3. React Query Mutation 훅 ---

export const useLearningStartMutation = (
  options?: UseMutationOptions<
    LearningStartResponse,
    Error,
    LearningStartPayload, // TVariables: { subjectId: number, estimatedTime: number }
    unknown
  >
) => {
  return useMutation<LearningStartResponse, Error, LearningStartPayload>({
    mutationFn: postLearningStart,
    ...options,
  });
};

export default useLearningStartMutation;
