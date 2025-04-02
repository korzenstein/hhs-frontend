import api from "./api";
import { NewNurseInput, Nurse } from "@/types/types";

export const createNurse = async (payload: NewNurseInput): Promise<Nurse> => {
  const response = await api.post<Nurse>("/nurses", payload);
  return response.data;
};
