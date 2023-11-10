import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { Form, Input, Typography } from "antd";
import { SubmitButton } from "@components/button/SubmitButton";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface IEmailForm {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

export const EmailForm: React.FC<IEmailForm> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    onSubmit(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value ?? "");
  };

  return (
    <Form className="form" layout="vertical">
      <div className="form-flex">
        <div className="form-input">
          <Form.Item required label="Nhập email của bạn">
            <Input
              required
              className="form-item"
              onChange={handleEmailChange}
            />
          </Form.Item>
        </div>
        <SubmitButton
          text="Tiếp tục"
          isLoading={isLoading}
          onClick={handleSubmit}
        />
      </div>
    </Form>
  );
};
