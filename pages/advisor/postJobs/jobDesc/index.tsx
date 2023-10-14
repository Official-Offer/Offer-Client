import { NextPage } from "next";
import { JobDescription } from "@components/jobs";
import { useRouter } from "next/router";
import React from "react";

const JobDesc: NextPage = () => {
  const router=useRouter();
  return <JobDescription onClick={()=>{
    router.push('/advisor/postJobs/schoolSelect');

  }} />;
};

export default JobDesc;
