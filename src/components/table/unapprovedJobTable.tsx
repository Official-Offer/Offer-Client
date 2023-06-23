import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import TypeFilter from "@components/filter/ApplicantTypeFilter";
import { FilterSearch } from "@components/search/FilterSearch";

export const BaseTable: React.FC = ({
  dataset,
  columns,
  handleFilterType,
  handleFilterTitle,
}: any) => {
  return (
    <div>
      <div className="applicant-filter">
        <div className="applicant-filter-name">
          <FilterSearch
            searchResults={["1", "2"]}
            onSearch={(value: any) => {
              handleFilterTitle(value);
            }}
            // options={dataset.map((item) => item.name)}
          />
        </div>
        <div className="applicant-filter-type">
          <TypeFilter
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
