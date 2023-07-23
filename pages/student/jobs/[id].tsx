import { NextPage } from "next";
import { useRouter } from "next/router";
import { nextReplaceUrl } from "next-replace-url";
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
  const [jobIndexList, setJobIndexList] = useState<Map<number, number>>(new Map<number, number>());
  const [activeCardIndex, setActiveCardIndex] = useState();

  // Hooks
  const router = useRouter();
  const jobID = parseInt(router.query.id);

  const jobListQuery = useQuery({
    queryKey: "job-list",
    queryFn: getJobList,
    onSuccess: (res) => {
      // Push the selected job from the link to top for initial load (O(n))
      setJobList(activeCardIndex ? res : res.sort((a,b) => a.id === jobID ? -1 : (b.id === jobID ? 1 : 0)));
      for (let i = 0; i < res.length; i++) {
        jobIndexList.set(res[i].id, i);
      }
      setActiveCardIndex(activeCardIndex ?? jobIndexList.get(jobID));
      setJobIndexList(jobIndexList);
    },
    onError: (err) => console.log(`Job List Error: ${err}`),
  })

  // Functions
  const updatePage = (id: number) => {
    setActiveCardIndex(jobIndexList.get(id));
    nextReplaceUrl("id", `${id}`);
  };

  return (
    <div>
      <FilterNavbar filters={jobFilterArr}/>
      <div className="job-portal split-layout no-padding">
        <div className="split-layout-main main-sm">
          <ul className="job-portal-list">
            <li className="job-portal-list-result">
              {
                jobListQuery.isLoading ? "Đang tải..." :
                  `${jobList?.length ?? "Không có"} kết quả`
              }
            </li>
            {
              // If the jobs are still loading, show the skeletons
              !jobListQuery.isLoading
              ? 
                jobList.map((job, i) => (
                  <li id={job.id}>
                    <JobCard
                      jobData={job}
                      active={i === activeCardIndex} 
                      onClick={() => updatePage(job.id)}
                    />
                  </li>
                ))
              : 
                Array(8).fill(<li><Skeleton className="job-portal-list-loading" active/></li>)
            }
          </ul>
        </div>
        <div className="split-layout-main main-xl">
          <JobDescription 
            isLoading={jobListQuery.isLoading} 
            jobData={jobList?.[activeCardIndex]} 
          />
        </div>
      </div>
    </div>
  );
};

export default StudentJobs;