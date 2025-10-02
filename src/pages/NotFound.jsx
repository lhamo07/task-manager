import React, { use, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
const NotFound = () => {
  const navigate = useNavigate();
  const StyleGoback = styled.button`
    background-color: #18446b !important;
    color: white;
    padding: 5px;
    border-radius: 5px;
    border: none;
    margin-left: 5px;
     &:hover {
    background-color: #0f2a3e !important;
  `;
  const MainContainer = styled.div`
    text-align: center;
  `;
  return (
    <MainContainer>
      <h1>404</h1>
      <p>Page not found</p>
      <StyleGoback onClick={() => navigate('/')}> &larr; Go Back</StyleGoback>
    </MainContainer>
  );
};

export default NotFound;
