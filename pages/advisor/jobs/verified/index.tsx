import ApplicantTypeFilter from "@components/filter/TypeFilter";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import type { ColumnsType } from "antd/es/table";
import { Space, Tag } from "antd";
import { BaseTable } from "@components/table/BaseTable";
import { unapprovedJobColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { getJobList, getJobs, getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import { UnapprovedJobDataType } from "@components/table/dataType";
import router from "next/router";

const UnapprovedJobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [dataset, setData] = useState<UnapprovedJobDataType[]>([]);
  const [isLoading, setLoading] = useState(false);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["unapproved-job"],
    queryFn: getUnapprovedJobs,
    onSuccess: async (jobs) => {
      setData(jobs);

      var s: string[] = [];

      jobs.forEach((job) => {
        s.push(job.title);
      });

      setSearchResults(s);
    },
    onError: () => {},
  });

  console.log(jobQuery)


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
    console.log(value);
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item.title === value));
  };

  const handleAddJob = () => {
    router.push('/recruiter/jobs/jobForm');
  }

  return (
    <div className="advisor">
      <h1 className="advisor-title">Ứng viên</h1>
      <div className="advisor-table">
        <BaseTable
          dataset={dataset}
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

export default UnapprovedJobs;