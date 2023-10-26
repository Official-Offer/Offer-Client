import React, { useState } from "react";
import { Form, Input, Select, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { SubmitButton } from "@components/button/SubmitButton";
import { useQuery } from "@tanstack/react-query";
import { getSchoolList } from "@services/apiSchool";
import { getCompanyList } from "@services/apiCompany";
import { getOrgList } from "@services/apiUser";

interface IOrgForm {
  onSubmit: (org: string) => void;
  isLoading: boolean;
}

export const OrgForm: React.FC<IOrgForm> = ({
  onSubmit,
  isLoading,
}: IOrgForm) => {
  const [schools, setSchools] = useState<any>();
  const [companies, setCompanies] = useState<any>();
  const [Org, setOrg] = useState<any>();
  const state = useSelector((state: RootState) => state.account);
  const orgQuery = useQuery({
    queryKey: ["orgs"],
    queryFn: getOrgList,
    onSuccess: async (orgs) => {
      setSchools(orgs.schools);
      setCompanies(orgs.companies);
      console.log(orgs)

    },
    onError: () => {
      console.log("error")
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          >
            <Select
              showSearch
              className="form-select"
              bordered={false}
              onChange={handleOrgChange}
            >
              {state.role.isStudent || state.role.isAdvisor
                ? schools?.map((school: any) => (
                    <Select.Option
                      className="form-select-dropdown"
                      value={school.id}
                    >
                      {school.name}
                    </Select.Option>
                  ))
                : companies?.map((company: any) => (
                    <Select.Option
                      className="form-select-dropdown"
                      value={company.id}
                    >
                      {company.name}
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
        </div>
      </div>
      <SubmitButton
        text="Tiếp tục"
        isLoading={orgQuery.isLoading && isLoading}
        onClick={handleSubmit}
      />
    </Form>
  );
};
