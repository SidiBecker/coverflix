import styled from 'styled-components';

export const PanelActionButtons = styled.div`
display: flex;
justify-content: space-between;
`;

export const LabelUnderline = styled.span`
  text-decoration: underline;
  cursor: pointer;
  transition: opacity 100ms;
  &:hover{
    opacity: 0.8;
  }
`;
