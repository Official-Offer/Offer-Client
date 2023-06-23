import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import FilterType from "@components/filter/TypeFilter";
import { FilterSearch } from "@components/search/FilterSearch";
import { TableRowSelection } from "antd/lib/table/interface";
import { ApplicantDataType } from "./dataType";

export const BaseTable: React.FC = ({
  dataset,
  columns,
  searchResults,
  handleFilterType,
  handleFilterSearch,
}: any) => {
  const rowSelection: TableRowSelection<ApplicantDataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  return (
    <div>
      <div className="applicant-filter">
        <div className="applicant-filter-name">
          <FilterSearch
            searchResults={searchResults}
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
      <Table rowSelection={{ ...rowSelection }} columns={columns} dataSource={dataset} />
    </div>
  );
};
