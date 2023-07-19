import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { schoolColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { useState } from "react";
import { getSchoolsForRecruiter } from "@services/apiSchool";
import { SchoolDataType } from "@components/table/dataType";

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


  const handleFilterType = (values: string[]) => {
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
    console.log(value);
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item.name === value));
  };


  return (
    <div className="applicant">
      <h1 className="applicant-title">Danh sách trường</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={schoolColumns}
          handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          tableType={"unapprovedJob"}
          isLoading={schoolQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Schools;