import api from "./api";
import { Nurse } from "@/types/types";
interface NursesResponse {
  nurses: Nurse[];
  limit: number;
  page: number;
  total: number;
}

export const getNurses = async (
  search = "",
  page = 1,
  limit = 10
): Promise<NursesResponse> => {
  const response = await api.get<NursesResponse>("/nurses", {
    params: {
      search,
      page,
      limit,
    },
  });
  return response.data;
};

