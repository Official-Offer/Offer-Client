import { Button } from 'antd'
import styled from 'styled-components'
import { ButtonProps } from 'antd/lib/button';

export const StyledSubmitButton = styled.button`
  background-color: #d30b81;
  color: white;
  border: none;
  /* margin-top: 28px; */
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  border-radius: 20px;
  padding: 10px 40px;
  font-size: 14px;
  font-weight: bold;
  width: 250px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b40a6e;
  }
`

// const Button = styled((props: NativeButtonProps) => <AntButton {...props} />)``;

export const SubmitButtonAntd: typeof Button = styled(Button)<ButtonProps>`
  /* margin-bottom: 24px; */
  /* background-color: #d30b81; */
  border: none;
  border-radius: 20px;
  height: 40px;
  /* padding: 10px 40px; */
  font-size: 14px;
  font-weight: bold;
  width: 250px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #b40a6e;
  }
`

export const ContinueButton = styled.button`
// props
  background-color: ${props => props.backgroundColor || "#d30b81"};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 40px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.hoverColor || "#b40a6e"}; 
  }
`

export const TogglableButton = styled.button`
  width: 100px;
  height: 30px;

  line-height: 29px;
  text-align: center;
  align-items: center;

  border-radius: 40px;
  border: ${props => props.active ? "none" : "1px solid rgba(0, 0, 0, 0.3)"};

  cursor: pointer;
  background-color: white;
  color: ${props => props.active ? "white" : "black"} ;
  background-color: ${props => props.active ? "#f63d74" : "white"};
`