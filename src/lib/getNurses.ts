import api from "./api";
import { Nurse } from "@/types/types";

export const getNurses = async (search = ""): Promise<Nurse[]> => {
  const response = await api.get<Nurse[]>("/nurses", {
      params: { query: search },
  });
  return response.data;
};
