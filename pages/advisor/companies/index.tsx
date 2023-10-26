import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CompanyDataType } from "@components/table/dataType";
import { getCompaniesForAdvisor } from "@services/apiCompany";
import { FilterSearch } from "@components/search/FilterSearch";
import { Avatar, Card } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { LoadingLine } from "@components/loading/LoadingLine";

const Companies: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<CompanyDataType[]>([]);
  const [dataset, setDataSet] = useState<CompanyDataType[]>([]);
  const companyQuery = useQuery({
    queryKey: ["companies"],
    queryFn: getCompaniesForAdvisor,
    onSuccess: (companies) => {
      setData(companies);
      setDataSet(companies);
      setSearchResults(companies.map((company) => company.name));
    },
    onError: () => {},
  });

  const handleFilterSearch = (value: string) => {
    console.log(value);
    if (!value) {
      setData(dataset);
      return;
    }
    const filteredData = dataset.filter((item) =>
      item.name?.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div className="recruiter-schools">
      <h2>Công Ty</h2>
      <div className="recruiter-schools-search">
        <FilterSearch
          placeholder={"Tìm công ty"}
          onSearch={(event: any) => {
            handleFilterSearch(event.target.value);
          }}
          searchResults={searchResults}
          size={"large"}
        />
      </div>
      <div className="recruiter-schools-grid">
        {data.map((company) => (
          // <LoadingLine loading={companyQuery.isLoading}>
            <Card className="recruiter-schools-card">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
              />
              <div className="recruiter-schools-card-info">
                <b>{company.name}</b>
                <p>{company.description}</p>
              </div>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default Companies;
