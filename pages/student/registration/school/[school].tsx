import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import SchoolForm from "@components/forms/SchoolForm";
import { useRouter } from "next/router";

//create a next page for the student home page, code below
const RegisterStudentSchool: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          <h1>{router.query.school}</h1>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudentSchool;
