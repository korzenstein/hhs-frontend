"use client";

import { Nurse, Ward } from "@/types/types";
import { FunctionComponent, useState } from "react";
import { nurseAPI } from "@/lib/nurseApi";
import { Formik, Field } from "formik";
import { nurseSchema } from "../NurseForm";

type NurseProps = {
  nurses: Nurse[];
  refreshNurses: () => Promise<void>;
  wards: Ward[];
};

const NurseTable: FunctionComponent<NurseProps> = ({
  nurses,
  refreshNurses,
  wards,
}) => {
  const [editID, setEditId] = useState<string | null>(null);

  const handleEditToggle = (nurseID: string) => {
    setEditId(nurseID);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  const handleNurseDeletion = async (nurseID: string) => {
    try {
      await nurseAPI.deleteNurse(nurseID);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>First Name</th>
          <th style={{ textAlign: "left" }}>Last Name</th>
          <th style={{ textAlign: "left" }}>Email</th>
          <th style={{ textAlign: "left" }}>Ward</th>
          <th style={{ textAlign: "left" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {nurses.map((nurse) =>
          editID === nurse.id ? (
            <Formik
              key={nurse.id}
              initialValues={{
                first_name: nurse.first_name,
                last_name: nurse.last_name,
                email: nurse.email,
                ward_id: nurse.ward_id,
              }}
              validationSchema={nurseSchema}
              onSubmit={async (values) => {
                try {
                  await nurseAPI.updateNurse(nurse.id, values);
                  await refreshNurses();
                  handleEditCancel();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {({ handleSubmit }) => (
                <tr>
                  <td>
                    <Field name="first_name" />
                  </td>
                  <td>
                    <Field name="last_name" />
                  </td>
                  <td>
                    <Field name="email" />
                  </td>
                  <td>
                    <Field as="select" name="ward_id">
                      <option value="">Select a ward</option>
                      {wards.map((ward) => (
                        <option key={ward.id} value={ward.id}>
                          {ward.name} ({ward.color})
                        </option>
                      ))}
                    </Field>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleSubmit()}>
                      Save
                    </button>
                    <button type="button" onClick={handleEditCancel}>
                      Cancel
                    </button>
                  </td>
                </tr>
              )}
            </Formik>
          ) : (
            <tr key={nurse.id}>
              <td>{nurse.first_name}</td>
              <td>{nurse.last_name}</td>
              <td>{nurse.email}</td>
              <td>
                {nurse.ward_name} / {nurse.ward_color}
              </td>
              <td>
                <button onClick={() => handleEditToggle(nurse.id)}>Edit</button>
                <button onClick={() => handleNurseDeletion(nurse.id)}>
                  Delete
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default NurseTable;
