import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { schoolColumns } from "@components/table/columnType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getSchoolsForRecruiter } from "@services/apiSchool";
import { SchoolDataType } from "@components/table/dataType";
import { Avatar, Card } from "antd";
import { FilterSearch } from "@components/search/FilterSearch";
import { AntDesignOutlined } from "@ant-design/icons";

// SchoolDataType
//create a next page for the student home page, code below
const Schools: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<SchoolDataType[]>([]);
  const [dataset, setDataSet] = useState<SchoolDataType[]>([]);
  const schoolQuery = useQuery({
    queryKey: ["schools"],
    queryFn: () => getSchoolsForRecruiter(0),
    onSuccess: async (schools) => {
      console.log(schools);
      setData(schools);
      setDataSet(schools);
      setSearchResults(schools.map((school: any) => school.name));
    },
    onError: () => {},
  });

  // const handleFilterType = (values: string[]) => {
  //   if (values.length == 0) {
  //     setData(dataset);
  //     return;
  //   }
  //   setData(
  //     dataset.filter((item) => {
  //       if (!item.tag || values.length == 0) return false;
  //       for (let i = 0; i < values.length; i++) {
  //         if (values[i]?.label === item.name) return true;
  //       }
  //       return false;
  //     })
  //   );
  // };

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
      <h2>Trường</h2>
      <div className="recruiter-schools-search">
        <FilterSearch
          placeholder={"Tìm trường"}
          onSearch={(event: any) => {
            handleFilterSearch(event.target.value);
          }}
          searchResults={searchResults}
          size={"large"}
        />
      </div>
      <div className="recruiter-schools-grid">
        {data.map((school) => (
          <Card className="recruiter-schools-card">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              icon={<AntDesignOutlined />}
            />
            <div className="recruiter-schools-card-info">
              <b>{school.name}</b>
              <p>{school.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schools;
