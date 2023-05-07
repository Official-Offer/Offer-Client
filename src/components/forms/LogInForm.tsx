import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import {
  StyledSubmitButton,
  SubmitButtonAntd,
} from "@styles/styled-components/styledButton";
import Image from "next/image";
import { SubmitButton } from "@components/button/SubmitButton";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { ReactComponent as Loader } from '/icons'
interface ILogInForm {
  onSubmit: (emailAndPassword: {
    email: React.SetStateAction<string>;
    password: React.SetStateAction<string>;
  }) => void;
  isLoading: boolean;
}

export const LogInForm: React.FC = ({ onSubmit, isLoading }: ILogInForm) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const state = useSelector((state: RootState) => state.account);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    // event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <Form className="form" onSubmit={handleSubmit} layout="vertical">
      <div className="form-flex">
        <div className="form-input">
          <Form.Item label="Email">
            <Input
              required
              className="form-email"
              placeholder={state.email}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handleEmailChange}
            />
          </Form.Item>
        </div>
        <div className="form-input">
          <Form.Item label="Mật khẩu">
            <Input.Password
              required
              className="form-password"
              placeholder="Mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handlePasswordChange}
            />
          </Form.Item>
        </div>
      </div>
      <SubmitButton
        text="Đăng nhập"
        isLoading={isLoading}
        onClick={handleSubmit}
      />
    </Form>
  );
};
