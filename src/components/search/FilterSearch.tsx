import { Select } from "antd";
import React from "react";

interface ISearch {
  onSearch: (email: string) => void;
  searchResults: string[];
  // options: any;
}

export const FilterSearch: React.FC = ({
  placeholder,
  onSearch,
  searchResults,
}: ISearch) => {
  return (
    <Select
      className="filter-name"
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onSearch}
      allowClear
      // onSearch={handleSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={
        searchResults
          ? searchResults.map((n) => ({
              value: n,
              label: n,
            }))
          : [
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
            ]
      }
    />
  );
};
