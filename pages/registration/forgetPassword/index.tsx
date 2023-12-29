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
import { Alert, notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";

//create a next page for the student home page, code below
const ForgetPassword: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message,
      description,
    });
  };
  const state = useSelector((state: RootState) => state.account);
  const mutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: async (data: any) => {
      // console.log("email have been sent");
      openNotification(
        "success",
        "Thành công",
        "Link để thay đổi mật khẩu đã được gửi đến email của bạn.",
      );
      setSubmitted(true);
    },
    onError: (error: any) => {
      openNotification("error", "Thất bại", "Email không tồn tại.");
    },
  });

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <>
            {" "}
            <div className="register-content-back">
              <BackwardOutlined
                onClick={() => {
                  router.back();
                }}
              />
              Quay lại
            </div>
            <h1>Quên Mật khẩu</h1>
            <EmailForm
              isLoading={mutation.isLoading}
              onSubmit={(email: string) => {
                if (!email || email.includes("@") === false) {
                  openNotification("error", "Thất bại", "Email không hợp lệ.");
                } else if (email) {
                  // console.log(email);
                  mutation.mutate({
                    email: email,
                  });
                }
              }}
            />
            {contextHolder}
            <br />
          </>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
