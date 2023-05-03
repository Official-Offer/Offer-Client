import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { FootnoteForm, OrgForm } from "@components/forms";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { setCompany, setSchool, setRegisterEmail } from "@redux/slices/account";
import { Button } from "antd";
import {
  GoogleOutlined,
  MailOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import { signIn, useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { getUserList } from "@services/apiUser";
import { getSchoolList } from "@services/apiSchool";

//create a next page for the student home page, code below
const Auth: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.account);
  const { data: session, status } = useSession();
  const users = useQuery({ queryKey: ["users"], queryFn: getUserList });

  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    dispatch(setRegisterEmail(session.user?.email));
    if (
      users.data?.Response.filter(
        (d: { email: string }) => d.email == session.user?.email
      ).length > 0
    ) {
      //if email is in database, navigate to login page
      router.push("/student");
    } else {
      router.push("/registration/password");
    }
  }

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
          <Button
            className="school-btn"
            icon={<WindowsOutlined />}
            onClick={() => {
              signIn("azure-ad");
            }}
          >
            {" "}
            Đăng ký với email của trường {state.school}
          </Button>
          <Button
            className="btn"
            icon={<GoogleOutlined />}
            onClick={() => {
              signIn("google");
            }}
          >
            {" "}
            Đăng ký với Google{" "}
          </Button>
          <Button
            className="btn"
            icon={<MailOutlined />}
            onClick={() => router.push("/registration/email")}
          >
            {" "}
            Đăng ký bằng email thường{" "}
          </Button>
          <FootnoteForm embedLogin />
        </div>
      </div>
    </div>
  );
};

export default Auth;
