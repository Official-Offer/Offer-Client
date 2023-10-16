import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import FilterType from "@components/filter/TypeFilter";
import { FilterSearch } from "@components/search/FilterSearch";
// import { TableRowSelection } from "antd/lib/table/interface";
// import { ApplicantDataType, UnapprovedJobDataType } from "./dataType";
// import { SubmitButton } from "@components/button/SubmitButton";
import { IconButton } from "@styles/styled-components/styledButton";
import { CheckCircleFilled, PlusOutlined } from "@ant-design/icons";
import { TableRowSelection } from "antd/lib/table/interface";

type BaseTableProps = {
  dataset: IntrinsicAttributes[];
  columns: ColumnsType<IntrinsicAttributes>;
  searchResults?: string[];
  handleFilterType?: (values: string[]) => void;
  handleFilterSearch?: (value: string) => void;
  handleAdd?: () => void;
  handleVerify?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  tableType?: string;
};

export const BaseTable: React.FC<BaseTableProps> = ({
  dataset,
  columns,
  searchResults,
  handleFilterType,
  handleFilterSearch,
  handleAdd,
  handleVerify,
  placeholder,
  isLoading,
  tableType
}) => {
  // const type = dataType = unapprovedJob? UnapprovedJobDataType : ''
  const rowSelection: TableRowSelection<any> = {
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
  // console.log(searchResults)

  return (
    <div>
      <div className="table-functions">
        <div className="table-functions-search">
          {handleFilterSearch && (
            <FilterSearch
              placeholder={placeholder}
              onSearch={(event: any) => {
                handleFilterSearch(event.target.value);
              }}
              searchResults={searchResults}
            />
          )}
        </div>
        {/* <div className="table-functions-type">
          {handleFilterType && (
            <FilterType
              onSearch={(_x: any, values: any) => {
                handleFilterType(values);
              }}
            />
          )}
        </div> */}
        {(handleAdd || handleVerify) && (
          <IconButton
            round
            className="table-functions-add"
            backgroundColor={handleAdd ? "#D30B81" : "green"}
            onClick={handleAdd || handleVerify}
          >
            <div className="btn-body">
              <span>{handleAdd ? `Tạo công việc` : `Duyệt công việc`}</span>
              <span>
                {handleAdd ? <PlusOutlined /> : <CheckCircleFilled />}
              </span>
            </div>
          </IconButton>
        )}
      </div>
      <Table
        rowSelection={handleVerify && { ...rowSelection }}
        columns={columns}
        dataSource={dataset}
        loading={isLoading}
      />
    </div>
  );
};
