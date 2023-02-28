import styled from 'styled-components'

export const SubmitButton = styled.button`
  background-color: #d30b81;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 40px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b40a6e;
  }
`

export const TogglableButton = styled.button`
  width: 100px;
  height: 35px;
  line-height: 34px;
  text-align: center;
  align-items: center;
  border-radius: 40px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
  color: ${props => props.active ? "white" : "black"} ;
  background-color: ${props => props.active ? "#f63d74" : "white"};
`
