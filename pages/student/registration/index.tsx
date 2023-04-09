import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { SchoolForm } from "@components/forms";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AppContext from "@components/AppContext";

//create a next page for the student home page, code below
const RegisterStudent: NextPage = () => {
  const router = useRouter();
  const [school, setSchool] = useState("");
  const context = useContext(AppContext);


  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          <h1>
            Bắt đầu sự nghiệp ngay khi
            <br />
            ngồi trên ghế nhà trường với Offer
          </h1>
          <SchoolForm
            onSubmit={(school) => {
              // setSchool(school);
              context.setSchool(school);
              router.push({
                pathname: "/student/registration/password",
                // query: { param: school },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
