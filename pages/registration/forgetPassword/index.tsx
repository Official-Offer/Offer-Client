import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { EmailForm, FootnoteForm, PasswordForm } from "@components/forms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { useState } from "react";
import { forgetPassword } from "@services/apiUser";
import { BackwardOutlined } from "@ant-design/icons";
//create a next page for the student home page, code below
const ForgetPassword: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const state = useSelector((state: RootState) => state.account);
  const mutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: async (data: any) => {
      // console.log("email have been sent");
      queryClient.invalidateQueries({ queryKey: ["register"] });
      setSubmitted(true);
    },
    onError: (error: any) => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      setErrorMessage("Email không tồn tại.");
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
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSubmitted(false);
                }}
              >
                <BackwardOutlined /> Quay lại
              </p>
              <p style={{ color: "red" }}>
                Link để thay đổi mật khẩu đã được gửi đến email của bạn.
              </p>
            </>
          ) : (
            <>
              {" "}
              <h1>Quên Mật khẩu</h1>
              <EmailForm
                isLoading={mutation.isLoading}
                onSubmit={(email: string) => {
                  if (email) {
                    setErrorMessage("");
                    // console.log(email);
                    mutation.mutate({
                      email: email,
                    });
                  }
                }}
              />
              {errorMessage && (
                <p className="register-content-error">{errorMessage}</p>
              )}
            </>
          )}
          <br />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
