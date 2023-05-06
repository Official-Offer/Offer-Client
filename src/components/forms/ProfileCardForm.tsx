import react, { useState, useEffect, useRef } from "react";
import { DarkOverlay } from "@styles/styled-components/styledDiv";
import { Card as AntdCard, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface ProfileCardFormProps {
  fieldTitle: string,
  isAdd: boolean,
  dialogRef: HTMLDialogElement,
  fieldItemProps: {
    labelToAPI: Record<string, string>,
    APItoLabel: Record<string, string>,
    isRequired: Record<string, boolean>,
  },
  queryItemList: Record<string, unknown>[],
  postFunction: (input: Record<string, unknown>) => void,
};

// Form for editing or adding for different fields in profile page
export const ProfileCardForm: React.FC = ({ fieldTitle, isAdd, dialogRef, fieldItemProps, queryItemList, postFunction }: ProfileCardFormProps) => {
  return (
    <AntdCard
      className="profile-change-card"
      onClick={(event) => event.stopPropagation()}
      title={
        <div className="main-panel-header">
          <h2>{(isAdd ? "Thêm " : "Chỉnh Sửa ") + fieldTitle}</h2>
          <Button className="icon-btn" type="text" onClick={() => dialogRef.current?.close()} icon={<CloseOutlined />} />
        </div>
      }
    >
      An array of HTML forms element
    </AntdCard>
  );
};
