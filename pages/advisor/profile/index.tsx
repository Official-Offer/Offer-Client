import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { Form, Input } from "antd";
import { OrgForm } from "@components/forms";
import { useState } from "react";

//create a next page for the student home page, code below
const Profile: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  return (
    <div className="recruiter-schools">
      <h2>Hồ sơ</h2>
      <Form className="form" onFinish={() => {}} layout="vertical">
        <Form.Item label="Họ Tên">
          <Input
            required
            className="form-item"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            required
            className="form-item"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            required
            className="form-item"
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />
        </Form.Item>
        <OrgForm
          onSubmit={function (org: string): void {
            console.log("done")
            // throw new Error("Function not implemented.");
          }}
          type="update"
          isLoading={false}
        />
      </Form>
    </div>
  );
};

export default Profile;
