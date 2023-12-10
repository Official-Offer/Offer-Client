import React, { useState } from "react";
import { Form, Input, Select, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { SubmitButton } from "@components/button/SubmitButton";
import { useQuery } from "@tanstack/react-query";
import { getOrgList } from "@services/apiUser";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

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
  const role = getCookie("role");
  const isStudent =
    role == "student" ||
    state.role.isStudent ||
    router.pathname.includes("student");
  const isRecruiter =
    role == "recruiter" ||
    state.role.isRecruiter ||
    router.pathname.includes("recruiter");
  const isAdvisor =
    role == "advisor" ||
    state.role.isAdvisor ||
    router.pathname.includes("advisor");
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
    <Form className="form" layout="vertical">
      <div className="form-flex">
        <div className="form-input">
          <Form.Item label={isStudent || isAdvisor ? "Trường" : "Công ty"}>
            <Select
              // value={Org}
              showSearch
              className="form-select"
              bordered={false}
              onChange={handleOrgChange}
              loading={orgQuery.isLoading}
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
        isLoading={orgQuery.isLoading || isLoading}
        onClick={handleSubmit}
      />
    </Form>
  );
};
