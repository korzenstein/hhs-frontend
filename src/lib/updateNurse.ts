import api from "./api";
import { NurseInput, Nurse } from "@/types/types";

export const updateNurse = async (nurseID: string, payload: NurseInput): Promise<Nurse> => {
  const response = await api.patch<Nurse>(`/nurses/${nurseID}`, payload);
  return response.data;
};
