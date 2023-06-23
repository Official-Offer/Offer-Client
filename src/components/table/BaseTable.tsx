import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import FilterType from "@components/filter/TypeFilter";
import { FilterSearch } from "@components/search/FilterSearch";

export const BaseTable: React.FC = ({
  dataset,
  columns,
  handleFilterType,
  handleFilterSearch,
}: any) => {
  return (
    <div>
      <div className="applicant-filter">
        <div className="applicant-filter-name">
          <FilterSearch
            searchResults={["1", "2"]}
            onSearch={(value: any) => {
              handleFilterSearch(value);
            }}
            // options={dataset.map((item) => item.name)}
          />
        </div>
        <div className="applicant-filter-type">
          <FilterType
            onSearch={(_x: any, values: any) => {
              handleFilterType(values);
            }}
          />
        </div>
      </div>
      <Table columns={columns} dataSource={dataset} />
    </div>
  );
};
