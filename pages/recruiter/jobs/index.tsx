import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { JobColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { getJobsForRecruiter } from "@services/apiJob";
import { useState } from "react";
import { JobDataType } from "@components/table/dataType";
import router from "next/router";

//create a next page for the student home page, code below
const Jobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<JobDataType[]>([]);
  const [dataset, setDataSet] = useState<JobDataType[]>([]);
  // const [searchChange, setSearchChange] = useState(false);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobsForRecruiter,
    onSuccess: async (jobs) => {
      setData(jobs);
      setDataSet(jobs);

      var s: string[] = [];

      jobs.forEach((job) => {
        s.push(job.title);
      });

      setSearchResults(s);
    },
    onError: () => {},
  });

  //reimplement filters
  const handleFilterType = (values: string[]) => {
    console.log(values);
    if (values.length == 0) {
      setData(dataset);
      return;
    }
    setData(
      dataset.filter((item) => {
        if (!item.tag || values.length == 0) return false;
        for (let i = 0; i < values.length; i++) {
          if (values[i]?.label === item.tag) return true;
        }
        return false;
      })
    );
  };

  //reimplement search
  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    const filteredData = dataset.filter(item =>
      item.title?.includes(value)
    );
    setData(filteredData);
    // setData(dataset.filter((item) => item.title === value));
  };

  const handleAddJob = () => {
    router.push('/recruiter/jobs/jobForm');
  }

  return (
    <div className="applicant">
      <h1 className="applicant-title">Công việc</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={JobColumns}
          handleFilterType={handleFilterType}
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
