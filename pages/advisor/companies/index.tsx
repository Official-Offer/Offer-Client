import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { companyColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { useState } from "react";
import { CompanyDataType } from "@components/table/dataType";
import { getCompaniesForAdvisor } from "@services/apiCompany";

const Companies: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<CompanyDataType[]>([]);
  const [dataset, setDataSet] = useState<CompanyDataType[]>([]);
  const companyQuery = useQuery({
    // queryKey: ["companies"],
    queryFn: getCompaniesForAdvisor,
    onSuccess: async (companies) => {
      setData(companies);
      setDataSet(companies)

      var s: string[] = [];

      companies.forEach((company) => {
        s.push(company.name);
      });

      setSearchResults(s);
    },
    onError: () => {},
  });

  const handleFilterSearch = (value: string) => {
    console.log(value);
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item.name === value));
  };

  return (
    <div className="advisor">
      <h1 className="advisor-title">Danh sách công ty</h1>
      <div className="advisor-table">
        <BaseTable
          dataset={data}
          columns={companyColumns}
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