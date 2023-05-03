import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { FootnoteForm, OrgForm } from "@components/forms";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { setCompany, setSchool } from "@redux/slices/account";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";

//create a next page for the student home page, code below
const RegisterStudent: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.account);

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {state.role.isStudent ? (
            <div>
              <h1>
                Bắt đầu sự nghiệp ngay khi
                <br />
                ngồi trên ghế nhà trường với Offer
              </h1>
            </div>
          ) : state.role.isAdvisor ? (
            <div>
              <h1>
                Quản lý hướng nghiệp cho học sinh
                <br />
                dễ dàng với Offer
              </h1>
            </div>
          ) : (
            <div>
              <h1>
                Tuyển những học sinh giỏi nhất
                <br />
                thuộc hệ thống 500 trường của Offer
              </h1>
            </div>
          )}
          <OrgForm
            onSubmit={(org) => {
              // setSchool(school);
              if (state.role.isStudent || state.role.isAdvisor) {
                dispatch(setSchool(org));
              } else {
                dispatch(setCompany(org));
              }
              router.push({
                pathname: "/registration/password",
              });
            }}
            isLoading={false}
          />
          <Button className = "btn" icon={<MailOutlined />} onClick={() => router.push('/registration/email')}>
            {" "}
            Đăng ký bằng email thường {" "}
          </Button>
          <br/>
          <Button className = "btn" icon={<GoogleOutlined />} onClick={() => signIn("google")}>
            {" "}
            Đăng ký với Google{" "}
          </Button>
          {/* <br/> */}
          <FootnoteForm embedLogin />
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
