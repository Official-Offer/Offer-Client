import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { Form, Input, Typography } from "antd";
import { SubmitButton } from "@components/button/SubmitButton";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface IEmailForm {
  onSubmit: (email: string) => void;
  isLoading: boolean;
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
    <Form className="form" onFinish={handleSubmit} layout="vertical">
      <div className="form-flex">
        <div className="form-input">
          <Form.Item label="Email">
            <Input
              required
              className="form-item"
              onChange={handleEmailChange}
            />
          </Form.Item>
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
    </Form>
  );
};
