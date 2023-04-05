import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import SchoolForm from "@components/forms/SchoolForm";
import { useRouter } from "next/router";
import AppContext from "@components/AppContext";
import { useContext } from "react";

//create a next page for the student home page, code below
const RegisterStudentSchool: NextPage = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  // console.log(rout/er.query);
  // xxx
  //add shi
  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          <h1>{router.query.school}</h1>
          <h2>{context.session}</h2>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudentSchool;
