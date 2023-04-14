import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { SchoolForm } from "@components/forms";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

//create a next page for the student home page, code below
const RegisterStudent: NextPage = () => {
  const router = useRouter();
  const [school, setSchool] = useState("");
  const dispatch = useDispatch();


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
              dispatch(setSchool(school));
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