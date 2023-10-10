import React from "react";
import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { FootnoteForm, OrgForm } from "@components/forms";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { setCompany, setRole, setSchool } from "@redux/slices/account";
import { Segmented } from "antd";
import { useState } from "react";

//create a next page for the student home page, code below
const RegisterStudent: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.account);
  const [role, setRol] = useState<string>("student");

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <div>
            <h1>Thông tin cơ bản</h1>
          </div>
          <br />
          <div>Chọn vai trò</div>
          <Segmented
            options={["advisor", "recruiter", "student"]}
            onResize={undefined}
            onResizeCapture={undefined}
            onChange={(value) => {
              setRol(value.toString());
              const role = {
                isStudent: value.toString() == "student",
                isAdvisor: value.toString() == "advisor",
                isRecruiter: value.toString() == "recruiter",
              };
              dispatch(setRole(role));
            }}
          />
          <OrgForm
            onSubmit={(org) => {
              if (role == "student" || role == "advisor") {
                dispatch(setSchool(org));
              } else {
                dispatch(setCompany(org));
              }
              router.push({
                pathname: "/registration/auth",
              });
            }}
            isLoading={false}
          />
          <FootnoteForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
