import React from "react";
import { NextPage } from "next";
import { JobDescription } from "@components/jobs";
import { useRouter } from "next/router";

const JobDesc: NextPage = () => {
  const router = useRouter();
  return (
    <JobDescription
      onClick={() => {
        router.push("/advisor/postJobs/schoolSelect");
      }}
    />
  );
};

export default JobDesc;
