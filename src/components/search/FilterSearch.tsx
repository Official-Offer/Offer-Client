import { Select } from "antd";
import React from "react";

interface ISearch {
  placeholder: string;
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
                value: "Kiên Tô",
                label: "Kiên Tô",
              },
              {
                value: "Võ Thuấn",
                label: "Võ Thuấn",
              },
              {
                value: "Bảo Đặng",
                label: "Bảo Đặng",
              },
            ]
      }
    />
  );
};
