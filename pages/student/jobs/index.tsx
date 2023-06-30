import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import { getJobList } from "@services/apiJob";
import { FilterNavbar } from "@components/navbar/FilterNavbar";
import { JobCard } from "@components/card/JobCard";
import { JobDescription } from "@components/main/JobContent";

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
  // States
  const [jobList, setJobList] = useState<Record<string, unknown>[]>();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Hooks
  const jobListQuery = useQuery({
    queryKey: "job-list",
    queryFn: getJobList,
    onSuccess: (res) => setJobList(res),
    onError: (err) => console.log(`Job List Error: ${err}`),
  })

  return (
    <div>
      <FilterNavbar filters={jobFilterArr} />
      <div className="job-portal split-layout no-padding">
        <div className="split-layout-main main-sm">
          <ul className="job-portal-list">
            <li className="job-portal-list-result">
              {
                jobListQuery.isLoading ? "Đang tải..." :
                  `${jobList?.length ?? "Không có"} kết quả`
              }
            </li>
            {jobList ? jobList.map((job, i) => (
              <li>
                <JobCard
                  jobData={job}
                  active={i===activeCardIndex} 
                  onClick={()=>setActiveCardIndex(i)}
                />
              </li>
            )) : Array(8).fill(<li><Skeleton className="job-portal-list-loading" active/></li>)}
          </ul>
        </div>
        <div className="split-layout-main main-xl">
          <JobDescription isLoading={jobListQuery.isLoading} jobData={jobList?.[activeCardIndex]} />
        </div>
      </div>
    </div>
  );
};

export default StudentJobs;
