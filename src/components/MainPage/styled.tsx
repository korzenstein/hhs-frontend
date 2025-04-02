import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
`;

export const SearchPaginationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  border-bottom: 1px solid #d4c9be;
  /* display: flex; */
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

export const PaginationContainer = styled.div`
  grid-column: 5;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 2rem;
`;
