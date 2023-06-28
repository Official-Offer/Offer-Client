import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TogglableButton } from "@styles/styled-components/styledButton";

type FilterNavbarProps = {
  filters: Record<string, unknown>[],
  searchFunc: () => void,
}

export const FilterNavbar: React.FC<FilterNavbarProps> = ({ filters, searchFunc }) => {
  const [filterArr, setFilterArr] = useState<Record<string, unknown>[]>(filters);

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newFilterArr = filterArr?.map((filter) => {
      if (filter.name === event.target.name) {
        return { ...filter, checked: !filter.checked };
      } else {
        return filter;
      }
    })
    setFilterArr(newFilterArr);
  };
  
  return (
    <div className="job-portal-container navbar">
      <Input
        className="search-bar"
        placeholder="Tìm Kiếm"
        prefix={<SearchOutlined />}
      />
      {
        filterArr?.map((filter) => (
          <TogglableButton
            name={filter.name}
            onClick={handleFilter}
            checked={filter.checked}
          >
            {filter.name}
          </TogglableButton>
        ))
      }
    </div>
  );
};
