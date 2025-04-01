import api from "./api";
import { Nurse } from "@/types/types";

export const getNurses = async (): Promise<Nurse[]> => {
  const response = await api.get<Nurse[]>("/nurses");
  return response.data;
};
