import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { useQuery } from "@tanstack/react-query";
import { getApprovedJobs, getRecruiterJobs, getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import router from "next/router";
import { ApprovedJobDataType, RecruiterJobDataType } from "@components/table/dataType";
import { ApprovedJobColumns, RecruiterJobColumns } from "@components/table/columnType";

const Jobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<RecruiterJobDataType[]>([]);
  const [dataset, setDataSet] = useState<RecruiterJobDataType[]>([]);
  const [searchChange, setSearchChange] = useState(false);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["jobs", searchChange],
    queryFn: getRecruiterJobs,
    onSuccess: async (jobs) => {
      console.log(jobs);
      setData(jobs);
      setDataSet(jobs);

      setSearchResults(jobs.map((job) => job.title));
    },
    onError: () => {},
  });

  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    // setData(dataset.filter((item) => item.title === value));
    const filteredData = dataset.filter((item) =>
      item.title?.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const handleVerifyJob = () => {
}
  const handleAddJob = () => {
    router.push("/advisor/postJobs/jobForm");
  };

  return (
    <div className="advisor">
      <h1 className="advisor-title">Công việc</h1>
      <div className="advisor-table">
        <BaseTable
          dataset={data}
          columns={RecruiterJobColumns}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleVerify={handleVerifyJob}
        //   handleAdd={handleAddJob}
          tableType={"AdvisorJobs"}
          isLoading={jobQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Jobs;
