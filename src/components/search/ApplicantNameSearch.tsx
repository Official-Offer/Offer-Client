import { Select } from "antd";
import React from "react";

interface IApplicant {
  onSearch: (email: string) => void;
  // options: any;
}

export const ApplicantNameSearch: React.FC = ({ onSearch }: IApplicant) => {

  return (
    <Select
      className="filter-name"
      showSearch
      placeholder="Tìm ứng viên"
      optionFilterProp="children"
      onChange={onSearch}
      allowClear
      // onSearch={handleSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: "John Brown",
          label: "John Brown",
        },
        {
          value: "Jim Green",
          label: "Jim Green",
        },
        {
          value: "Joe Black",
          label: "Joe Black",
        },
      ]}
    />
  );
};
