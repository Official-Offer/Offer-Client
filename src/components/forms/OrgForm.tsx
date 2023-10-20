import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
// import { SubmitButton } from "@styles/styled-components/styledButton";
import { Form, Input, Select, Typography } from "antd";
import { FootnoteForm } from "./FootnoteForm";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { SubmitButton } from "@components/button/SubmitButton";

interface IOrgForm {
  onSubmit: (org: string) => void;
  isLoading: boolean;
}

export const OrgForm: React.FC<IOrgForm> = ({
  onSubmit,
  isLoading,
}: IOrgForm) => {
  const [Org, setOrg] = useState("");
  const state = useSelector((state: RootState) => state.account);
  const [schools, setSchools] = useState([
    "Bách Khoa",
    "Sư Phạm",
    "Ngoại Thương",
  ]);
  const [companies, setCompanies] = useState(["OpenAI", "Google", "Facebook"]);
  const handleSubmit = () => {
    onSubmit(Org);
  };

  const handleOrgChange = (value: any) => {
    setOrg(value);
  };

  return (
    <Form className="form" onFinish={handleSubmit} layout="vertical">
      <div className="form-flex">
        <div className="form-input">
          <Form.Item
            label={
              state.role.isStudent || state.role.isAdvisor
                ? "Kết nối với trường của bạn"
                : "Kết nối với công ty của bạn"
            }
            required
          >
            <Select
              showSearch
              className="form-select"
              bordered={false}
              onChange={handleOrgChange}
            >
              {state.role.isStudent || state.role.isAdvisor
                ? schools.map((school) => (
                    <Select.Option
                      className="form-select-dropdown"
                      value={school}
                    >
                      {school}
                    </Select.Option>
                  ))
                : companies.map((company) => (
                    <Select.Option
                      className="form-select-dropdown"
                      value={company}
                    >
                      {company}
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Không tìm thấy tên trường? Nhập dưới đây"
            className="form-input full-width"
          >
            <Input
              required
              className="form-item"
              // onChange={handlePhoneNumberChange}
            />
          </Form.Item>
        </div>
      </div>
      <SubmitButton
        text="Đăng ký"
        isLoading={isLoading}
        onClick={handleSubmit}
      />
    </Form>
  );
};
