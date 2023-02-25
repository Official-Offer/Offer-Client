import styled from 'styled-components';

export const FormInput = styled.input`
  padding: 8px;
  width: ${props => props.width || '100px'};
  border-radius: 8px;
  border: 1px solid #000000;
  margin-bottom: 10px;
`;
