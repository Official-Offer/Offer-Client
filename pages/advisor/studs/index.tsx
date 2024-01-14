import { BaseTable } from "@components/table/BaseTable";
import { StudentColumns } from "@components/table/columnType";
import { StudentDataType } from "@components/table/dataType";
import { getStudentsFromSchool } from "@services/apiStudent";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, Switch } from "antd";
import { getCookie } from "cookies-next";
import { processedMajorList } from "@public/static/list";

//create a next page for the student home page, code below
const Students: NextPage = () => {
  const [jobList, setJobList] = useState([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<StudentDataType[]>([]);
  const [dataset, setDataSet] = useState<StudentDataType[]>([]);

  const [school, setSchool] = useState<Number>(getCookie("orgId") ? Number(getCookie("orgId")) : 1);

  const studentQuery = useQuery(["jobs"], {
    queryFn: () => getStudentsFromSchool(school),
    onSuccess: (students) => {
      setData(students);
      setDataSet(students);
      // console.log(students);
      setSearchResults(students.map((student: { name: any }) => student.name));
    },
    onError: (error) => console.log(`Error: ${error}`),
  });
  // console.log(jobList);
  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    const filteredData = dataset.filter(
      (item) => item.name?.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div className="applicant" style={{ backgroundColor: "transparent" }}>
      <h1 className="applicant-title">Học sinh</h1>
      <br />

      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={StudentColumns}
          placeholder={"Tìm học sinh"}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          tableType={"Students"}
          isLoading={studentQuery.isLoading}
          filters={[
            {
              label: "Tất cả ngành",
              options: processedMajorList,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Students;
