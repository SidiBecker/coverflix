
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 400;
  width: '100%';
  background-color: 'var(--black)';
`;

export const CloseButton = styled.div`
  align-self: flex-end;

  button {
    font-size: 30px;
    border: none;
    background: var(--background);
    color: var(--white);
    padding: 0;

    &:hover{
      opacity: .8;
    }

    &:focus{
      outline: none;
    }
  }
`;

export const ContainerIframe = styled.div`
  align-self: center;
`;