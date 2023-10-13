import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { EmailForm, FootnoteForm, PasswordForm } from "@components/forms";
import { useMutation, useQueryClient } from "react-query";
import { setCookie } from "cookies-next";
import { registerStudent } from "services/apiStudent";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { useState } from "react";
import { registerAdvisor } from "@services/apiAdvisor";
import { registerRecruiter } from "@services/apiRecruiter";
import { SubmitButtonAntd } from "@styles/styled-components/styledButton";

//create a next page for the student home page, code below
const VerifyPassword: NextPage = () => {

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <h1 style={{ color: "red" }}>
            Email đã được xác nhận.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;
