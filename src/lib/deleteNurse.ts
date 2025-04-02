import api from "./api";

export const deleteNurse = async (nurseID: string) => {
  const response = await api.delete<{ message: string; nurse: any }>(`/nurses/${nurseID}`);
  return response.data;
};
