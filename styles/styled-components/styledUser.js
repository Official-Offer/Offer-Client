import styled from 'styled-components';

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
    gap: 30px;
    width: 346px;
    height: auto;
    background: #FCFCFD;
    box-shadow: 0px 0px 60px rgba(34, 48, 82, 0.25);
    border-radius: 16px;
    flex: none;
    /* order: 0; */
    flex-grow: 0;
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

