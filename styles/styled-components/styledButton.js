import styled from 'styled-components';

export const Button = styled.button `
    background-color: transparent;
    border: none;
    outline: none;
    &:focus {
        box-shadow: none;
        outline: none;
    }
`;
export const ButtonGradientBlue = styled.button `
    background-image: linear-gradient(to right, #058499 0%, #12d8fa 51%, #058499 100%);
    padding: 10px 25px;
    text-align: center;
    transition: 0.25s;
    background-size: 200% auto;
    color: white;
    border-radius: 10px;
    display: block;
    border: none !important;
    font-weight: bold;
    &:hover {
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        border: none !important;
        text-decoration: none;
    }
    &:disabled {
        opacity: 0.6;
        background-position: center;
    }
`;
export const ButtonBorderBlueTransparent = styled.div `
    background-color: transparent;
    padding: .375rem .75rem;
    border: 2px solid #058499;
    color: #058499;
    outline: none;
    display: inline-block;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    &:focus {
        box-shadow: none;
        outline: none;
    }
`;
export const ButtonBlueBold = styled.button `
    color: #FFF;
    display: inline-block;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    background: #011B20;
    border: 2px solid #058499;
    border-radius: 10px;
    padding: .375rem .75rem;
    font-size: 1rem;
    outline: none;
    transition: 0.25s;
    &:focus {
        outline: none;
    }
    &:hover {
        background: #058499;
    }
    &:disabled {
        background: #011B20;
        opacity: 0.6;
    }
`;
export const IconsCircle = styled.span `
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #FFF;
    background-color: transparent;
    color: #7d7d7d;
    display: flex;
    align-items: center;
    justify-content: center;
`;
