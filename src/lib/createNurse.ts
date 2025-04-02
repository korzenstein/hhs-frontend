import api from "./api";
import { NurseInput, Nurse } from "@/types/types";

export const createNurse = async (payload: NurseInput): Promise<Nurse> => {
  const response = await api.post<Nurse>("/nurses", payload);
  return response.data;
};
