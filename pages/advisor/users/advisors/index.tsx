import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { AdvisorSchoolColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { useState } from "react";
import { AdvisorSchoolDataType } from "@components/table/dataType";
import router from "next/router";
import { getAdvisorForSchool } from "@services/apiAdvisor";

const Advisors: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<AdvisorSchoolDataType[]>([]);
  const [dataset, setDataSet] = useState<AdvisorSchoolDataType[]>([]);
  // DataType[]
  const advisorQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: getAdvisorForSchool,
    onSuccess: async (events) => {
      setData(events);
      setDataSet(events);

      var s: string[] = [];

      events.forEach((event) => {
        s.push(event.name);
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
    setData(dataset.filter((item) => item.name === value));
  };

  const handleAddJob = () => {
    router.push('/recruiter/jobs/jobForm');
  }

  return (
    <div className="applicant">
      <h1 className="applicant-title">Danh sách cố vấn của trường</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={AdvisorSchoolColumns}
          handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleAdd={handleAddJob}
          tableType={"RecruiterJobs"}
          isLoading={advisorQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Advisors;
