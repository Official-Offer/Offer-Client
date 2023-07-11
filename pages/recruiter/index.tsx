import { ClockCircleOutlined } from "@ant-design/icons";
import { GeneralSearch } from "@components/search/GeneralSearch";
import { BaseTable } from "@components/table/BaseTable";
import { unapprovedJobColumns } from "@components/table/columnType";
import { UnapprovedJobDataType } from "@components/table/dataType";
import { getUnapprovedJobs } from "@services/apiJob";
import { Avatar, Badge, Space } from "antd";
import Card from "antd/lib/card/Card";
import Meta from "antd/lib/card/Meta";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
// import dynamic from "next/dynamic";

//create a next page for the student home page, code below
const Recruiter: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<UnapprovedJobDataType[]>([]);
  const [dataset, setDataSet] = useState<UnapprovedJobDataType[]>([]);
  const [searchChange, setSearchChange] = useState(false);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["unapproved-job", searchChange],
    queryFn: getUnapprovedJobs,
    onSuccess: async (jobs) => {
      setDataSet(jobs);

      var s: string[] = [];

      jobs.forEach((job) => {
        s.push(job.title);
      });

      setSearchResults(s);
    },
    onError: () => {},
  });

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

  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item.title === value));
  };

  return (
    <div className="recruiter-dashboard">
      <div className="recruiter-dashboard-header">
        <div className="recruiter-dashboard-badges">
          <Space size="middle">
            <Badge count={5}>
              <Avatar shape="square" size="large" />
            </Badge>
            <Badge count={0} showZero>
              <Avatar shape="square" size="large" />
            </Badge>
            <Badge count={<ClockCircleOutlined style={{ color: "#f5222d" }} />}>
              <Avatar shape="square" size="large" />
            </Badge>
          </Space>
        </div>
        <div className="recruiter-dashboard-searchBar">
          <GeneralSearch hidden={false} />
        </div>
      </div>
      <div>
        <h2>Xin Chào Bạn</h2>
      </div>
      <div className="recruiter-dashboard-mainStats">
        <div className="recruiter-dashboard-graph">
          <Card loading={false}>
            <Meta
              style={{ height: "250px" }}
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              }
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
        <div className="recruiter-dashboard-applicants">
        <Card loading={false}>
            <Meta
              style={{ height: "75px" }}
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              }
              title="Card title"
              description="This is the description"
            />
            <br/>
            <Meta
              style={{ height: "75px" }}
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              }
              title="Card title"
              description="This is the description"
            />
            <br/>
            <Meta
              style={{ height: "75px" }}
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              }
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
      </div>
      <div>
        <h2>Số liệu</h2>
      </div>
      <div className="recruiter-dashboard-addStats">
        <div className="recruiter-dashboard-g1">
        <Card loading={false}>
            <Meta
              style={{ height: "250px" }}
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              }
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
        <div className="recruiter-dashboard-g2">
        <Card loading={false}>
            <Meta
              style={{ height: "250px" }}
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              }
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
        <div className="recruiter-dashboard-g3">
        <Card loading={false}>
            <Meta
              style={{ height: "250px" }}
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              }
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
      </div>
      <div className="applicant-table">
        <div className="recruiter-dashboard-searchBar">
          <h2>Công Việc</h2>
          <h1>Xem thêm</h1>
        </div>
        <div className="recruiter-dashboard-searchBar">
          <BaseTable
            dataset={dataset}
            columns={unapprovedJobColumns}
            handleFilterType={handleFilterType}
            handleFilterSearch={handleFilterSearch}
            searchResults={searchResults}
            // handleAdd={handleAddJob}
            tableType={"unapprovedJob"}
            isLoading={jobQuery.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
