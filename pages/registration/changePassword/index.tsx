import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { FootnoteForm, PasswordForm } from "@components/forms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { registerStudent } from "services/apiStudent";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { useState } from "react";
import { registerAdvisor } from "@services/apiAdvisor";
import { registerRecruiter } from "@services/apiRecruiter";

//create a next page for the student home page, code below
const ChangePassword: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [screen, setScreen] = useState("pw");
  const state = useSelector((state: RootState) => state.account);
  const [errorMessage, setErrorMessage] = useState("");
  const mutation = useMutation({
    mutationFn: registerStudent,
    onSuccess: async (data) => {
      return;
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    },
  });

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <h1>Đổi Mật khẩu</h1>
          <PasswordForm
            isLoading={mutation.isLoading}
            onSubmit={(password: string) => {
              console.log(state.email, password);
              mutation.mutate({
                email: state.email,
                password: password,
              });
            }}
          />
          {errorMessage && (
            <p className="register-content-error">{errorMessage}</p>
          )}
          <br />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
