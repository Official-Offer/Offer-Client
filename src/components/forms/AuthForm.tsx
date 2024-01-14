import React, { useState, useEffect } from "react";
import { SubmitButton } from "@components/button/SubmitButton";
import { Form, Input, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
type NotificationType = "success" | "info" | "warning" | "error";

interface ILogInForm {
  onSubmit: (emailAndPassword: {
    email: string;
    password: string;
    error: string;
  }) => void;
  isLoading: boolean;
  embedSignup?: boolean;
}

export const AuthForm: React.FC<ILogInForm> = ({
  onSubmit,
  isLoading,
  embedSignup,
}) => {
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
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

  // useEffect(() => {
  //   if (error) {
  //     openNotification("error", "Đăng ký không thành công", error);
  //   }
  // }, [error]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value ?? "");
  };

  const handleReenterPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRePassword(event.target.value ?? "");
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value ?? "");
  };

  const handleSubmit = (values: Record<string, any>) => {
    // event.preventDefault();
    //check if all fields are filled
    let error = "";
    if (!email) {
      error = "Vui lòng nhập email";
    } else if (!email.includes("@") || !email.includes(".")) {
      error = "Email không hợp lệ";
    } else if (!password) {
      error = "Vui lòng nhập mật khẩu";
    } else if (embedSignup && password !== rePassword) {
      error = "Mật khẩu không khớp";
    //check if email has the right format
    } else {
      error = "";
    }
    setErrorMessage(error);
    onSubmit({ email, password, error });
  };

  return (
    <Form className="form" layout="vertical" noValidate>
      <div className="form-flex">
        <div className="form-input">
          <Form.Item label="Email">
            <Input
              required
              placeholder="example@gmail.com"
              className="form-item"
              onChange={handleEmailChange}
              status={
                errorMessage.toLowerCase().includes("email") ? "error" : ""
              }
            />
          </Form.Item>
        </div>
        <div className="form-input">
          <Form.Item label="Mật khẩu">
            <Input.Password
              required
              className="form-password"
              placeholder="Vui lòng có ít nhất 6 ký tự"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handlePasswordChange}
              status={
                errorMessage.toLowerCase().includes("mật khẩu") ? "error" : ""
              }
            />
          </Form.Item>
        </div>
        {embedSignup && (
          <div className="form-input">
            <Form.Item label="Nhập lại mật khẩu">
              <Input.Password
                required
                className="form-password"
                // placeholder="Nhập lại mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={handleReenterPasswordChange}
                status={
                  errorMessage.toLowerCase().includes("mật khẩu") ? "error" : ""
                }
              />
            </Form.Item>
          </div>
        )}
      </div>
      <SubmitButton
        text={embedSignup ? "Đăng ký" : "Đăng nhập"}
        isLoading={isLoading}
        onClick={handleSubmit}
      />
    </Form>
  );
};
