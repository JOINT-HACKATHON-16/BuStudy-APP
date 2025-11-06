import CustomAxios from "@/lib/axios/CustomAxios";
import { useQuery } from "@tanstack/react-query";

interface BusStopsParams {
  lat: number;
  lon: number;
}

// 주변 정류장 하나의 응답 데이터 타입 (이전과 동일)
interface BusStop {
  nodeid: string; // 정류장 ID
  gpslati: number; // GPS 위도
  gpslong: number; // GPS 경도
  nodenm: string; // 정류장 이름
}

// 훅의 최종 응답 타입 (정류장 목록 배열)
type BusStopList = BusStop[];

// API 응답 객체 전체의 타입
// { "busStops": [ ... ] } 형태를 반영
interface BusApiResponse {
  busStops: BusStopList;
}

// --- 2. API 호출 함수 ---

const getBusStops = async ({
  lat,
  lon,
}: BusStopsParams): Promise<BusStopList> => {
  // 반환 타입을 BusStopList로 유지

  const response = await CustomAxios.get<BusApiResponse>("/bus", {
    params: {
      lat: 36.3,
      lon: 127.3,
    },
  });

  // !!! 핵심 수정 사항: 응답 데이터에서 'busStops' 키의 배열만 추출하여 반환 !!!
  return response.data.busStops;
};

// --- 3. React Query 훅 ---

export const useGetBusStops = (
  { lat, lon }: BusStopsParams,
  options?: { enabled?: boolean }
) => {
  const isEnabled =
    options?.enabled !== undefined
      ? options.enabled
      : lat !== undefined && lon !== undefined;

  // useQuery 제네릭에 최종 사용할 데이터 타입(BusStopList)을 명시합니다.
  return useQuery<BusStopList, Error>({
    // 쿼리 키는 이전과 동일
    queryKey: ["busStops", lat, lon],

    // queryFn은 BusStopList를 반환하도록 수정되었습니다.
    queryFn: () => getBusStops({ lat, lon }),

    // enabled 옵션은 이전과 동일
    enabled: isEnabled,
  });
};
