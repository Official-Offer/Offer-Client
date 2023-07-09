import ApplicantTypeFilter from "@components/filter/TypeFilter";
import { NextPage } from "next";
// import dynamic from "next/dynamic";
// import type { ColumnsType } from "antd/es/table";
// import { Space, Tag } from "antd";
import { BaseTable } from "@components/table/BaseTable";
import { schoolColumns, unapprovedJobColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { getJobList, getJobs, getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import router from "next/router";
import { CompanyDataType } from "@components/table/dataType";
import { getCompaniesForAdvisor } from "@services/apiCompany";

const Companies: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [dataset, setData] = useState<CompanyDataType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const companyQuery = useQuery({
    // queryKey: ["companies"],
    queryFn: getCompaniesForAdvisor,
    onSuccess: async (companies) => {
      setData(companies);

      var s: string[] = [];

      companies.forEach((company) => {
        s.push(company.name);
      });

      setSearchResults(s);
    },
    onError: () => {},
  });

  // console.log(jobQuery)



  const handleFilterSearch = (value: string) => {
    console.log(value);
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item.name === value));
  };

  // const handleAddJob = () => {
  //   router.push('/recruiter/jobs/jobForm');
  // }

  return (
    <div className="applicant">
      <h1 className="applicant-title">Danh sách công ty</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={dataset}
          columns={schoolColumns}
          // handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          // handleAdd={handleAddJob}
          tableType={"companies"}
          isLoading={companyQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Companies;