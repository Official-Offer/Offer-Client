import { BaseTable } from "@components/table/BaseTable";
import { StudentColumns } from "@components/table/columnType";
import { StudentDataType } from "@components/table/dataType";
import { getStudentsFromSchool } from "@services/apiStudent";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";

//create a next page for the student home page, code below
const Students: NextPage = () => {
  const [jobList, setJobList] = useState([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<StudentDataType[]>([]);
  const [dataset, setDataSet] = useState<StudentDataType[]>([]);
  const [school, setSchool] = useState<Number>(1);

  const studentQuery = useQuery(["jobs"], {
    queryFn: () => getStudentsFromSchool(school),
    onSuccess: (students) => {
      setData(students);
      setDataSet(students);

      setSearchResults(students.map((student) => student.name));
    },
    onError: (error) => console.log(`Error: ${error}`),
  });
  console.log(jobList);
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
    <div className="applicant">
      <h1 className="applicant-title">Học sinh</h1>
      <div>
        <h3>Xem hồ sơ của học sinh theo từng trường</h3>
        <br />
        <Select
          placeholder="Chọn trường"
          style={{ width: "100%" }}
          onSelect={(value) => {
            //convert value to number
            setSchool(Number(value));
            // setSchool(value);
          }}
        >
          <Select.Option value="1">UMass Amherst</Select.Option>
          <Select.Option value="2">Harvard</Select.Option>
          {/* <Select.Option value="tom">Tom</Select.Option> */}
        </Select>
      </div>
      <br />
      {school && (
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
      )}
    </div>
  );
};

export default Students;
