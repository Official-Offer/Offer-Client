import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { unapprovedJobColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import { UnapprovedJobDataType } from "@components/table/dataType";
import router from "next/router";

//create a next page for the student home page, code below
const UnapprovedJobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<UnapprovedJobDataType[]>([]);
  const [dataset, setDataSet] = useState<UnapprovedJobDataType[]>([]);
  const [searchChange, setSearchChange] = useState(false);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["unapproved-job", searchChange],
    queryFn: getUnapprovedJobs,
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
    router.push('/recruiter/jobs/jobForm');
  }

  return (
    <div className="applicant">
      <h1 className="applicant-title">Công việc chưa được duyệt</h1>
      <div className="applicant-table">
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

export default UnapprovedJobs;
