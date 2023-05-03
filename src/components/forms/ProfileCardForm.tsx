import react, { useState, useEffect, useRef } from "react";
import { DarkOverlay } from "@styles/styled-components/styledDiv";
import { Card as AntdCard, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface ProfileCardFormProps {
  title: string,
  isAdd: boolean,
  insertSet: (input: JSXElement) => void,
  postFunction: (input: Record<string, unknown>) => void,
};

// Form for editing or adding for different fields in profile page
export const ProfileCardForm: React.FC = ({ title, isAdd, insertSet, postFunction }: ProfileCardFormProps) => {
  const [clickOut, setClickOut] = useState(false);
  const [clickIn, setClickIn] = useState(false);
  const hideForm = () => insertSet(null);
  useEffect(() => {
    if (clickOut && !clickIn) {
      hideForm();
    }
    setClickOut(false);
    setClickIn(false);
  });

  return (
    <DarkOverlay onClick={() => setClickOut(true)} darkPercent={50}>
      <AntdCard
        className="profile-change-card"
        onClick={() => setClickIn(true)}
        title={
          <div className="main-panel-header">
            <h2>{(isAdd ? "Thêm " : "Chỉnh Sửa ") + title}</h2>
            <Button className="icon-btn" type="text" onClick={hideForm} icon={<CloseOutlined />} />
          </div>
        }
      >
        An array of HTML forms element
      </AntdCard>
    </DarkOverlay>
  );
};
