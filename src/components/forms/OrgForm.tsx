import React, { useState } from "react";
import { Form, Input, Select, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { SubmitButton } from "@components/button/SubmitButton";
import { useQuery } from "@tanstack/react-query";
import { getSchoolList } from "@services/apiSchool";
import { getCompanyList } from "@services/apiCompany";
import { getOrgList } from "@services/apiUser";
import { useRouter } from "next/router";

interface IOrgForm {
  onSubmit: (org: string) => void;
  isLoading: boolean;
  type?: string;
}

export const OrgForm: React.FC<IOrgForm> = ({
  onSubmit,
  isLoading,
  type,
}: IOrgForm) => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  const [schools, setSchools] = useState<any>();
  const [companies, setCompanies] = useState<any>();
  const [Org, setOrg] = useState<any>();
  const [proposedOrg, setProposedOrg] = useState<string>("");
  const [notFound, setNotFound] = useState<boolean>(false);
  const isStudent =
    state.role.isStudent || router.pathname.includes("student");
  const isRecruiter =
    state.role.isRecruiter || router.pathname.includes("recruiter");
  const isAdvisor = state.role.isAdvisor || router.pathname.includes("advisor");
  const orgQuery = useQuery({
    queryKey: ["orgs"],
    queryFn: getOrgList,
    onSuccess: async (orgs) => {
      // add "school is not found" into the list
      const schoolList = orgs.schools;
      const companyList = orgs.companies;
      //push the "not found" option to the list at the top
      schoolList.push({ id: 0, name: "Trường không có trong danh sách" });
      companyList.push({
        id: "0",
        name: "Công ty không có trong danh sách",
      });
      setSchools(schoolList);
      setCompanies(companyList);
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(Org);
  };

  const handleOrgChange = (value: any) => {
    if (value == 0) {
      setNotFound(true);
    }
    setOrg(value);
  };

  return (
    <Form className="form" onFinish={handleSubmit} layout="vertical">
      <div className="form-flex">
        <div className="form-input">
          <Form.Item
            label={
              isStudent || isAdvisor
                ? "Trường"
                : // "Kết nối với trường của bạn"
                  "Công ty"
              // "Kết nối với công ty của bạn"
            }
          >
            <Select
              showSearch
              className="form-select"
              bordered={false}
              onChange={handleOrgChange}
            >
              {isStudent || isAdvisor
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
          {notFound && (
            <Form.Item label="Không có trong danh sách? Điền tên dưới đây">
              <Input
                required
                className="form-item"
                onChange={(event) => {
                  setProposedOrg(event.target.value);
                }}
              />
            </Form.Item>
          )}
        </div>
      </div>
      <SubmitButton
        text={type ? "Cập nhật" : "Tiếp tục"}
        isLoading={orgQuery.isLoading && isLoading}
        onClick={handleSubmit}
      />
    </Form>
  );
};

{
  /* <Typography.Text type="secondary">
              {state.role.isStudent || state.role.isAdvisor
                ? ("Không tìm thấy trường của bạn trong danh sách? Hãy liên hệ với chúng tôi để thêm trường.")
                : "Không tìm thấy công ty của bạn trong danh sách? Hãy liên hệ với chúng tôi để thêm công ty."}
            </Typography.Text> */
}
