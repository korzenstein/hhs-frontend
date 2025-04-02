"use client";

import { FunctionComponent } from "react";
import { useFormik } from "formik";
import { Ward } from "@/types/types";
import * as yup from "yup";

export const nurseSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  ward_id: yup.string().uuid("Invalid ward").required("Ward is required"),
});

type WardsProps = {
  wards: Ward[];
};

const NurseForm: FunctionComponent<WardsProps> = ({ wards }) => {
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
        console.log(values);
        resetForm();
      } catch (err) {
        console.error("Failed to create nurse", err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Add New Nurse</h2>

      <div>
        <label>First Name:</label>
        <input
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <p>{formik.errors.first_name}</p>
        )}
      </div>

      <div>
        <label>Last Name:</label>
        <input
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <p>{formik.errors.last_name}</p>
        )}
      </div>

      <div>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p>{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label>Ward:</label>
        <select
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
        </select>
        {formik.touched.ward_id && formik.errors.ward_id && (
          <p>{formik.errors.ward_id}</p>
        )}
      </div>

      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Submitting..." : "Add Nurse"}
      </button>
    </form>
  );
};

export default NurseForm;
