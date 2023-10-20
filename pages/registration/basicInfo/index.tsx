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
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@services/apiUser";

//create a next page for the student home page, code below
const RegisterStudent: NextPage = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.account);
  const mutation = useMutation({
    // queryKey: ["register"],
    mutationFn: registerUser,
    onSuccess: async (data) => {
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
    },
  });

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {submitted ? (
            <h3 style={{ color: "purple" }}>
              Link xác nhận đã được gửi đến email của bạn, vui lòng check email
              để kích hoạt tài khoản.
            </h3>
          ) : (
            <>
              <div>
                <h1>Thông tin cơ bản</h1>
              </div>
              <OrgForm
                onSubmit={(org) => {
                  if (state.role.isStudent || state.role.isAdvisor) {
                    dispatch(setSchool(org));
                  } else {
                    dispatch(setCompany(org));
                  }
                  setSubmitted(true);
                }}
                isLoading={mutation.isLoading}
              />
              <FootnoteForm />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
