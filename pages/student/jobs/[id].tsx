import { NextPage } from "next";
import { useRouter } from "next/router";
import { nextReplaceUrl } from "next-replace-url";
import { useState, useRef } from "react";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import { getJobList } from "@services/apiJob";
import { FilterNavbar } from "@components/navbar/FilterNavbar";
import { JobCard } from "@components/card/JobCard";
import { JobContent } from "@components/main/JobContent";
import { BookmarkButton } from "@components/button/BookmarkButton";

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

  const [jobCardBookmarkClicked, setJobCardBookmarkClicked] = useState<boolean>(false);
  const [jobContentBookmarkClicked, setJobContentBookmarkClicked] = useState<boolean>(false);

  // Hooks
  const router = useRouter();
  const jobID = parseInt(router.query.id);

  const jobListQuery = useQuery({
    queryKey: "job-list",
    queryFn: getJobList,
    onSuccess: (res) => {
      // Push the selected job from the link to top for initial load (O(n))
      setJobList(res.sort((a,b) => a.id === jobID ? -1 : (b.id === jobID ? 1 : 0)));
      for (let i = 0; i < res.length; i++) {
        jobIndexList.set(res[i].id, i);
      }
      setActiveCardIndex(activeCardIndex ?? (jobID === 0 ? 0 : jobIndexList.get(jobID)));
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
                      bookmarkClicked={i === activeCardIndex ? jobCardBookmarkClicked : undefined}
                      setBookmarkClicked={i === activeCardIndex ? setJobCardBookmarkClicked : undefined}
                      setJobContentBookmarkClicked={i === activeCardIndex ? setJobContentBookmarkClicked : undefined}
                    />
                  </li>
                ))
              : 
                Array(8).fill(<li><Skeleton className="job-portal-list-loading" active/></li>)
            }
          </ul>
        </div>
        <div className="split-layout-main main-xl">
          <JobContent
            isLoading={jobListQuery.isLoading} 
            jobData={jobList?.[activeCardIndex]}
            bookmarkClicked={jobContentBookmarkClicked}
            setBookmarkClicked={setJobContentBookmarkClicked}
            setJobCardBookmarkClicked={setJobCardBookmarkClicked}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentJobs;