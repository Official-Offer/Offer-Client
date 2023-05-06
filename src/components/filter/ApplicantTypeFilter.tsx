import React from "react";
import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

const options = [
  { value: "gold" },
  { value: "lime" },
  { value: "green" },
  { value: "cyan" },
];

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const ApplicantTypeFilter: React.FC = ({ ...props }) => (
  <div {...props}>
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      defaultValue={["gold", "cyan"]}
      options={options}
      className="filter-applicant"
    />
  </div>
);

export default ApplicantTypeFilter;
