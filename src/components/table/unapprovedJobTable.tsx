import React from "react";
import { Space, Table, Tag } from "antd";
import ApplicantTypeFilter from "@components/filter/ApplicantTypeFilter";
import { SearchBar } from "../search";
import { ApplicantNameSearch } from "@components/search/ApplicantNameSearch";
import { useQuery } from "react-query";
import { getJobList } from "@services/apiJob";

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tag: string;
// }

// const columns: ColumnsType<DataType> = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//   },
//   {
//     title: "Tags",
//     key: "tags",
//     dataIndex: "tags",
//     render: (_, { tag }) => {
//       let color =
//         tag === "resume" ? "green" : tag === "interview" ? "blue" : "volcano";
//       return (
//         <Tag color={color} key={tag}>
//           {tag.toUpperCase()}
//         </Tag>
//       );
//     },
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];


export const BaseTable: React.FC = () => {
  const jobQuery = useQuery({
    queryKey: "recruiter/unapproved-jobs",
    queryFn: getJobList,
    // onSuccess: (res) => setStudentDetails(res),
    onError: (err) => console.log(`Error: ${err}`)
  });

  console.log(jobQuery)
  
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
