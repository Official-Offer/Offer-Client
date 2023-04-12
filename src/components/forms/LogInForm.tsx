import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { SubmitButton } from "@styles/styled-components/styledButton";
import { Typography } from "antd";
import { FootnoteForm } from "./FootnoteForm";
import Link from "next/link";

interface ILoginForm {
  onSubmit: (emailAndPassword: {
    email: React.SetStateAction<string>;
    password: React.SetStateAction<string>;
  }) => void;
}

export const LoginForm:React.FC = ({ onSubmit }: ILoginForm) => {
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
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-flex">
          <div className="form-input">
            <label>
              <b> Email </b>
            </label>
            <FormInput
              width="250px"
              type="email"
              id="password"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-input">
            <label>
              <b> Mật khẩu</b>
            </label>
            <FormInput
              width="250px"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>
        <SubmitButton type="submit" className="form-submit-button">Đăng nhập</SubmitButton>
      </form>
      <FootnoteForm />
    </div>
  );
}
