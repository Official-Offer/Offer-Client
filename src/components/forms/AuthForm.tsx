import React, { useState } from "react";
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
  embedSignup?: boolean;
}

export const AuthForm: React.FC<ILogInForm> = ({ onSubmit, isLoading, embedSignup }: ILogInForm) => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const state = useSelector((state: RootState) => state.account);

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleReenterPasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setRePassword(event.target.value);
  };
  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    // event.preventDefault();
    console.log(email, password)
    onSubmit({ email, password });
  };

  return (
    <Form className="form" onSubmit={handleSubmit} layout="vertical">
      <div className="form-flex">
        <div className="form-input">
          <Form.Item label="Email">
            <Input
              required
              className="form-item"
              placeholder={state.email}
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
        {embedSignup && <div className="form-input">
          <Form.Item label="Nhập lại mật khẩu">
            <Input.Password
              required
              className="form-password"
              placeholder="Nhập lại mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handleReenterPasswordChange}
            />
          </Form.Item>
        </div>}
      </div>
      <SubmitButton
        text={embedSignup? "Tiếp tục" : "Đăng nhập"}
        isLoading={isLoading}
        onClick={handleSubmit}
      />
    </Form>
  );
};
