"use client";

import { Nurse, Ward, WardColors } from "@/types/types";
import { FunctionComponent, useState } from "react";
import { nurseAPI } from "@/lib/nurseApi";
import { Formik, Field } from "formik";
import { nurseSchema } from "../NurseForm";
import {
  Grid,
  Header,
  Cell,
  SelectField,
  InputField,
  Button,
  GridWrapper,
  WardColorText,
} from "./styled";

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
      await refreshNurses();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(nurses);
  return (
    <GridWrapper>
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
                  <InputField name="first_name" />
                </Cell>
                <Cell>
                  <InputField name="last_name" />
                </Cell>
                <Cell>
                  <InputField name="email" />
                </Cell>
                <Cell>
                  <Field as={SelectField} name="ward_id">
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
              {nurse.ward_name}
              <WardColorText $color={nurse.ward_color}>
                {nurse.ward_color}
              </WardColorText>
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
    </GridWrapper>
  );
};

export default NurseTable;
