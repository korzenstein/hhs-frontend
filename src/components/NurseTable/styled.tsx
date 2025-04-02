import styled from "styled-components";
import { Field } from "formik";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const Header = styled(Grid)`
  font-weight: bold;
  text-transform: uppercase;
`;

export const Cell = styled.div`
  word-break: break-word;
  overflow-wrap: anywhere;
`;

export const Button = styled.button`
  margin-right: 0.5rem;
`;

export const SelectField = styled.select`
  width: 100%;
  padding: 0.25rem;
  font-size: 1rem;
  appearance: none;
  background-color: white;
  border-radius: 0.2rem;
`;

export const InputField = styled(Field)`
  width: 100%;
  padding: 0.25rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 0.2rem;
`;
