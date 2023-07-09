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
import { getSchoolsForRecruiter } from "@services/apiSchool";
import { SchoolDataType } from "@components/table/dataType";

//create a next page for the student home page, code below
const Schools: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [dataset, setData] = useState<SchoolDataType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const schoolQuery = useQuery({
    queryKey: ["schools"],
    queryFn: getSchoolsForRecruiter,
    onSuccess: async (schools) => {
      setData(schools);

      var s: string[] = [];

      schools.forEach((school) => {
        s.push(school.name);
      });

      setSearchResults(s);
    },
    onError: () => {},
  });

  // console.log(jobQuery)


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
      <h1 className="applicant-title">Danh sách trường</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={dataset}
          columns={schoolColumns}
          handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          // handleAdd={handleAddJob}
          tableType={"unapprovedJob"}
          isLoading={schoolQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Schools;