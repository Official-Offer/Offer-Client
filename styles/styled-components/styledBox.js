import styled from 'styled-components';

export const BoxALignItemsCenter_ResColumn = styled.div `
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const BoxALignItemsStart = styled.div `
  display: flex;
  align-items: start;
`;
export const BoxALignItemsCenter = styled.div `
  display: flex;
  align-items: center;
`;
export const BoxAlignItemsStart_FlexColumn = styled.div `
  display: flex;
  align-items: start;
  flex-direction: column;
`;
export const BoxAlignItemsEnd_FlexColumn = styled.div `
  display: flex;
  align-items: end;
  flex-direction: column;
`;
export const BoxALignCenter_Justify_ItemsCenter = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const BoxALignCenter_Justify_ItemsBetween = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const BoxALignCenter_Justify_ItemsAround = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const BoxALignCenter_Justify_ItemsStart = styled.div `
  display: flex;
  align-items: center;
  justify-content: start;
`;
export const BoxALignCenter_Justify_ItemsEnd = styled.div `
  display: flex;
  align-items: center;
  justify-content: end;
`;
export const BoxBlueBorderRounded = styled.div `
  border: 2px solid #058499;
  border-radius: 8px;
  background: #FCFCFD;
  box-shadow: 5px 0px 20px rgba(34, 48, 82, 0.25);
`;
export const BoxBlueBold = styled.div `
  background-color: #0A222B;
  border-radius: 10px;
`;
export const BoxWhiteShadow = styled.div `
  border-radius: 10px;
  box-shadow: 0px 5px 12px -1px rgba(0,0,0,0.75);
  background-color: #FFF;
`;
export const BoxWhiteShadowItem = styled.div `
  border-radius: 20px;
  background-color: #FFF;
  -webkit-box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75); 
  box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
`;

// Box NFT Items
const RenderedSizeImage = styled.div`
  width: 100%;
  height: 320px !important;
`;
export const BoxRelativeImage = styled(RenderedSizeImage)`
  position: relative;
  cursor: pointer;
`;
export const BoxRelativeImage_1 = styled.div`
  min-height: inherit;
  border-radius: inherit;
  height: 100%;
  width: 100%;
`;
export const BoxRelativeImage_2 = styled.div`
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  height: 100%;
  min-height: inherit;
  width: 100%;
  border-radius: inherit;
`;
export const BoxRelativeImage_3 = styled(RenderedSizeImage)`
  border-radius: inherit;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  img {
    object-fit: contain !important;
    width: auto !important;
    height: auto !important;
    border-radius: 6px !important;
    max-width: 100% !important;
    max-height: 100% !important;
    transition: opacity 400ms ease 0s;
  }
`;