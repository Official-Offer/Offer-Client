import React from "react";
import { NextPage } from "next";
import { JobDescription } from "@components/jobs";
import { useRouter } from "next/router";

const JobDesc: NextPage = (comp) => {
  const router = useRouter();

  return (
    <JobDescription
      onClick={() => {
        router.push("/recruiter/postJobs/schoolSelect");
      }}
      onBack={() => {
        router.back();
        // router.push("/recruiter/postJobs/jobForm");
      }}
    />
  );
};
export default JobDesc;
