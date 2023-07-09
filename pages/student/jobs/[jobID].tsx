import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
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
  const jobIndexList = new Map<number, number>();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Hooks
  const router = useRouter();
  let jobID = parseInt(router.query.jobID);

  const jobListQuery = useQuery({
    queryKey: "job-list",
    queryFn: getJobList,
    onSuccess: (res) => {
      setJobList(res);
      for (let i = 0; i < res.length; i++) {
        jobIndexList.set(res[i].id, i);
        console.log(res[i].id, i);
        console.log(jobIndexList);
      }
      console.log(jobID, jobIndexList.get(jobID));
      setActiveCardIndex(jobIndexList.get(jobID));
    },
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
              <li id={job.id}>
                <JobCard
                  jobData={job}
                  active={i === activeCardIndex} 
                  onClick={() => setActiveCardIndex(i)}
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
// export const getStaticPaths: GetStaticPaths = async () => {
//   const jobDataArr = await getJobList();
//   return {
//     paths: jobDataArr.map((jobData) => ({
//       params: {
//         jobID: jobData.id.toString()
//       },
//     })),
//     fallback: false
//   };
// };

// export const getStaticProps: GetStaticProps = ({ params }) => {
//   return {
//     props: {
//       jobID: params.jobID,
//     }
//   }
// }