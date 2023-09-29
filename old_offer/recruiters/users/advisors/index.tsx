import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { AdvisorCompanyColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { useState } from "react";
import { AdvisorCompanyDataType } from "@components/table/dataType";
import router from "next/router";
import { getAdvisorsForCompany } from "@services/apiAdvisor";

const Advisors: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<AdvisorCompanyDataType[]>([]);
  const [dataset, setDataSet] = useState<AdvisorCompanyDataType[]>([]);
  // DataType[]
  const advisorQuery = useQuery({
    queryKey: ["advisors"],
    queryFn: getAdvisorsForCompany,
    onSuccess: async (advisors) => {
      setData(advisors);
      setDataSet(advisors);

      var s: string[] = [];

      advisors.forEach((advisor) => {
        s.push(advisor.name);
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
          if (values[i]?.label === item.contacted) return true;
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
      <h1 className="applicant-title">Công việc</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={AdvisorCompanyColumns}
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
