import styled from 'styled-components';
import { ButtonBlue } from './styledButton';

export const ContentWrapper = styled.div`
    padding: 100px 25px;
`

export const AvatarWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 15px;
    gap: 25px;
    height: auto;
    background: #FCFCFD;
    box-shadow: 0px 0px 60px rgba(34, 48, 82, 0.25);
    border-radius: 16px;
    flex: none;
    /* order: 0; */
    flex-grow: 0;
    margin-bottom: 25px;
    @media screen and (max-width:992px){
        width: 100%;
    }
`

export const AvatarImg = styled.img`
    clip-path: circle();
`

export const AvatarContainer = styled.div`
    width: 30%;
    margin: 0 auto;
    padding: 0;
    width: 140px;
`

export const AvatarName = styled.p`
    width: 220px;
    height: 24px;
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    /* display: flex; */
    /* align-items: center; */
    text-transform: uppercase;
    color: #223052;
    /* flex: none;
    flex-grow: 0; */
    text-align: center;
    margin: 0;
`

export const FavoriteDapps = styled.div`
    align-self: flex-start;
    color: rgba(34, 48, 82, 0.75);
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    padding-left: 10px;
    
`

export const ProfileSetting = styled.div`
    align-self: flex-start;
    color: white;
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    padding-left: 10px;
    background-color: #058499;
    width: 100%;
    padding: 10px;
    border: 1px solid #1DBBBD;
    border-radius: 8px;
`

export const ProfileTitle = styled.div`
    height: 44px;

    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 44px;
    display: flex;
    align-items: center;

    /* cl-text */

    color: #223052;


    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    margin-bottom: 40px;;
`

export const FormWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: 30px 25px;
    gap: 32px;
    background: #FFFFFF;
    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    flex: none;
    order: 2;
    flex-grow: 0;
`

export const FormDescription = styled.p`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: rgba(34, 48, 82, 0.65);
    margin-bottom: 40px;
    flex: none;
    /* order: 1; */
    flex-grow: 0;
`

export const FormAvatarContainer = styled.div`
    padding: 0;
`

export const FormTitle =styled.p`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 24px;
    margin-bottom: 0px;
`

export const FormAvatarImg = styled(AvatarImg)`
    width:140px;
`

export const FormButton = styled(ButtonBlue)`
    margin: 0 40px ;
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 500 !important;
    font-size: 14px;
    line-height: 16px;
    padding: 10px 18px !important;
    box-shadow: 5px 10px 20px rgba(5, 132, 153, 0.25);
`
export const FormContainer = styled.form`
    width: 100%;
`
export const FieldTitle = styled.p`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;

    /* cl-text */

    color: #223052;
`

export const FormField = styled.input`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    /* align-items: center;
    justify-content: center; */
    padding: 10px 12px;
    background: #FFFFFF;
    border-radius: 8px;
    color: rgba(34, 48, 82, 0.65);
    width:100%;
    margin-bottom: 30px;
    
`
export const BiggerFormField = styled.textarea`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 10px 12px;
    background: #FFFFFF;
    border-radius: 8px;
    color: rgba(34, 48, 82, 0.65);
    width:100%;
    margin-bottom: 30px;
    height: 100px;
`
export const FormClosingNote = styled(FormDescription)`
    font-size: 16px;
    margin-bottom: 0;
`
export const ClearButton = styled.button`
    background-color: white;
    border: none;
    /* :hover {
        text-decoration: underline;
    } */
`
export const PlaceholderWrapper = styled.div`
display: inline-block;
    position: relative;
    background: #FFF;
    overflow: hidden;position: absolute;
    top: 50%;
    left: 5px;
    color: #888;
    margin-top: -.5em;
    line-height: 1em;
    z-index: 9;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`

export const PlaceHolder = styled.span`position: absolute;
top: 50%;
left: 5px;
color: #888;
margin-top: -.5em;
line-height: 1em;
z-index: 9;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
width: 100%;`

export const ColoredPlaceHolder = styled.b`
`
