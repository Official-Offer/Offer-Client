import React from "react";
import { NextPage } from "next";
// import { JobDescription } from "@components/jobs";
import { useRouter } from "next/router";
import { JobDescription } from "@components/jobs/jobDesc";

const JobDesc: NextPage = (comp) => {
  const router = useRouter();

  return (
    <JobDescription
      onClick={() => {
        // router.push("/recruiter/postJobs/schoolSelect");
      }}
      // router.push("/recruiter/jobs");
      onBack={() => {
        router.back();
      }}
    />
  );
};
export default JobDesc;
