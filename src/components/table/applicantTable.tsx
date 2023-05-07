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
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
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
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
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

const dataset: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["resume"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["interview"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["accepted"],
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
    setData(dataset.filter((item) => values.map(value => item.tags.includes(value))));
  };

  return (
    <div>
      <div className="applicant-filter">
        <div className="applicant-filter-name">
          <ApplicantNameSearch
            onSearch={(value: any) => {
              handleFilterName(value);
            }}
          />
        </div>
        <div className="applicant-filter-type">
          <ApplicantTypeFilter
            onSearch={(value: any) => {
              handleFilterType(value);
            }}
          />
        </div>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
