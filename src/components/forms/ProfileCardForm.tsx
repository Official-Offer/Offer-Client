import react, { useState, useEffect, useRef } from "react";
import { DarkOverlay } from "@styles/styled-components/styledDiv";
import { Card as AntdCard, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface ProfileCardFormProps {
  title: string,
  isAdd: boolean,
  dialogRef: HTMLDialogElement,
  postFunction: (input: Record<string, unknown>) => void,
};

// Form for editing or adding for different fields in profile page
export const ProfileCardForm: React.FC = ({ title, isAdd, dialogRef, postFunction }: ProfileCardFormProps) => {
  return (
    <AntdCard
      className="profile-change-card"
      onClick={(event) => event.stopPropagation()}
      title={
        <div className="main-panel-header">
          <h2>{(isAdd ? "Thêm " : "Chỉnh Sửa ") + title}</h2>
          <Button className="icon-btn" type="text" onClick={() => dialogRef.current?.close()} icon={<CloseOutlined />} />
        </div>
      }
    >
      An array of HTML forms element
    </AntdCard>
  );
};
