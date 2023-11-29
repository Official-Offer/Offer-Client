import React, { useState } from "react";
import { SubmitButton } from "@components/button/SubmitButton";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { ReactComponent as Loader } from '/icons'
interface ILogInForm {
  onSubmit: (emailAndPassword: {
    email: string;
    password: string;
  }) => void;
  isLoading: boolean;
  embedSignup?: boolean;
}

export const AuthForm: React.FC<ILogInForm> = ({
  onSubmit,
  isLoading,
  embedSignup,
}) => {
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const state = useSelector((state: RootState) => state.account);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value ?? "");
  };

  const handleReenterPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRePassword(event.target.value ?? "");
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value ?? "");
  };

  const handleSubmit = (values: Record<string, any>) => {
    // event.preventDefault();
    if (embedSignup && password !== rePassword) {
      alert("Mật khẩu không khớp");
      return;
    }
    //check if email has the right format
    if (!email.includes("@")) {
      alert("Email không hợp lệ");
      return;
    }

    onSubmit({ email, password });
  };

  return (
    <Form className="form" layout="vertical">
      <div className="form-flex">
        <div className="form-input">
          <Form.Item label="Email">
            <Input
              required
              className="form-item"
              placeholder={"Email"}
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
        {embedSignup && (
          <div className="form-input">
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
          </div>
        )}
      </div>
      <SubmitButton
        text={embedSignup ? "Đăng ký" : "Đăng nhập"}
        isLoading={isLoading}
        onClick={handleSubmit}
      />
    </Form>
  );
};
