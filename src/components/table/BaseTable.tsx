import React, { useState } from "react";
import { Popconfirm, Space, Table, Tag, message, notification } from "antd";
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
  EditFilled,
  EditOutlined,
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
  handleEdit?: () => void;
  handleDelete?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  tableType?: string;
};
type NotificationType = "success" | "info" | "warning" | "error";

export const BaseTable: React.FC<BaseTableProps> = ({
  dataset,
  columns,
  searchResults,
  handleFilterType,
  handleFilterSearch,
  handleAdd,
  handleVerify,
  handleDelete,
  handleEdit,
  placeholder,
  isLoading,
  tableType,
}) => {
  const router = useRouter();
  const [jobIDs, setJobIDs] = useState<string[]>([]);
  const [api, contextHolder] = notification.useNotification();
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

  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log(e);
    // message.success('Xoá công việc thành công');
    handleDelete?.();
  };

  const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log(e);
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
        {(handleAdd || handleVerify || handleDelete || handleEdit) && (
          <div className="table-functions-add">
            {handleVerify && (
              <>
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
                <IconButton
                  round
                  className=""
                  backgroundColor={"#228B22"}
                  onClick={() => {
                    jobIDs.forEach((id) => {
                      handleVerify?.(id, true);
                    });
                  }}
                >
                  <div className="btn-body">
                    <span>Duyệt công việc</span>
                    <span>
                      <CheckCircleFilled />
                    </span>
                  </div>
                </IconButton>
              </>
            )}

            {handleEdit && (
              <IconButton
                round
                className=""
                backgroundColor={"orange"}
                onClick={() => {
                  handleEdit?.();
                }}
              >
                <div className="btn-body">
                  <span>Sửa công việc</span>
                  <span>
                    <EditFilled />
                  </span>
                </div>
              </IconButton>
            )}

            {handleAdd && (
              <IconButton
                round
                className=""
                backgroundColor={"#D30B81"}
                onClick={handleAdd}
              >
                <div className="btn-body">
                  <span>Tạo công việc</span>
                  <span>
                    <PlusOutlined />
                  </span>
                </div>
              </IconButton>
            )}

            {handleDelete && (
              <Popconfirm
                title="Bạn có chắc chắn muốn xoá công việc này?"
                // description="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Có"
                cancelText="Không"
              >
                <IconButton
                  round
                  className=""
                  backgroundColor={"#D30B81"}
                  onClick={() => {}}
                >
                  <div className="btn-body">
                    <span>Xoá công việc</span>
                    <span>
                      <DeleteOutlined />
                    </span>
                  </div>
                </IconButton>
              </Popconfirm>
            )}
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
      {contextHolder}
    </div>
  );
};
