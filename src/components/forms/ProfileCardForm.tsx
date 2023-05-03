import react, { useState } from "react";
import { DarkOverlay } from "@styles/styled-components/styledDiv";
import { Card as AntdCard } from "antd";

interface ProfileCardFormProps {
  postFunction: (input: Record<string, unknown>) => void,
};

// Form for editing or adding for different fields in profile page
export const ProfileCardForm: React.FC = ({ postFunction }: ProfileCardFormProps) => {
  return (
    <DarkOverlay darkPercent={50}>
      <AntdCard>
        Mlem mlem
      </AntdCard>
    </DarkOverlay>
  );
};
