import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { RecruiterSchoolColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { getJobsForRecruiter } from "@services/apiJob";
import { useState } from "react";
import { RecruiterSchoolDataType } from "@components/table/dataType";
import router from "next/router";
import { getRecruitersForSchool } from "@services/apiRecruiter";

const Recruiters: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<RecruiterSchoolDataType[]>([]);
  const [dataset, setDataSet] = useState<RecruiterSchoolDataType[]>([]);

  const recruiterQuery = useQuery({
    queryKey: ["recruiter"],
    queryFn: getRecruitersForSchool,
    onSuccess: async (recruiters) => {
      setData(recruiters);
      setDataSet(recruiters);

      var s: string[] = [];

      recruiters.forEach((ret) => {
        s.push(ret.name);
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
          if (values[i]?.label === item.name) return true;
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
      <h1 className="applicant-title">Công việc</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={RecruiterSchoolColumns}
          handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleAdd={handleAddJob}
          tableType={"RecruiterJobs"}
          isLoading={recruiterQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Recruiters;
