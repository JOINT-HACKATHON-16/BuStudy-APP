import CustomAxios from "@/lib/axios/CustomAxios";

interface Subject {
  subjectId: number;
  subject: string;
}

interface SubjectsResponse {
  subjects: Subject[];
}

const useGetSub = async (): Promise<SubjectsResponse> => {
  try {
    const res = await CustomAxios.get("/subject");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useGetSub;
export type { Subject, SubjectsResponse };
