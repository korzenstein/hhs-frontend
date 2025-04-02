"use client";

import { Nurse, Ward } from "@/types/types";
import { FunctionComponent, useState } from "react";
import { nurseAPI } from "@/lib/nurseApi";
import { Formik, Field } from "formik";
import { nurseSchema } from "../NurseForm";
import styled from "styled-components";

type NurseProps = {
  nurses: Nurse[];
  refreshNurses: () => Promise<void>;
  wards: Ward[];
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

const Header = styled(Grid)`
  font-weight: bold;
  text-transform: uppercase;
`;

const Cell = styled.div``;

const Button = styled.button`
  margin-right: 0.5rem;
`;

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
      await refreshNurses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header>
        <Cell>First Name</Cell>
        <Cell>Last Name</Cell>
        <Cell>Email</Cell>
        <Cell>Ward</Cell>
        <Cell>Actions</Cell>
      </Header>
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
              <Grid as="form">
                <Cell>
                  <Field name="first_name" />
                </Cell>
                <Cell>
                  <Field name="last_name" />
                </Cell>
                <Cell>
                  <Field name="email" />
                </Cell>
                <Cell>
                  <Field as="select" name="ward_id">
                    <option value="">Select a ward</option>
                    {wards.map((ward) => (
                      <option key={ward.id} value={ward.id}>
                        {ward.name} ({ward.color})
                      </option>
                    ))}
                  </Field>
                </Cell>
                <Cell>
                  <Button type="button" onClick={() => handleSubmit()}>
                    Save
                  </Button>
                  <Button type="button" onClick={handleEditCancel}>
                    Cancel
                  </Button>
                </Cell>
              </Grid>
            )}
          </Formik>
        ) : (
          <Grid key={nurse.id}>
            <Cell>{nurse.first_name}</Cell>
            <Cell>{nurse.last_name}</Cell>
            <Cell>{nurse.email}</Cell>
            <Cell>
              {nurse.ward_name} / {nurse.ward_color}
            </Cell>
            <Cell>
              <Button onClick={() => handleEditToggle(nurse.id)}>Edit</Button>
              <Button onClick={() => handleNurseDeletion(nurse.id)}>
                Delete
              </Button>
            </Cell>
          </Grid>
        )
      )}
    </div>
  );
};

export default NurseTable;
