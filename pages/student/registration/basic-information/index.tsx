import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import BasicInfoForm from "@components/forms/BasicInfoForm";
import AppContext from "@components/AppContext";
import { useContext } from "react";
import { useQuery } from "react-query";
import { getUserDetails } from "services/apiUser";

//create a next page for the student home page, code below
const RegisterBasicInfo: NextPage = () => {
  const router = useRouter();
  const userDetail = useQuery({ queryKey: ["user-details"], queryFn: getUserDetails });

  console.log(userDetail);
  
  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          <h1>Xác nhận thông tin cơ bản</h1>
          <br />
          <BasicInfoForm
            onSubmit={function (email: string): void {
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterBasicInfo;
