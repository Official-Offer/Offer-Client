import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import FilterType from "@components/filter/TypeFilter";
import { FilterSearch } from "@components/search/FilterSearch";
// import { TableRowSelection } from "antd/lib/table/interface";
// import { ApplicantDataType, UnapprovedJobDataType } from "./dataType";
// import { SubmitButton } from "@components/button/SubmitButton";
import { IconButton } from "@styles/styled-components/styledButton";
import {
  CheckCircleFilled,
  DeleteOutlined,
  MinusCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { TableRowSelection } from "antd/lib/table/interface";
import { useRouter } from "next/router";

type BaseTableProps = {
  dataset: any[];
  columns: ColumnsType<any>;
  searchResults: string[];
  handleFilterType?: (values: string[]) => void;
  handleFilterSearch?: (value: string) => void;
  handleAdd?: () => void;
  handleVerify?: (id: string, is_approved: boolean) => void;
  handleDelete?: () => void;
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
  handleDelete,
  placeholder,
  isLoading,
  tableType,
}) => {
  const router = useRouter();
  const [jobIDs, setJobIDs] = useState<string[]>([]);
  // const type = dataType = unapprovedJob? UnapprovedJobDataType : ''
  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows,
      // );
    },
    onSelect: (record, selected, selectedRows) => {
      // router.push(`/recruiter/applicants/${record.id}`)
      setJobIDs(selectedRows.map((row) => row.key.pk));
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setJobIDs(selectedRows.map((row) => row.key.pk));
      // console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <div>
      <div className="table-functions">
        <div className="table-functions-search">
          {handleFilterSearch && (
            <FilterSearch
              placeholder={placeholder ?? ""}
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
        {(handleAdd || handleVerify || handleDelete) && (
          <div className="table-functions-add">
            {handleVerify && (
              <IconButton
                round
                className=""
                backgroundColor={"#DE3163"}
                onClick={() => {
                  jobIDs.forEach((id) => {
                    handleVerify?.(id, false);
                  });
                }}
              >
                <div className="btn-body">
                  <span>Từ chối</span>
                  <span>
                    <MinusCircleFilled />
                  </span>
                </div>
              </IconButton>
            )}

            <IconButton
              round
              className=""
              backgroundColor={
                handleAdd ? "#D30B81" : handleDelete ? "#DE3163" : "#228B22"
              }
              onClick={
                handleAdd
                  ? handleAdd
                  : handleDelete
                    ? handleDelete
                    : () => {
                        jobIDs.forEach((id) => {
                          handleVerify?.(id, true);
                        });
                      }
              }
            >
              <div className="btn-body">
                <span>
                  {handleAdd
                    ? `Tạo công việc`
                    : handleDelete
                      ? `Xoá công việc`
                      : `Duyệt công việc`}
                </span>
                <span>
                  {handleAdd ? (
                    <PlusOutlined />
                  ) : handleDelete ? (
                    <DeleteOutlined />
                  ) : (
                    <CheckCircleFilled />
                  )}
                </span>
              </div>
            </IconButton>
          </div>
        )}
      </div>
      <Table
        rowSelection={handleVerify && rowSelection}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              if (
                tableType === "RecruiterJobs" ||
                tableType === "AdvisorJobs"
              ) {
                const role =
                  tableType === "RecruiterJobs" ? "recruiter" : "advisor";
                router.push(`/${role}/applicants/${record.key.pk}`);
              }
            }, // click row
          };
        }}
        columns={columns}
        dataSource={dataset}
        loading={isLoading}
      />
    </div>
  );
};
