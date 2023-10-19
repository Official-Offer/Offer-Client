import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
// import { SubmitButton } from "@styles/styled-components/styledButton";
import { Form, Input, Select, Typography } from "antd";
import { FootnoteForm } from "./FootnoteForm";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { SubmitButton } from "@components/button/SubmitButton";
import { useQuery } from "react-query";
import { getSchoolList } from "@services/apiSchool";
import { getCompanyList } from "@services/apiCompany";

interface IOrgForm {
  onSubmit: (org: string) => void;
  isLoading: boolean;
}

export const OrgForm: React.FC<IOrgForm> = ({
  onSubmit,
  isLoading,
}: IOrgForm) => {
  const [orgs, setOrgs] = useState<any>([]);
  const [Org, setOrg] = useState<any>();
  const state = useSelector((state: RootState) => state.account);
  const schoolQuery = useQuery({
    queryKey: ["jobs"],
    queryFn:
      state.role.isAdvisor || state.role.isStudent
        ? getSchoolList
        : getCompanyList,
    onSuccess: async (orgs) => {
      setOrgs(orgs);
      console.log(orgs);
    },
    onError: () => {},
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(Org);
  };

  const handleOrgChange = (value: any) => {
    setOrg(value);
  };

  return (
    <Form className="form" onSubmit={handleSubmit} layout="vertical">
      <div className="form-flex">
        <div className="form-input">
          <Form.Item
            label={
              state.role.isStudent || state.role.isAdvisor
                ? "Kết nối với trường của bạn"
                : "Kết nối với công ty của bạn"
            }
            
          >
            <Select
              showSearch
              className="form-select"
              bordered={false}
              onChange={handleOrgChange}
            >
              {orgs.map((org: any) => (
                <Select.Option className="form-select-dropdown" value={org.name}>
                  {org.name}
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
        isLoading={schoolQuery.isLoading && isLoading}
        onClick={handleSubmit}
      />
    </Form>
  );
};
