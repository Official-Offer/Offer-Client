import { getSchool, getSchoolList } from "@services/apiSchool";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

//create a next page for the student home page, code below
const Schools: NextPage = () => {
  const ApplicantTable = dynamic(() =>
    import("@components").then((mod: any) => mod.ApplicantTable)
  ) as any;

  const schoolQuery = useQuery({
    queryKey: "recruiter/schools",
    queryFn: getSchoolList,
    // onSuccess: (res) => setStudentDetails(res),
    onError: (err) => console.log(`Error: ${err}`),
  });

  console.log(schoolQuery.data);
  return (
    <div className="applicant">
      <h1 className="applicant-title">Trường</h1>
      <div className="filter-applicant"></div>
      <div className="applicant-table">
        <ApplicantTable />
      </div>
    </div>
  );
};

export default Schools;
