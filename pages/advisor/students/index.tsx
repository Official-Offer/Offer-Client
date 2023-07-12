import ApplicantTypeFilter from "@components/filter/TypeFilter";
import { getJobListWithApplicant } from "@services/apiJob";
import { ApplicantCard, StyledBookmarkedCard } from "@styles/styled-components/styledBox";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

//create a next page for the student home page, code below
const Applicants: NextPage = () => {
  const [jobList, setJobList] = useState([]);
  const router = useRouter();
  const jobQuery = useQuery({
    queryKey: "jobs",
    queryFn: getJobListWithApplicant,
    onSuccess: (response) => setJobList(response),
    onError: (error) => console.log(`Error: ${error}`),
  });
  console.log(jobList);
  return (
    <div className="advisor">
      <h1 className="advisor-title">Học sinh</h1>
      <div className="advisor-table">
        {/* <ApplicantTable/> */}
        {jobList.map((job) => (
          <StyledBookmarkedCard
            applicant = {true}
            onClick={() => router.push(`/recruiter/applicants/${job.id}`)}
          >
            {/* <div className="applicant-card"> */}
              <div className="bookmarked-img" />
              <div className="bookmarked-body">
                <div className="bookmarked-body-title">
                  <h2>{job.title}</h2>
                </div>
                <div className="bookmarked-body-main">
                  <p>Số người ứng tuyển:</p>
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
