import React, { useEffect } from "react";
import type { NextPage } from "next";
import { EmailForm } from "@components/forms/EmailForm";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getUserList } from "services/apiUser";
import { getSchoolList } from "services/apiSchool";
import { useDispatch } from "react-redux";
import { setRegisterEmail, setSchool } from "@redux/actions";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "antd";
import {
  GoogleCircleFilled,
  GoogleOutlined,
  GoogleSquareFilled,
  HeartOutlined,
} from "@ant-design/icons";

const Auth: NextPage = () => {
  const users = useQuery({ queryKey: ["users"], queryFn: getUserList });
  const schools = useQuery({ queryKey: ["schools"], queryFn: getSchoolList });
  // console.log(users);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      if (session.provider === "google") {
        var auth_token = session.auth_token;
        // backendapi(auth_token)
      }
    }
  }, [session]);

  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    // router.push("/student");
    if (
      users.data?.Response.filter(
        (d: { email: string }) => d.email == session.user?.email
      ).length > 0
    )
      router.push("/student");
    else router.push("/registration");
  }
  return (
    <div className="email">
      <div className="email-sideBar">
        <LeftPanel> </LeftPanel>
      </div>
      <div className="email-content">
        <h1 className="email-content-title"> Dang Ky </h1>
        <div className="email-content-form">
          <EmailForm
            onSubmit={(email) => {
              if (
                users.data?.Response.filter(
                  (data: { email: string }) => data.email == email
                ).length > 0
              ) {
                //if email is in database, navigate to login page
                router.push("/login");
              } else if (email.includes(".edu")) {
                const school = schools.data[email.split("@")[1]];
                //if email is not in database but have an .edu suffix, navigate to school page
                dispatch(setRegisterEmail(email));
                dispatch(setSchool(school));
                router.push(`/registration/password`);
              } else {
                //else, navigate to registration page
                dispatch(setRegisterEmail(email));
                router.push("/registration");
              }
              return;
            }}
            isLoading={users.isLoading || schools.isLoading}
          />
        </div>
        <Button icon={<GoogleOutlined />} onClick={() => signIn("google")}>
          {" "}
          Đăng nhập với Google{" "}
        </Button>
        <br/>
        <Button icon={<HeartOutlined />} onClick={() => signIn("azure-ad")}>
          {" "}
          Đăng nhập với Mircrosoft{" "}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
