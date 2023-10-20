import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { JobColumns } from "@components/table/columnType";
import { useQuery } from "@tanstack/react-query";
import { getJobsForRecruiter } from "@services/apiJob";
import { useState } from "react";
import { JobDataType } from "@components/table/dataType";
import router from "next/router";

//create a next page for the student home page, code below
const Jobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  // data to be filtered/changed
  const [data, setData] = useState<JobDataType[]>([]);
  // original data that remains unchanged
  const [dataset, setDataSet] = useState<JobDataType[]>([]);
  const jobQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobsForRecruiter,
    onSuccess: async (jobs) => {
      setData(jobs);
      setDataSet(jobs);
      setSearchResults(jobs.map(job=>job.title));
    },
    onError: () => {},
  });

  //reimplemented search
  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    const filteredData = dataset.filter(item =>
      item.title?.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const handleAddJob = () => {
    router.push('/recruiter/postJobs/jobForm');
  }

  return (
    <div className="applicant">
      <h1 className="applicant-title">Công việc</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={JobColumns}
          placeholder={"Tìm công việc"}
          // handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleAdd={handleAddJob}
          tableType={"RecruiterJobs"}
          isLoading={jobQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Jobs;
