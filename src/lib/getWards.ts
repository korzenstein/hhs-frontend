import api from "./api";
import { Ward } from "@/types/types";

export const getWards = async (): Promise<Ward[]> => {
  const response = await api.get<Ward[]>("/wards");
  return response.data;
};
