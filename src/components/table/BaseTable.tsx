import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import FilterType from "@components/filter/TypeFilter";
import { FilterSearch } from "@components/search/FilterSearch";
import { TableRowSelection } from "antd/lib/table/interface";
import { ApplicantDataType, UnapprovedJobDataType } from "./dataType";
import { SubmitButton } from "@components/button/SubmitButton";
import { StyledAddButton } from "@styles/styled-components/styledButton";

export const BaseTable: React.FC = ({
  dataset,
  columns,
  searchResults,
  handleFilterType,
  handleFilterSearch,
  handleAdd,
  dataType,
  isLoading,
}: any) => {
  // const type = dataType = unapprovedJob? UnapprovedJobDataType : ''
  const rowSelection: TableRowSelection<ApplicantDataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
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
      <div className="table-functions">
        <div className="table-functions-search">
          <FilterSearch
            searchResults={searchResults}
            onSearch={(value: any) => {
              handleFilterSearch(value);
            }}
            // options={dataset.map((item) => item.name)}
          />
        </div>
        <div className="table-functions-type">
          <FilterType
            onSearch={(_x: any, values: any) => {
              handleFilterType(values);
            }}
          />
        </div>
        {handleAdd && (
          <StyledAddButton className="table-functions-add" onClick={handleAdd}>
            Tạo công việc
          </StyledAddButton>
        )}
      </div>
      <Table
        rowSelection={{ ...rowSelection }}
        columns={columns}
        dataSource={dataset}
        loading={isLoading}
      />
    </div>
  );
};
