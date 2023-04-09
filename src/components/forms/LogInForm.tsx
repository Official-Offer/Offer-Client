import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { SubmitButton } from "@styles/styled-components/styledButton";
import { Typography } from "antd";
import Link from "next/link";
import FootnoteForm from "./FootnoteForm";

interface ILoginForm {
  onSubmit: (emailAndPassword: {
    email: React.SetStateAction<string>;
    password: React.SetStateAction<string>;
  }) => void;
}

function LoginForm({ onSubmit }: ILoginForm) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Passwords match, handle form submission here
    // if (password !== "123456") {
    //   setErrorMessage("Password do not match. Please try again.");
    // } else {
    onSubmit({ email, password });
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <b> Email </b>
        </label>
        <br />
        <br />
        <FormInput
          width="250px"
          type="email"
          id="password"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <br />
        <br />
        <label>
          <b> Mật khẩu</b>
        </label>
        <br />
        <br />
        <FormInput
          width="250px"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <br />
        <br />
        <SubmitButton type="submit">Đăng nhập</SubmitButton>
        <br />
        <br />
        <hr />
        <Typography.Text type="secondary">
          Chưa có tài khoản? <br />
          <Typography.Text underline>
            <Link href="/student/registration">Đăng ký tại đây</Link>
          </Typography.Text>
        </Typography.Text>
        <br />
        <br />
        <Typography.Text type="secondary">
          Bạn là nhà tuyển dụng? <br />
          <Typography.Text underline>
            <Link href="/recruiter/login">Đăng ký/Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>{" "}
      </form>
    </div>
  );
}

export default LoginForm;
