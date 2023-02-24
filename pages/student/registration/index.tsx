import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import SchoolForm from "@components/forms/SchoolForm";
import { useRouter } from "next/router";

//create a next page for the student home page, code below
const RegisterStudent: NextPage = () => {
  const router = useRouter();

  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          <SchoolForm
            onSubmit={(school) => {
              router.push(`/student/registration/school/${school}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
