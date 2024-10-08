import React, { useState, useEffect } from "react";
import { Alert, Form, Input, Select, Typography, notification } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { SubmitButton } from "@components/button/SubmitButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrgList } from "@services/apiUser";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { contact } from "../../../services/apiUser";
import { processedSchoolList,  processedCompanyList } from "@public/static/list";

interface IOrgForm {
  onSubmit: (org: string) => void;
  isLoading: boolean;
  type?: string;
}
type NotificationType = "success" | "info" | "warning" | "error";

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

  const isStudent = state.role.isStudent || router.pathname.includes("student");
  const isRecruiter =
    state.role.isRecruiter || router.pathname.includes("recruiter");
  const isAdvisor = state.role.isAdvisor || router.pathname.includes("advisor");

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [state.role.isAdvisor, state.role.isStudent, state.role.isRecruiter]);

  const contactMutation = useMutation({
    mutationKey: ["contact"],
    mutationFn: contact,
    onSuccess: async (data: any) => {
      // Invalidate and refetch
      // router.reload();
      setSubmitted(true);
      openNotification(
        "success",
        "Gửi thành công",
        "Chúng tôi sẽ liên hệ với bạn sớm nhất có thể"
      );
    },
    onError: (error: any) => {
      setErrorMessage("Gửi thất bại");
      // console.log(error.response.data.message);
      openNotification("error", "Gửi thất bại", error.response.data.message);
    },
  });

  const openNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(Org);
  };

  const handleOrgChange = (value: any) => {
    if (value.key == 0 && !isStudent) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setOrg(value);
    }
  };

  const orgy = isRecruiter ? "Công ty" : "Trường";
  // console.log(schools?.[orgId].name)
  return (
    <Form className="form" layout="vertical" form={form}>
      <div className="form-flex">
        <div className="form-input">
          <Form.Item name="orgName" label={isStudent || isAdvisor ? `Trường` : `Công ty`}>
            <Select
              // defaultValue={orgName}
              labelInValue={true}
              showSearch
              className="form-select"
              bordered={false}
              onChange={handleOrgChange}
              value={Org}
              // loading={orgQuery.isLoading}
            >
              {isStudent || isAdvisor
                ? processedSchoolList?.map((school: any) => (
                    <Select.Option
                      key={school.value}
                      className="form-select-dropdown"
                      value={school.label}
                    >
                      {school.label}
                    </Select.Option>
                  ))
                : processedCompanyList?.map((company: any) => (
                    <Select.Option
                      key={company.value}
                      className="form-select-dropdown"
                      value={company.label}
                    >
                      {company.label}
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
          {notFound &&
            (submitted ? (
              <>
                {contactMutation.isSuccess && (
                  <Alert
                    message="Gửi thành công, chúng tôi sẽ liên hệ với bạn sớm nhất có thể"
                    type="success"
                  />
                )}
                {errorMessage && <Alert message={errorMessage} type="error" />}
              </>
            ) : (
              <>
                <p>Không có trong danh sách? Điền thông tin dưới đây:</p>
                <div className="form-input">
                  {/* <div className="form-grid"> */}
                  <Form.Item required name="contact" label="Email hoặc số điện thoại">
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
                  <Form.Item required name="name" label="Họ tên">
                    <Input
                      required
                      className="form-item"
                      placeholder="Vui lòng nhập họ tên đầy đủ của bạn"
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="orgName"
                    label={`Tên ${isRecruiter ? "Công ty" : "Trường"}`}
                  >
                    <Input
                      // rows={4}
                      required
                      className="form-item"
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                      status={errorMessage ? "error" : ""}
                    />
                  </Form.Item>
                </div>
              </>
            ))}
        </div>
      </div>
      <SubmitButton
        text={notFound ? "Gửi" : type ? "Cập nhật" : "Tiếp tục"}
        isLoading={notFound && contactMutation.isLoading}
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
      {contextHolder}
    </Form>
  );
};
