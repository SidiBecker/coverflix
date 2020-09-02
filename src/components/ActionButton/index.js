import styled from 'styled-components';

const ActionButton = styled.button`
background: var(--black);
border: none;
cursor: pointer;
transition: 200ms opacity;
&:hover {
  opacity: 0.8;
}
`;

export default ActionButton;
