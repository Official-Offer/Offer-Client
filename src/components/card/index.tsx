import React from "react";
import { Card as AntdCard } from "antd";
import { CardProps } from "antd/lib/card";

export const Card: React.FC<CardProps> = ({ className, children, ...rest }) => {
  return (
    <AntdCard className={className} {...rest}>
      {children}
    </AntdCard>
  );
};

export { InfoCard } from "./infoCard";
export { EventCard } from "./eventCard";
export { ProfileCard } from "./profileCard";