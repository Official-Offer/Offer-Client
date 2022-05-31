import styled from 'styled-components';

export const ContentWrapper = styled.div`
    padding: 100px 25px;
`

export const AvatarWrapper = styled.div`
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 15px;
    gap: 30px;
    width: 346px;
    height: 445px;
    background: #FCFCFD;
    box-shadow: 0px 0px 60px rgba(34, 48, 82, 0.25);
    border-radius: 16px;
    flex: none;
    order: 0;
    flex-grow: 0;
`
export const AvatarContainer = styled.div`
width: 30%;
margin: 0 auto;

`
export const AvatarName = styled.p`
width: 210px;
height: 24px;

font-family: 'Circular Std';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 24px;
/* identical to box height, or 120% */

display: flex;
align-items: center;
text-transform: uppercase;

/* cl-text */

color: #223052;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`