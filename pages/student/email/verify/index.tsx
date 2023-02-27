import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import PinInput from "react-pin-input";
import { Typography } from "antd";
import { SubmitButton } from "@styles/styled-components/styledButton";
import Link from "next/link";
const EmailVerify: NextPage = () => {
  const router = useRouter();

  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          <h1>Bách Khoa Hà Nội</h1>
          <p>
            Mã xác nhận đã được gửi tới email <b>kiento0905.hec@gmail.com</b>
          </p>
          <div className="register-student-content-form-pincode">
            <PinInput
              length={4}
              initialValue=""
              onChange={(value, index) => {}}
              type="numeric"
              inputMode="number"
              style={{ padding: "20px 0px" }}
              inputStyle={{
                borderColor: "#7277F1",
                fontSize: "20px",
                width: "50px",
              }}
              inputFocusStyle={{ borderColor: "#D30B81" }}
              onComplete={(value, index) => {}}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
            <Typography.Text type="secondary">
              Không nhận được? <u>Gửi lại mã xác nhận</u>
            </Typography.Text>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
