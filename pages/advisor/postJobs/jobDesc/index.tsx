import React from "react";
import { NextPage } from "next";
// import { JobDescription } from "@components/jobs";
import { useRouter } from "next/router";
import { JobDescription } from "@components/jobs/jobDesc";

const JobDesc: NextPage = () => {
  const router = useRouter();
  return (
    <JobDescription
      onClick={() => {
        router.push("/advisor/postJobs/schoolSelect");
        // router.push("/advisor/jobs");
      }}
      onBack={() => {
        router.back();
        // router.push("/advisor/postJobs/jobForm");
      }}
    />
  );
};

export default JobDesc;
