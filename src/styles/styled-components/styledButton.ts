import { Button } from 'antd'
import React from "react"
import styled from 'styled-components'
import { ButtonProps } from 'antd/lib/button';

export const StyledSubmitButton = styled.button<any>`
  color: white;
  border: none;
  text-align: center;
  border-radius: ${props => props.borderRadius || "20px"}; 
  padding-top: ${props => props.paddingTopBottom || "10px"}; 
  padding-bottom: ${props => props.paddingTopBottom || "10px"}; 
  padding-left: ${props => props.paddingLeftRight || "40px"}; 
  padding-right:  ${props => props.paddingLeftRight || "40px"};  
  font-size: 14px;
  font-weight: bold;
  width: ${props => props.width || "250px"};  
  cursor: pointer;
  background: ${props => props.background || "#d30b81"};
  background-image: ${props => props.background || "#d30b81"};
  transition: background-color 0.3s ease, background-position 0.3s ease;
  ${props => props.gradient && `
    background-size: 100% 200%;
  `}

  &:hover {
    background-color: ${props => props.hoverBackgroundColor || "#b40a6e"};
    ${props => props.gradient && `background-position: 0 100%;`}
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

export const ContinueButton = styled.button<any>`
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

export const TogglableButton = styled.button<{ checked?: boolean }>`
  height: 30px;
  padding: 0px 12px;

  border-radius: 40px;
  border: none;

  line-height: 29px;
  text-align: center;
  align-items: center;

  cursor: pointer;
  color: ${(props) => props.checked ? "white" : "black"} ;
  background-color: ${(props) => props.checked ? "#f63d74" : "#EDEDED"};

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  &:hover {
    filter: brightness(0.87);
  }
`

type IconButtonProps = {
  round?: boolean,
  fullWidth?: boolean,
  backgroundColor: string,
  disabled?: boolean,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

export const IconButton = styled.div<IconButtonProps>`
  width: ${({ fullWidth }) => fullWidth ? "100%": "auto"};
  height: 32px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: white;
  border: none;
  border-radius: ${({round}) => round ? "20px" : "8px"};
  padding: 4px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
  transition: 0.3s ease;
  
  .btn-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &:hover {
    filter: brightness(0.87);
  }

  &:disabled {
    background-color: #7277F1;
    color: white;
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`

export const FileDownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background-color: #8799AE;
  color: white;
  border: none;
  width: 100%;
  border-radius: 20px;
  padding: 4px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #617790;
  }

  &:disabled {
    background-color: #8799AE;
    color: white;
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`

export const StyledMenuButton = styled.div`
  padding: 4px 8px;

  &:hover {
    backdrop-filter: brightness(0.90);
    cursor: pointer;
  }
`;