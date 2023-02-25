import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import PasswordForm from "@components/forms/PasswordForm";
import Image from "next/image";

//create a next page for the student home page, code below
const RegisterPassword: NextPage = () => {
  const router = useRouter();

  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          {/* <Image src="..;/"/> */}
          <h1>Bách Khoa Hà Nội</h1>
          <br />
          <br />
          <PasswordForm
            onSubmit={function (email: string): void {
                
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPassword;
