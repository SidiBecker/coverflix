import styled from 'styled-components';

export const Table = styled.table`

width: 100%;
margin-bottom: 50px;

& tbody tr {
  background: var(--greendark1);

  button {
    background:var(--greendark1);
  }

  &:nth-child(2n) {
    background: var(--greendark2);

      button {
        background:var(--greendark2);
      }
  }
}
`;