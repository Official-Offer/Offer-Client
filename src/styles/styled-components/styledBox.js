import styled from 'styled-components';
import { border, color, layout, space } from 'styled-system';

export const Box = styled.div `
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Card = styled.div`
  ${border}
  ${color}
  ${layout}
  ${space}
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

export const NotiBox = styled.div `
  display: flex;
  align-items: center;
  padding: 12px;
  position: relative;
  background-color: ${({seen}) => seen ? "white" : "#FAD4E6"};
  transition: 0.2s;
  cursor: pointer;
  gap: 10px;

  &:hover {
    background-color: ${({seen}) => seen ? "#00000014" : "#F6AACD"};
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .preview {
    display: -webkit-box;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    .preview-link {
      color: black;
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        content: "";
      }
    }
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({seen}) => seen ? "transparent" : "#D30B81"};
  }
`;

export const MessagePanel = styled.div `
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 308px;
  height: calc(100vh - 200px);
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px 8px 0px 0px;
  background-color: white;
  padding: 10px 0px;
  transition: 0.4s;

  &.mes-panel {
    &-open {
      transform: translateY(0);
    }
    &-hidden {
      transform: translateY(100%);
    }
  }

  .mes-search-bar {
    padding: 0px 12px;
    .search-bar {
      background-color: #F1F1F1;
    }
  }
`;

export const MessageBox = styled.div `
  display: flex;
  align-items: center;
  padding: 12px;
  position: relative;
  transition: 0.2s;
  cursor: pointer;
  gap: 10px;
  color: black;
  font-weight: ${({seen}) => seen ? "400" : "700"};
  max-height: 9rem;

  &:hover {
    background-color: #00000014;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .mes-preview {
    line-height: 1.75rem;
    overflow: hidden;
    flex: 1;

    &-sender {
      font-size: 1.05rem;
    }

    &-content {
      display: -webkit-box;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #0009;
    }
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({seen}) => seen ? "transparent" : "#D30B81"};
  }
`;