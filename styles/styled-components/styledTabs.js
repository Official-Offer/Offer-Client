import styled from 'styled-components';

export const TabMain = styled.div `
    background-color: white;
    border-radius: 8px;
    display: inline-flex;
    border: 2px solid #058499;
    width: auto;
    .active {
        background-color: #058499;
        color: white;
        font-weight: 600;
        transition: 0.25s;
        &:hover {
            color: white;
        }
    }
`;
export const TabMain_Sub = styled.a `
    color: black;
    align-items: center;
    border-radius: 6px;
    display: inline-flex;
    font-family: inherit;
    font-size: 10px;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0;
    transition: 0.25s;
    height: 30px;
    padding: 0px 15px;
    &:hover {
        color: #058499;
    }
`;

export const NavMain = styled.div `
    background-color: transparent;
    border-radius: 8px;
    display: inline-flex;
    width: auto;
    
    .active {
        padding: 5px 15px;
        background-color: #058499;
        font-weight: 600;
        color: #FFF;
        &:hover {
            color: white;
        }
        box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.75);
    }
`;

export const Nav_Sub = styled.a `
    align-items: center;
    border-radius: 6px;
    display: inline-flex;
    font-family: inherit;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: 0.05em;
    line-height: 1;
    opacity: 1;
    outline: 0;
    transition: 0.25s;
    height: 37px;
    margin: 8px;
    padding: 5px 10px;
    &:hover {
        color: #058499;
    }
`;

export const ToggleMain = styled.div `
    background-color: transparent;
    border-radius: 8px;
    display: inline-flex;
    border: 2px solid #058499;
    width: auto;
    .active {
        background-color: #058499;
        color: white;
        font-weight: 600;
        transition: 0.25s;
        &:hover {
            color: white;
        }
    }
`;
export const ToggleMain_Sub = styled.a `
    align-items: center;
    border-radius: 6px;
    display: inline-flex;
    font-family: inherit;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0;
    width: 110px;
    font-family: "Circular Std";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #223052;
    @media screen and (max-width: 766px) {
        width: 46vw;
    }
    transition: 0.25s;
    height: 37px;
    padding: 0px 10px;
    &:hover {
        color: #058499;
    }
`;
export const SectionHeader = styled.h2`
    font-weight: bold;
`
export const AdDiv = styled.div`
width: 32px;
    height: 14px;
    left: 0px;
    top: 0px;
`

export const AdTag = styled.button`
    /* Button */
    background: linear-gradient(95.79deg, #642B73 0.9%, #C5426E 99.55%);
    border-radius: 10px 0px;
`
export const AdText = styled.p`
position: absolute;
width: 19px;
height: 14px;
left: 7px;
top: 0px;

font-family: 'Nunito';
font-style: normal;
font-weight: 700;
font-size: 10px;
line-height: 16px;
`