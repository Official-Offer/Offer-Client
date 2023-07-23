import { BaseTable } from "@components/table/BaseTable";
import { StudentColumns } from "@components/table/columnType";
import { StudentDataType } from "@components/table/dataType";
import { getStudentsFromSchool } from "@services/apiStudent";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

//create a next page for the student home page, code below
const Students: NextPage = () => {
  const router = useRouter();

  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<StudentDataType[]>([]);
  const [dataset, setDataSet] = useState<StudentDataType[]>([]);
  // DataType[]
  const studentQuery = useQuery({
    queryKey: ["students"],
    queryFn: getStudentsFromSchool,
    onSuccess: async (students) => {
      // console.log(applicants);
      setData(students);
      setDataSet(students);
      var s: string[] = [];

      students.forEach((std) => {
        s.push(std.name);
      });

      setSearchResults(s);
    },
    onError: () => {},
  });

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

  return (
    <div className="advisor">
      <h1 className="advisor-title">Ứng viên</h1>
      <div className="advisor-table">
        <BaseTable
          dataset={data}
          columns={StudentColumns}
          handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          isLoading={studentQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Students;
