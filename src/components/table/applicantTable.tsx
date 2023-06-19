import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ApplicantTypeFilter from "@components/filter/ApplicantTypeFilter";
import { SearchBar } from "../search";
import { ApplicantNameSearch } from "@components/search/ApplicantNameSearch";
import { useQuery } from "react-query";
import { getApplicants } from "@services/apiStudent";
import { JobDescription } from '../main/EventContent';

interface DataType {
  ID: string | null;
  name: string | null;
  school: string | null;
  major: string | null;
  expected_graduation: string | null;
  tag: string | null;
}

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
    title: "Trường",
    dataIndex: "school",
    key: "school",
  },
  {
    title: "Ngành học",
    dataIndex: "major",
    key: "major",
  },
  {
    title: "Năm tốt nghiệp",
    dataIndex: "expected_graduation",
    key: "expected_graduation",
  },
  {
    title: "Giai đoạn",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tag }) => {
      let color =
        tag === "Vòng đơn"
          ? "volcano"
          : tag === "Vòng phỏng vấn"
          ? "blue"
          : "green";
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
        <a>Xem CV</a>
        <a>Xoá</a>
      </Space>
    ),
  },
];

export const ApplicantTable: React.FC = (props) => {
  const [applicantList, setApplicantList] = useState<string[]>([]);
  const [dataset, setData] = React.useState<DataType[]>([]);
  // DataType[]
  const { jobID } = props;
  console.log(jobID);
  const jobQuery = useQuery({
    queryKey: ["jobID"],
    queryFn: () => getApplicants(jobID),
    onSuccess: async (res) => {
      console.log(res)
      res.forEach((student) => {
        // console.log(student)
        setApplicantList([
          ...applicantList,
          student.name || "No name"
        ])
        setData([
          ...dataset,
          {
            ID: student.user.id,
            name: student.name || "No name",
            school: student.default_school?.name || "No School",
            major: student.major,
            expected_graduation: student.expected_graduation,
            tag: "Vòng đơn",
          },
        ]);
      });
    },
    onError: () => {},
  });
  // console.log(dataset);

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
            names={applicantList}
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
      <Table
        className="table-applicant"
        columns={columns}
        dataSource={dataset}
      />
    </div>
  );
};
