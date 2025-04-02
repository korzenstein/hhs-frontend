import { getNurses } from "./getNurses";
import { deleteNurse } from "./deleteNurse";
import { createNurse } from "./createNurse";
import { updateNurse } from "./updateNurse";

export const nurseAPI = {
  createNurse,
  deleteNurse,
  updateNurse,
  getNurses,
};
