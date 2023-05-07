import React, { useEffect, useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
// import {
//   SubmitButtonAntd,
// } from "@styles/styled-components/styledButton";
// import { Typography } from "antd";
// import { FootnoteForm } from "./FootnoteForm";
// import Link from "next/link";
import { SubmitButton } from "@components/button/SubmitButton";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface IPasswordForm {
  onSubmit: (email: string) => void;
  isLoading: boolean;
}

export const PasswordForm: React.FC = ({
  onSubmit,
  isLoading,
}: IPasswordForm) => {
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(isLoading);
  }, [errorMessage, isLoading]);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleReenteredPasswordChange = (value: string) => {
    setReenteredPassword(value);
  };

  const handleSubmit = () => {
    // event.preventDefault();
    // Passwords match, handle form submission here
    if (password !== reenteredPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
    } else {
      onSubmit(password);
    }
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <div className="form-flex">
        <div className="form-input">
          <label>
            <b> Nhập mật khẩu cho lần đăng nhập sau * </b>
          </label>
          <Form.Item>
            <Input.Password
              className="form-password"
              placeholder="Mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handlePasswordChange}
            />
          </Form.Item>
        </div>
        <div className="form-input">
          <label>
            <b> Nhập lại mật khẩu *</b>
          </label>
          <Form.Item>
            <Input.Password
              label="Nhập lại mật khẩu *"
              className="form-password"
              placeholder="Nhập lại mật khẩu *"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handlePasswordChange}
            />
          </Form.Item>
        </div>
        <SubmitButton
          text="Đăng ký"
          isLoading={isLoading}
          onClick={handleSubmit}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Form>
  );
};
