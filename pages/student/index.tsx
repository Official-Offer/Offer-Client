import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { useQuery } from "@tanstack/react-query";
import { Button, Card as AntdCard, Input, Popover, Radio, Select, Slider, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { EventCard, InfoCard } from "@components/card";
import { getStudentDetails } from "@services/apiStudent";
import { getUserDetails } from "@services/apiUser";
import { getJobs } from "@services/apiJob";
import { useDisplayJobs } from "@hooks/useDisplayJobs";
import { translateJobType } from "@utils/formatters/translateFormat";
import type { Job } from "src/types/dataTypes";
import type { JobFilters } from "src/types/filterTypes";
import type { RadioChangeEvent } from "antd/lib/radio";

const DHBK = {
  name: "Đại Học Bách Khoa Hà Nội",
  cover: "https://cafefcdn.com/203337114487263232/2022/9/9/photo-1-1662692607178636727514.jpg",
  logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png",
};

const eventList = [
  {
    name: "HackHer",
    institution: "University of Massachusetts at Amherst",
    location: "Amherst",
    attribute: "",
    commonSchool: [],
    date: new Date('2023-2-27'),
  },
];

const clubList = [
  {
    id: 0,
    name: "Marketing Member",
    institution: "CLB Doi Ngoai DHNT ",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    date: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
];

const scholarshipList = [
  {
    name: "Chancellor's Award",
    institution: "University of Massachusetts at Amherst",
    location: "Amherst",
    attribute: "$16,000",
    commonSchool: [],
    date: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
];

//create a next page for the student home page, code below
const Home: NextPage = () => {
  // States
  const { displayedJobs, setJobs, setSearchTerm, filters, sort, setFilters, setSort } = useDisplayJobs();

  const jobQuery = useQuery({
    queryKey: ["jobs list"],
    queryFn: getJobs,
    onSuccess: (jobData: Record<string, any>) => setJobs(jobData.message),
    onError: (error) => console.log(`Error: ${error}`),
    refetchOnWindowFocus: false,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === "") {
      setSearchTerm("");
    }
  };

  const handleFilter = (filterArr: string[], filterType: number) => { // default | 0: job_type, 1: work_type, 2: location
    setFilters((filters: JobFilters) => {
      let filterDict = filters.jobTypes;

      if (filterType === 1) filterDict = filters.workTypes;
      if (filterType === 2) filterDict = filters.locations;

      Object.keys(filterDict).forEach((key) => filterDict[key] = filterArr.includes(key));
      return { ...filters };
    });
  }

  const handleFilterSalary = (value: number[]) => {
    setFilters((filters: JobFilters) => {
      const salary = filters.salary;
      salary[0] = value[0];
      salary[1] = value[1];
      return { ...filters };
    });
  }

  const handleSort = (event: React.ChangeEvent<HTMLInputElement> | RadioChangeEvent) => {
    setSort(event.target.value);
  };

  const removeSort = (value: string) => {
    if (value === sort) {
      setSort("")
    }
  }
  
  const { data: session, status } = useSession();
  console.log(session);
  
  return (
    <main className="main">
      <div className="main__content">
        <section>
          <AntdCard
            className="uni-cover"
            cover={<img src={DHBK.cover} alt={DHBK.name}/>}
            children={
              <div className="cover-spacing">
                <div className="card-logo">
                  <img alt={"Logo of " + DHBK.name} src={DHBK.logo} />
                </div>
                <div className="logo-spacing"></div>
                <h2>{DHBK.name}</h2>
              </div>
            }
          />
        </section>
        <section className="main-mt">
          <h2 className="header">Tìm công việc mơ ước của bạn</h2>
          <Input.Search
            className="gradient-antd-search"
            allowClear
            placeholder="Tìm công việc"
            enterButton="Tìm kiếm"
            size="large"
            onChange={handleSearchChange}
            onSearch={(value: string) => setSearchTerm(value)}
          />
          <Space direction="vertical" className="justify-center">
            <Space wrap align="center" className="justify-center">
              <Select
                mode="multiple"
                showArrow
                size="large"
                placeholder="Địa điểm"
                className="round-border"
                onChange={(value) => handleFilter(value, 2)}
                options={Object.keys(filters.locations).map((location) => ({ value: location, label: location }))}
              />
              <Select
                mode="multiple"
                showArrow
                size="large"
                placeholder="Hình thức làm việc"
                className="round-border"
                onChange={(value) => handleFilter(value, 0)}
                options={Object.keys(filters.jobTypes).map((jobType) => ({ value: jobType, label: translateJobType(jobType) }))}
              />
              <Select
                mode="multiple"
                showArrow
                size="large"
                placeholder="Mô hình làm việc"
                className="round-border"
                onChange={(value) => handleFilter(value, 1)}
                options={Object.keys(filters.workTypes).map((workType) => ({ value: workType, label: translateJobType(workType) }))}
              />
              <Popover
                content={
                  <div className="layout-medium layout-hstack-stretch-center">
                    <span>{filters.salary[0]}</span>
                    <span>
                      <Slider 
                        range
                        min={2000}
                        max={4000}
                        step={100}
                        defaultValue={filters.salary}
                        onChange={handleFilterSalary}
                      />
                    </span>
                    <span>{filters.salary[1]}</span>
                  </div>
                }
                trigger="hover"
                placement="bottom"
              >
                <Button 
                  size="large"
                  className="round-border right-icon"
                >
                  <span>
                    Mức lương
                  </span>
                  <span><DownOutlined/></span>
                </Button>
              </Popover>
            </Space>
            <Space wrap align="center" className="justify-center">
              <Radio.Group
                defaultValue="related"
                buttonStyle="solid"
                size="large"
              >
                <Space.Compact className="round-border">
                  <Radio.Button value="all">Tất cả</Radio.Button>
                  <Radio.Button value="related">Liên quan</Radio.Button>
                </Space.Compact>
              </Radio.Group>
                <Radio.Group
                  buttonStyle="solid"
                  size="large"
                  value={sort}
                  onChange={handleSort}
                >
                  <Space.Compact className="round-border">
                    <Radio.Button value="date-posted" onClick={() => removeSort("date-posted")}>Ngày đăng</Radio.Button>
                    <Radio.Button value="date-updated" onClick={() => removeSort("date-updated")}>Ngày cập nhật</Radio.Button>
                    <Radio.Button value="salary-desc" onClick={() => removeSort("salary-desc")}>Lương cao đến thấp</Radio.Button>
                    <Radio.Button value="salary-asc" onClick={() => removeSort("salary-asc")}>Lương thấp đến cao</Radio.Button>
                  </Space.Compact>
                </Radio.Group>
            </Space>
          </Space>
        </section>
        <section>
          <div className="layout-grid">
            {
              jobQuery.isLoading ? new Array(4).fill(<InfoCard loading />) : (
                displayedJobs.map((jobData) => <InfoCard info={jobData} />)
              )
            }
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;