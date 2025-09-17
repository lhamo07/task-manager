import React, { useEffect } from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';
const StyledButton = styled.button`
  background-color: #18446b !important;
  color: white;
  padding: 5px;
  border-radius: 5px;
  border: none;
  margin-left: 5px;
  &:hover {
    background-color: #0f2a3e !important;
`;
const StyledDiv = styled.div`
  padding-top: 10px;
`;
const StyledLabel = styled.label`
  margin: 5px;
  font-size: 16px;
  font-weight: 600px;
`;
const StyledSelect = styled.select`
  border:
    1px,
    solid #bedcfb;
  padding: 5px;
  border-radius: 5px;
  background-color: rgb(236 245 252 / 87%);
`;
export const TodosViewForm = ({
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) => {
  const preventRefresh = (event) => {
    event.preventDefault();
  };
  const [localQueryString, setLocalQueryString] = useState(queryString);
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);
  return (
    <>
      <div>
        <StyledLabel>Search todos</StyledLabel>
        <TextInputWithLabel
          type="text"
          value={localQueryString}
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
        />
        <StyledButton type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </StyledButton>
      </div>
      <StyledDiv>
        <form onSubmit={preventRefresh}>
          <StyledLabel>Sort By</StyledLabel>
          <StyledSelect
            onChange={(event) => {
              setSortField(event.target.value);
            }}
            value={sortField}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time Added</option>
          </StyledSelect>
          <StyledLabel>Direction</StyledLabel>
          <StyledSelect
            onChange={(event) => {
              setSortDirection(event.target.value);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Desceding</option>
          </StyledSelect>
        </form>
      </StyledDiv>
    </>
  );
};
