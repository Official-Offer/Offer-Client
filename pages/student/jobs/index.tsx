import { NextPage } from "next";
import { useRouter } from "next/router";
import { nextReplaceUrl } from "next-replace-url";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input, Radio } from "antd";
import { getJobs } from "@services/apiJob";
import { InfoCard } from "@components/card/InfoCard";
import { useFilterJobs } from "@hooks/useFilterJobs";
import { useSortJobs } from "@hooks/useSortJobs";

const jobFilterArr = [
  {
    name: "Full/Part",
    checked: true,
  },
  {
    name: "Intern",
    checked: false,
  },
  {
    name: "1k+",
    checked: false,
  },
  {
    name: "On-campus",
    checked: false,
  },
];


const StudentJobs: NextPage = () => {
  const { filteredJobs, setJobs, setSearchTerm, setFilter } = useFilterJobs();

  const jobQuery = useQuery({
    queryKey: ["jobs list"],
    queryFn: getJobs,
    onSuccess: (jobData) => setJobs(jobData),
    onError: (error) => console.log(`Error: ${error}`),
    refetchOnWindowFocus: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === "") {
      setSearchTerm("");
    }
  }
  
  return (
    <div className="main">
      <div className="main__content">
        <section className="main-mt">
          <Input.Search
            className="gradient-antd-search"
            allowClear
            placeholder="Tìm công việc"
            enterButton="Tìm kiếm"
            size="large"
            onChange={handleChange}
            onSearch={(value: string) => setSearchTerm(value)}
          />
          <div className="hstack center">
            <Radio.Group
              defaultValue="related"
              buttonStyle="solid"
              size="large"
            >
              <Radio.Button value="all">Tất cả</Radio.Button>
              <Radio.Button value="related">Liên quan</Radio.Button>
            </Radio.Group>
            <Radio.Group
              buttonStyle="solid"
              size="large"
            >
              <Radio.Button value="posted">Ngày đăng</Radio.Button>
              <Radio.Button value="updated">Ngày cập nhật</Radio.Button>
              <Radio.Button value="salary-desc">Lương cao đến thấp</Radio.Button>
              <Radio.Button value="salary-asc">Lương thấp đến cao</Radio.Button>
            </Radio.Group>
          </div>
        </section>
        <section>
          <div className="layout-grid">
            {
              jobQuery.isLoading ? new Array(4).fill(<InfoCard loading />) : (
                filteredJobs.map((jobData) => <InfoCard info={jobData} />)
              )
            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentJobs;