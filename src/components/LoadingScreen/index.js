import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  color: #FFF; 
  height: calc(100vh - 245px);
  display: flex; 
  align-items: center; 
  justify-content: center;
`;

function LoadingScreen() {
  return (

    <Loading>
      Carregando...
    </Loading>

  );
}

export default LoadingScreen;
