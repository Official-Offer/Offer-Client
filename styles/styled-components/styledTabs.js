import styled from 'styled-components';

export const TabMain = styled.div `
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
export const TabMain_Sub = styled.a `
    color: #A1A1A1;
    align-items: center;
    border: 0px;
    border-radius: 6px;
    display: inline-flex;
    font-family: inherit;
    font-size: 11px;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0;
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