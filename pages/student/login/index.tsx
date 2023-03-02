import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginForm from "@components/forms/LogInForm";

//create a next page for the student home page, code below
const LoginStudent: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          <h1>
            Bách Khoa Hà Nội
          </h1>
          <br/>
          <br/>
          <LoginForm
            onSubmit={(item) => {
              setEmail(item.email);
              setPassword(item.password);
              router.push({
                pathname: "/student",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginStudent;
