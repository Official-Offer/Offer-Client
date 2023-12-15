import React, { useState } from "react";
import { Form, Input, Select, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { SubmitButton } from "@components/button/SubmitButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrgList } from "@services/apiUser";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { contact } from "../../../services/apiUser";

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
  const [notFound, setNotFound] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");

  const role = getCookie("role");
  const orgId = Number(getCookie("orgId")) - 1;
  const isStudent =
    // role == "student" ||
    state.role.isStudent || router.pathname.includes("student");
  const isRecruiter =
    // role == "recruiter" ||
    state.role.isRecruiter || router.pathname.includes("recruiter");
  const isAdvisor =
    // role == "advisor" ||
    state.role.isAdvisor || router.pathname.includes("advisor");

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // const orgName =
  //   type == "update"
  //     ? isStudent || isAdvisor
  //       ? schools?.[orgId].name
  //       : companies?.[orgId].name
  //     : "";

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

  const contactMutation = useMutation({
    mutationKey: ["contact"],
    mutationFn: contact,
    onSuccess: async (data: any) => {
      // Invalidate and refetch
      // router.reload();
      setSubmitted(true);
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      setErrorMessage("Gửi thất bại");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(Org);
  };

  const handleOrgChange = (value: any) => {
    if (value.key == 0 && !isStudent) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setOrg(value.key);
    }
  };

  const orgy = isRecruiter ? "Công ty" : "Trường";
  // console.log(schools?.[orgId].name)
  return (
    <Form className="form" layout="vertical">
      <div className="form-flex">
        <div className="form-input">
          <Form.Item
            label={
              isStudent || isAdvisor
                ? `Trường`
                : `Công ty`
            }
          >
            <Select
              // defaultValue={orgName}
              labelInValue={true}
              showSearch
              className="form-select"
              bordered={false}
              onChange={handleOrgChange}
              loading={orgQuery.isLoading}
            >
              {isStudent || isAdvisor
                ? schools?.map((school: any) => (
                    <Select.Option
                      key={school.id}
                      className="form-select-dropdown"
                      value={school.name}
                    >
                      {school.name}
                    </Select.Option>
                  ))
                : companies?.map((company: any) => (
                    <Select.Option
                      key={company.id}
                      className="form-select-dropdown"
                      value={company.name}
                    >
                      {company.name}
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
          {notFound &&
            (submitted ? (
              <>
                {contactMutation.isSuccess && (
                  <p style={{ color: "green" }}>
                    Gửi thành công, chúng tôi sẽ liên hệ với bạn sớm nhất có thể
                  </p>
                )}
                {errorMessage && (
                  <p className="register-content-error">{errorMessage}</p>
                )}
              </>
            ) : (
              <>
                <p>Không có trong danh sách? Điền thông tin dưới đây:</p>
                <div className="form-input">
                  {/* <div className="form-grid"> */}
                  <Form.Item required label="Email hoặc số điện thoại">
                    <Input
                      required
                      className="form-item"
                      onChange={(event) => {
                        if (event.target.value.includes("@")) {
                          setEmail(event.target.value);
                        } else {
                          setPhone(event.target.value);
                        }
                      }}
                    />
                  </Form.Item>
                  <Form.Item required label="Họ tên">
                    <Input
                      required
                      className="form-item"
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={`Tên ${isRecruiter ? "Công ty" : "Trường"}`}
                  >
                    <Input
                      // rows={4}
                      required
                      className="form-item"
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
              </>
            ))}
        </div>
      </div>
      <SubmitButton
        text={notFound ? "Gửi" : type ? "Cập nhật" : "Tiếp tục"}
        isLoading={
          notFound ? contactMutation.isLoading : orgQuery.isLoading || isLoading
        }
        onClick={
          notFound
            ? () => {
                contactMutation.mutate({
                  title,
                  message,
                  sender_email: email,
                  sender_phone: phone,
                });
                setSubmitted(true);
              }
            : handleSubmit
        }
      />
    </Form>
  );
};
