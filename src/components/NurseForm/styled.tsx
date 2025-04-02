import styled from "styled-components";

export const FormWrapper = styled.form`
  padding: 0.5rem;
  background-color: #f9f9f9;
  max-width: 20rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-weight: bold;
  text-transform: uppercase;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

export const SubmitButton = styled.button``;
