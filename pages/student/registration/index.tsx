import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import SchoolForm from "@components/forms/SchoolForm";

//create a next page for the student home page, code below
const RegisterStudent: NextPage = () => {
  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel> </LeftPanel>
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
            <SchoolForm onSubmit={(school) => {}}/>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
