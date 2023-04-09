import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { SubmitButton } from "@styles/styled-components/styledButton";
import { Typography } from "antd";
import { FootnoteForm } from "./FootnoteForm";
import Link from "next/link";

interface IPasswordForm {
  onSubmit: (email: string) => void;
}

export const PasswordForm:React.FC = ({ onSubmit }: IPasswordForm) => {
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleReenteredPasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setReenteredPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Passwords match, handle form submission here
    if (password !== reenteredPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
    } else {
      onSubmit(password);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-flex">
          <div className="form-input">
            <label>
              <b> Nhập mật khẩu cho lần đăng nhập sau * </b>
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
          <div className="form-input">
            <label>
              <b> Nhập lại mật khẩu *</b>
            </label>
            <FormInput
              width="250px"
              type="password"
              id="reentered-password"
              value={reenteredPassword}
              onChange={handleReenteredPasswordChange}
              required
            />
          </div>
        </div>
      </form>
      <SubmitButton type="submit">Tiếp tục</SubmitButton>
    </div>
  );
}
