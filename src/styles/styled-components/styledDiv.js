import styled from "styled-components";

export const LeftPanel = styled.div`
  height: 100vh;
  /* theme */
  background: linear-gradient(180deg, #ea0a8e -10.74%, #7289da 121.39%);
  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

export const CenterPanel = styled.div`
  height: 100vh;
  /* theme */
  background: linear-gradient(180deg, #acb6e5 -10.74%, #86fde8 121.39%);
  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

export const RightPanel = styled.div`
  height: 100vh;
  /* theme */
  background: linear-gradient(180deg, #f12711 -10.74%, #f5af19 121.39%);
  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

export const DarkOverlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0, ${({darkPercent}) => darkPercent / 100});
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
`;