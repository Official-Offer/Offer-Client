import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { SubmitButton } from "@styles/styled-components/styledButton";
import { Typography } from "antd";
import Link from "next/link";

interface IPasswordForm {
  onSubmit: (email: string) => void;
}

function PasswordForm({ onSubmit }: IPasswordForm) {
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
      <form onSubmit={handleSubmit}>
        <label>
          <b> Nhập mật khẩu cho lần đăng nhập sau * </b>
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
        <label>
          <b> Nhập lại mật khẩu *</b>
        </label>
        <br />
        <br />
        <FormInput
          width="250px"
          type="password"
          id="reentered-password"
          value={reenteredPassword}
          onChange={handleReenteredPasswordChange}
          required
        />
        <br />
        <br />
        <SubmitButton type="submit">Tiếp tục</SubmitButton>
        <br />
        <br />
        <hr />
        <Typography.Text type="secondary">
          Đã có tài khoản? <br />
          <Typography.Text underline>
            <Link href="/student/login">Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>
        <br />
        <br />
        <Typography.Text type="secondary">
          Bạn là nhà tuyển dụng? <br />
          <Typography.Text underline>
            <Link href="/student/login">Đăng ký/Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>
      </form>
    </div>
  );
}

export default PasswordForm;
