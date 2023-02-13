import styled from 'styled-components';

export const Box = styled.div `
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
