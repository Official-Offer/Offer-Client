import ApplicantTypeFilter from "@components/filter/TypeFilter";
import { getJobListWithApplicant } from "@services/apiJob";
import { StyledBookmarkedCard } from "@styles/styled-components/styledBox";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

//create a next page for the student home page, code below
const Applicants: NextPage = () => {
  const [jobList, setJobList] = useState([]);
  const ApplicantTable = dynamic(() =>
    import("@components").then((mod: any) => mod.ApplicantTable)
  ) as any;
  const router = useRouter();
  const jobQuery = useQuery({
    queryKey: "jobs",
    queryFn: getJobListWithApplicant,
    onSuccess: (response) => setJobList(response),
    onError: (error) => console.log(`Error: ${error}`),
  });
  console.log(jobList);
  return (
    <div className="applicant">
      <h1 className="applicant-title">Ứng viên</h1>
      <div className="applicant-table">
        {/* <ApplicantTable/> */}
        {jobList.map((job) => (
          <StyledBookmarkedCard
            onClick={() => router.push(`/recruiter/applicants/${job.id}`)}
          >
            {/* <div className="applicant-card"> */}
              <div className="bookmarked-img"></div>
              <div className="bookmarked-body">
                <div className="bookmarked-body-title">
                  <h2>{job.title}</h2>
                </div>
                <div className="bookmarked-body-main">
                  <p>Number of applicants:</p>
                  <p>{job.applicants.length}</p>
                </div>
              </div>
            {/* </div> */}
          </StyledBookmarkedCard>
        ))}
      </div>
    </div>
  );
};

export default Applicants;
