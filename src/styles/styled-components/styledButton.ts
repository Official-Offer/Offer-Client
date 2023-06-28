import { Button } from 'antd'
import styled from 'styled-components'
import { ButtonProps } from 'antd/lib/button';

export const StyledSubmitButton = styled.button`
  background: ${props => props.background || "#d30b81"};
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.hoverBackgroundColor || "#b40a6e"}; 
  }
`

export const StyledAddButton = styled.button`
  background-color: #d30b81;
  color: white;
  border: none;
  /* margin-top: 28px; */
  text-align: center;
  border-radius: 20px;
  padding: 2;
  font-size: 14px;
  font-weight: bold;
  width: 180px;
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
  border: ${(props) => props.checked ? "none" : "1px solid rgba(0, 0, 0, 0.3)"};

  cursor: pointer;
  background-color: white;
  color: ${(props) => props.checked ? "white" : "black"} ;
  background-color: ${(props) => props.checked ? "#f63d74" : "white"};

  &:hover {
    filter: brightness(0.87);
  }
`

export const FileAddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 32px;
  max-width: 200px;

  background-color: #d30b81;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 4px 16px;

  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b40a6e;
  }

  &:disabled {
    background-color: #d30b81;
    color: white;
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
  }
`

export const FileUploadButton = styled.button`
  height: 32px;
  background-color: #7277F1;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 4px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  .btn-body {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  &:hover {
    background-color: #5359EE;
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