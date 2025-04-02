import styled from "styled-components";

export const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #d4c9be;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 1;
`;

export const Label = styled.label`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;
