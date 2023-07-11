import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { unapprovedJobColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { approvedJobsAdvisors, getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import { UnapprovedJobDataType, approvedJobAdvisorDataType } from "@components/table/dataType";
import router from "next/router";

const ApprovedJobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<approvedJobAdvisorDataType[]>([]);
  const [dataset, setDataSet] = useState<approvedJobAdvisorDataType[]>([]);
  const [searchChange, setSearchChange] = useState(false);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["approved-jobs", searchChange],
    queryFn: approvedJobsAdvisors,
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

  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item.title === value));
  };

  const handleAddJob = () => {
    router.push('/advisor/jobs/jobForm');
  }

  return (
    <div className="advisor">
      <h1 className="advisor-title">Ứng viên</h1>
      <div className="advisor-table">
        <BaseTable
          dataset={data}
          columns={unapprovedJobColumns}
          handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleAdd={handleAddJob}
          tableType={"unapprovedJob"}
          isLoading={jobQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default ApprovedJobs;