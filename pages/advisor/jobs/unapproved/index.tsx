import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { UnapprovedJobColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { getJobsForRecruiter, getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import { UnapprovedJobDataType } from "@components/table/dataType";
import router from "next/router";

//create a next page for the student home page, code below
const UnapprovedJobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  // data to be filtered/changed
  const [data, setData] = useState<UnapprovedJobDataType[]>([]);
  // original data that remains unchanged
  const [dataset, setDataSet] = useState<UnapprovedJobDataType[]>([]);
  const jobQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: getUnapprovedJobs,
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

  const handleVerifyJob = () => {
  }

  return (
    <div className="applicant">
      <h1 className="applicant-title">Công việc chưa duyệt</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={UnapprovedJobColumns}
          placeholder={"Tìm công việc"}
          // handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleVerify={handleVerifyJob}
          // handleAdd={handleAddJob}
          tableType={"UnapprovedJobs"}
          isLoading={jobQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default UnapprovedJobs;
