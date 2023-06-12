import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ApplicantTypeFilter from "@components/filter/ApplicantTypeFilter";
import { SearchBar } from "../search";
import { ApplicantNameSearch } from "@components/search/ApplicantNameSearch";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tag: string;
}

const dataset: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tag: "Vòng đơn",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tag: "Vòng phỏng vấn",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tag: "Đã nhận",
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Giai đoạn",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tag }) => {
      let color =
        tag === "Vòng đơn" ? "volcano" : tag === "Vòng phỏng vấn" ? "blue" : "green";
      return (
        <Tag color={color} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];


export const ApplicantTable: React.FC = () => {
  const [data, setData] = React.useState<DataType[]>(dataset);

  const handleFilterName = (value: string) => {
    console.log(value);
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item.name == value));
  };

  const handleFilterType = (values: string[]) => {
    console.log(values);
    if (values.length == 0) {
      setData(dataset);
      return;
    }
    setData(
      dataset.filter((item) => {
        if (!item.tag || values.length == 0) return false;
        for (let i = 0; i < values.length; i++) {
          if (values[i]?.label === item.tag) return true;
        }
        return false;
      })
    );
  };

  return (
    <div>
      <div className="applicant-filter">
        <div className="applicant-filter-name">
          <ApplicantNameSearch
            onSearch={(value: any) => {
              handleFilterName(value);
            }}
            // options={dataset.map((item) => item.name)}
          />
        </div>
        <div className="applicant-filter-type">
          <ApplicantTypeFilter
            onSearch={(_x: any, values: any) => {
              handleFilterType(values);
            }}
          />
        </div>
      </div>
      <Table className="table-applicant" columns={columns} dataSource={data} />
    </div>
  );
};
