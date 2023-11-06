import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { EmailForm, FootnoteForm, PasswordForm } from "@components/forms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { useState } from "react";
import { forgetPassword } from "@services/apiUser";
//create a next page for the student home page, code below
const ForgetPassword: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const state = useSelector((state: RootState) => state.account);
  const mutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: async (data: any) => {
      console.log("email have been sent");
      queryClient.invalidateQueries({ queryKey: ["register"] });
      setSubmitted(true);
    },
    onError: (error: any) => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
  });

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <h1>Quên Mật khẩu</h1>
          <EmailForm
            onSubmit={(email: string) => {
              // console.log(email);
              mutation.mutate({
                email: email,
              });
            }}
          />
          {submitted && (
            <p style={{ color: "red" }}>
              Link để thay đổi mật khẩu đã được gửi đến email của bạn.
            </p>
          )}
          <br />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
