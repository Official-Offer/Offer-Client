import React from "react";
import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { FootnoteForm, OrgForm } from "@components/forms";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { setCompany, setRole, setSchool } from "@redux/slices/account";
import { Form, Input, Segmented } from "antd";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";
import { registerUser } from "@services/apiUser";

//create a next page for the student home page, code below
const RegisterStudent: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.account);
  const [role, setRol] = useState<string>("student");
  const { data: session, status } = useSession();
  const mutation = useMutation({
    // queryKey: ["register"],
    mutationFn: registerUser,
    onSuccess: async (data) => {
      // Invalidate and refetch
      // setCookie("access_token", data.token);
      router
        .push({
          pathname: state.role.isStudent
            ? "/student"
            : state.role.isAdvisor
            ? "/advisor"
            : "/recruiter",
        })
        .then(() => {
          router.reload();
        });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      // setErrorMessage("Sai tên đăng nhập hoặc mật khẩu");
    },
  });

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
          <OrgForm
            onSubmit={(org) => {
              if (role == "student" || role == "advisor") {
                dispatch(setSchool(org));
              } else {
                dispatch(setCompany(org));
              }
            }}
            isLoading={mutation.isLoading}
          />
          <FootnoteForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
