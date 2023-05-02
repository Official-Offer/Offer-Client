import react, { useState } from "react";
import { DarkOverlay } from "@styles/styled-components/styledDiv";
import { Card as AntdCard } from "antd";

interface ProfileInfoFormProps {
  postFunction: ({
    id: number,
    description: string,
    start_date: string,
    end_date: string,
    is_current: boolean,
    title: string,
    location: string,
    student: number,
    company: number
  }) => void,
};

export const ProfileInfoForm: React.FC = ({ postFunction }: ProfileInfoFormProps) => {
  return (
    <DarkOverlay>
      <AntdCard>
        Mlem mlem
      </AntdCard>
    </DarkOverlay>
  );
};
