import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { Typography } from "antd";
import { SubmitButton } from "@components/button/SubmitButton";

interface IEmailForm {
  onSubmit: (email: string) => void;
  isLoading: boolean;
}

export const EmailForm: React.FC = ({ onSubmit, isLoading }: IEmailForm) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-flex">
          <div className="form-input">
            <label>
              <b> Nhập email của bạn: </b>
            </label>
            <FormInput
              width="250px"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <Typography.Text type="secondary">
              Sử dụng mail .edu sẽ giúp quá trình <br />
              xác thực được nhanh chóng hơn.
            </Typography.Text>
          </div>
          <SubmitButton
            text="Tiếp tục"
            isLoading={isLoading}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};
