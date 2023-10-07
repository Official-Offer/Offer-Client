import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { schoolColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { useState } from "react";
import { getSchoolsForRecruiter } from "@services/apiSchool";
import { SchoolDataType } from "@components/table/dataType";
import { Avatar, Card } from "antd";
import { FilterSearch } from "@components/search/FilterSearch";
import { AntDesignOutlined } from "@ant-design/icons";

//create a next page for the student home page, code below
const Schools: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<SchoolDataType[]>([]);
  const [dataset, setDataSet] = useState<SchoolDataType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const schoolQuery = useQuery({
    // queryKey: ["schools"],
    queryFn: getSchoolsForRecruiter,
    onSuccess: async (schools) => {
      setData(schools);
      setDataSet(schools);

      var s: string[] = [];

      schools.forEach((school) => {
        s.push(school.name);
      });

      setSearchResults(s);
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
    setData(dataset.filter((item) => item.name === value));
  };

  const schools = [
    { name: "Bach Khoa", desc: "trường đại học kỹ thuật" },
    { name: "Ngoai Thuong", desc: "trường đại học kỹ thuật" },
    { name: "Kinh Te Quoc Dan", desc: "trường đại học kỹ thuật" },
    { name: "UMass", desc: "trường đại học kỹ thuật" },
    { name: "HSGS", desc: "trường đại học kỹ thuật" },
  ];

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
        />
      </div>
      <div className="recruiter-schools-grid">
        {schools.map((school) => (
          <Card className="recruiter-schools-card">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              icon={<AntDesignOutlined />}
            />
            <div className="recruiter-schools-card-info">
              <b>{school.name}</b>
              <p>{school.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schools;
