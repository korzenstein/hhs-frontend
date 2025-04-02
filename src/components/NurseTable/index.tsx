import { Nurse } from "@/types/types";
import { FunctionComponent } from "react";
import { nurseAPI } from "@/lib/nurseApi";

type NurseProps = {
  nurses: Nurse[];
  refreshNurses: () => Promise<void>;
};

const NurseTable: FunctionComponent<NurseProps> = ({
  nurses,
  refreshNurses,
}) => {
  const handleNurseDeletion = async (nurseID: string) => {
    try {
      const response = await nurseAPI.deleteNurse(nurseID);
      console.log(response);
      await refreshNurses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Ward</th>
          <th>Color</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {nurses.map((nurse) => (
          <tr key={nurse.id}>
            <td>{nurse.first_name}</td>
            <td>{nurse.last_name}</td>
            <td>{nurse.email}</td>
            <td>{nurse.ward_name}</td>
            <td>{nurse.ward_color}</td>
            <td>
              <button>Edit</button>
              <button onClick={() => handleNurseDeletion(nurse.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NurseTable;
