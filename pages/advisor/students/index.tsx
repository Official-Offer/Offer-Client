import { BaseTable } from "@components/table/BaseTable";
import { StudentColumns } from "@components/table/columnType";
import { StudentDataType } from "@components/table/dataType";
import { getStudentsFromSchool } from "@services/apiStudent";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//create a next page for the student home page, code below
const Students: NextPage = () => {
  const [jobList, setJobList] = useState([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<StudentDataType[]>([]);
  const [dataset, setDataSet] = useState<StudentDataType[]>([]);

  const studentQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: getStudentsFromSchool,
    onSuccess: (students) => {
      setData(students);
      setDataSet(students);

      setSearchResults(students.map(student=>student.name));
    },
    onError: (error) => console.log(`Error: ${error}`),
  });
  console.log(jobList);
  const handleFilterSearch = (value: string) => {
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
    <div className="applicant">
      <h1 className="applicant-title">Học sinh</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={StudentColumns}
          placeholder={"Tìm học sinh"}
          // handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          tableType={"Students"}
          isLoading={studentQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Students;
