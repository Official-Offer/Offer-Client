import React from "react";
import { Card as AntdCard } from "antd";
import { CardProps } from "antd/lib/card";

export const Card: React.FC<CardProps> = ({ className, title, children, cover, ...rest }) => {
  return (
    <AntdCard className={className} title={title} cover={cover} bordered={false}>
      {children}
    </AntdCard>
  );
};
