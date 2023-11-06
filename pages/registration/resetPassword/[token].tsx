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
import { resetPassword } from "@services/apiUser";
import { SubmitButton } from "@components/button/SubmitButton";

//create a next page for the student home page, code below
const ChangePassword: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //extract token
  const { token } = router.query;
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (data) => {
      setSubmitted(true);
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
          {submitted ? (
            <>
              <h2 style={{ color: "Purple" }}>Mật khẩu thay đổi thành công.</h2>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <SubmitButton
                  text="Đăng nhập"
                  onClick={() => {
                    router.push("/login");
                  }}
                />
              </div>{" "}
            </>
          ) : (
            <div>
              <h1>Đặt lại Mật khẩu</h1>
              <PasswordForm
                isLoading={mutation.isLoading}
                onSubmit={(password: string) => {
                  console.log(password);
                  setSubmitted(true);
                  // mutation.mutate({
                  //   new_password: password,
                  //   confirm_password: password,
                  //   token,
                  // });
                }}
              />
              {errorMessage && (
                <p className="register-content-error">{errorMessage}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
