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
import { setID } from "@redux/actions";
import { Alert, notification } from "antd";
type NotificationType = 'success' | 'info' | 'warning' | 'error';

//create a next page for the student home page, code below
const ResetPassword: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const { token } = router.query;
  // console.log(token);
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (data) => {
      // setSubmitted(true);
      openNotification("success", "Cập nhật thành công", "Mật khẩu của bạn đã được cập nhật");
      return;
    },
    onError: (error: any) => {
      openNotification("error", "Cập nhật thất bại", error.response.data.message);
      // console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    },
  });

  const openNotification = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message,
      description,
    });
  };

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
            <div>
              <h1>Đặt lại Mật khẩu</h1>
              <PasswordForm
                isLoading={mutation.isLoading}
                onSubmit={(password: string) => {
                  // console.log(password);
                  // setSubmitted(true);
                  mutation.mutate({
                    new_password: password,
                    confirm_password: password,
                    token,
                  });
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
              <SubmitButton
                  text="Quay lại đăng nhập"
                  onClick={() => {
                    router.push("/login");
                  }}
                />
                </div>
              {errorMessage && (
                <Alert message={errorMessage} type="error" />
                // <p className="register-content-error">{errorMessage}</p>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
