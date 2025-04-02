"use client";

import { FunctionComponent } from "react";
import { useFormik } from "formik";
import { Ward } from "@/types/types";
import * as yup from "yup";
import { nurseAPI } from "@/lib/nurseApi";
import {
  FormWrapper,
  FieldGroup,
  Label,
  Input,
  Select,
  ErrorText,
  SubmitButton,
} from "./styled";
import { SelectField } from "../NurseTable/styled";

export const nurseSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  ward_id: yup.string().uuid("Invalid ward").required("Ward is required"),
});

type WardsProps = {
  wards: Ward[];
  refreshNurses: () => Promise<void>;
};

const NurseForm: FunctionComponent<WardsProps> = ({ wards, refreshNurses }) => {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      ward_id: "",
    },
    validationSchema: nurseSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await nurseAPI.createNurse(values);
        await refreshNurses();
        console.log(response);
        resetForm();
      } catch (err) {
        console.error("Failed to create nurse", err);
      }
    },
  });

  return (
    <FormWrapper onSubmit={formik.handleSubmit}>
      <FieldGroup>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <ErrorText>{formik.errors.first_name}</ErrorText>
        )}
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <ErrorText>{formik.errors.last_name}</ErrorText>
        )}
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <ErrorText>{formik.errors.email}</ErrorText>
        )}
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="ward_id">Ward</Label>
        <Select
          as={SelectField}
          name="ward_id"
          value={formik.values.ward_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select a ward</option>
          {wards.map((ward) => (
            <option key={ward.id} value={ward.id}>
              {ward.name} ({ward.color})
            </option>
          ))}
        </Select>
        {formik.touched.ward_id && formik.errors.ward_id && (
          <ErrorText>{formik.errors.ward_id}</ErrorText>
        )}
      </FieldGroup>

      <SubmitButton type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Submitting..." : "Add Nurse"}
      </SubmitButton>
    </FormWrapper>
  );
};

export default NurseForm;
