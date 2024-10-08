import styled from "styled-components";
import { Card as AntdCard } from "antd";
import { CardProps } from "antd/lib/card";
import { border, color, layout, space } from "styled-system";

export const Box = styled.div`
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

export const StyledNotiBox = styled.div<{ large: boolean; read: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ large }) => (large ? "24px" : "12px")};
  position: relative;
  background-color: ${({ read }) => (read ? "white" : "#FAD4E6")};
  transition: 0.2s;
  cursor: pointer;
  gap: ${({ large }) => (large ? "20px" : "16px")};

  &:hover {
    background-color: ${({ read }) => (read ? "#00000014" : "#F6AACD")};
  }

  .avatar {
    width: 48px;
    aspect-ratio: 1;
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
    background-color: ${({ read }) => (read ? "transparent" : "#D30B81")};
  }
`;

export const MessagePanel = styled.div`
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
  transition: 0.3s;

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
      background-color: #f1f1f1;
    }
  }
`;

export const MessageBox = styled.div<{ seen?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  position: relative;
  transition: 0.2s;
  cursor: pointer;
  gap: 10px;
  color: black;
  font-weight: ${({ seen }) => (seen ? "400" : "700")};
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
    background-color: ${({ seen }) => (seen ? "transparent" : "#D30B81")};
  }
`;

export const StyledResumeCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 200px;
  height: 250px;
  padding: 16px;
  color: white;
  border-radius: 8px;
  background: linear-gradient(180deg, #000000 0%, #313c49 100%);

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 20px;
  }

  .resume-star {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;

    &:hover {
      cursor: pointer;
    }
  }

  span {
    font-weight: 500;
  }
`;

export const StyledListCard = styled.div<{
  hasLink?: boolean;
  applicant?: boolean;
}>`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 8px;
  padding: ${({ hasLink }) => (hasLink ? "0px" : "24px")};
  background-color: ${({ applicant }) => (applicant ? "white" : "transparent")};
  margin-bottom: ${({ applicant }) => (applicant ? "20px" : "")};

  &:hover {
    backdrop-filter: brightness(0.90); 
    cursor: pointer;
    background-color: ${({ applicant }) =>
      applicant ? "#D9D9D9" : "transparent"};

    .close-btn {
        display: initial;
        font-weight: 700;
        cursor: pointer;
      }
    }
  }

  .link-wrapped {
    display: flex;
    align-items: center;
    padding: ${({ hasLink }) => (hasLink ? "24px" : "0px")};
    width: 100%;
  }

  .content {
    &-img {
      flex: 1;
      min-height: 120px;
      min-width: 170px;
      border-radius: 8px;
      background: gray;
      &-image{
        margin: 19px 15px;
        /* margin-top: 12px; */
        width: 80%;
        height: 80%;
        object-fit: cover;
        border-radius: 8px;
      }
    }

    &-body {
      flex: 5;
      margin: 0px 28px;
      
      &-title {
        margin-bottom: 4px;
      }

      &-main {
        font-size: 1rem;
        font-weight: 600;
        color: #7E7D7D;
        p { margin-bottom: 0px; }
      }
    }

    &-dates {
      flex: 1;
      min-width: 200px;
      color: white;
      font-weight: 700;
      text-align: center;
      padding: 16px;
      
      .date-posted {
        background-color: #7277F1;
        border-radius: 4px;
        padding: 2px;
        margin-bottom: 4px;
      }
      
      .date-saved {
        background-color: #F5510A;
        border-radius: 4px;
        padding: 2px;
      }
    }
  }
  
  .close-btn {
    display: none;
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 1rem;
  }
`;

type SearchDropdownProps = {
  background?: string;
};

export const SearchDropdown = styled(AntdCard)<CardProps & SearchDropdownProps>`
  text-align: center;

  ul {
    padding: 0;
    margin-bottom: 0;
    text-align: left;
    list-style: none;
    background: ${({ background }) => background};

    li {
      padding: 8px 24px;
      background: ${({ background }) => background};

      &:hover {
        cursor: pointer;
        filter: brightness(0.87);
      }
    }
  }

  span {
    padding: 8px 24px;
  }

  .ant-card-body {
    padding: 16px 0px;
  }
`;
