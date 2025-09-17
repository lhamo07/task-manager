import React from 'react';
import styled from 'styled-components';
const StyledTextInput = styled.input`
  border:
    1px,
    solid #bedcfb;
  padding: 5px;
  border-radius: 5px;
  background-color: rgb(236 245 252 / 87%);
`;
const TextInputWithLabel = ({ elementId, label, onChange, ref, value }) => {
  return (
    <>
      <label htmlFor={elementId}>{label} </label>

      <StyledTextInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      ></StyledTextInput>
    </>
  );
};

export default TextInputWithLabel;
