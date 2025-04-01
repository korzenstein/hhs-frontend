import { Nurse } from "@/types/types";
import { FunctionComponent } from "react";

type NurseProps = {
  nurses: Nurse[];
};

const NurseTable: FunctionComponent<NurseProps> = ({ nurses }) => {
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
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NurseTable;
