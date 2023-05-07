import { Select } from "antd";
import React from "react";

interface IApplicant {
  onSearch: (email: string) => void;
  isLoading: boolean;
}

export const ApplicantNameSearch: React.FC = ({ onSearch, isLoading }: IApplicant) => {
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleSearch = (value: string) => {
    console.log("search:", value);
    onSearch(value);
  };

  return (
    <Select
      className="filter-name"
      showSearch
      placeholder="Tìm ứng viên"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={handleSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: "jack",
          label: "Jack",
        },
        {
          value: "lucy",
          label: "Lucy",
        },
        {
          value: "tom",
          label: "Tom",
        },
      ]}
    />
  );
};
