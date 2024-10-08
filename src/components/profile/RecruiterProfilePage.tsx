import React from "react";
import { useRouter } from "next/router";
import { Form, Input, notification } from "antd";
import { OrgForm } from "@components/forms";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdvisor, updateAdvisor } from "@services/apiAdvisor";
import { getCookie } from "cookies-next";
import { getRecruiter, updateRecruiter } from "@services/apiRecruiter";
import { SubmitButton } from "@components/button/SubmitButton";
type NotificationType = "success" | "info" | "warning" | "error";

export const ProfilePage: React.FC<any> = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [org, setOrg] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const router = useRouter();
  const role = getCookie("role");
  const isRecruiter =
    role == "recruiter" || router.pathname.includes("recruiter");
  const orgName = getCookie("orgName");
  const [api, contextHolder] = notification.useNotification();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: isRecruiter ? getRecruiter : getAdvisor,
    onSuccess: async (info) => {
      // console.log("info", info);
      setFName(info.account.first_name);
      setLName(info.account.last_name);
      setEmail(info.account.email);
      setPhoneNumber(info.account.phone_number);
      setOrg(isRecruiter ? info.company.name : info.school.name);
      setSelfDescription(info.account.self_description);
    },
    onError: () => {},
  });

  const openNotification = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message,
      description,
    });
  };

  const profileMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: isRecruiter ? updateRecruiter : updateAdvisor,
    onSuccess: async (data) => {
      openNotification("success", "Cập nhật thành công", "");
      // setUpdated(true);
      // console.log(data);
    },
    onError: (error: any) => {
      openNotification(
        "error",
        "Cập nhật thất bại",
        error.response.data.message,
      );
    },
  });
  return (
    <div className="recruiter-schools">
      <h2>Hồ sơ</h2>
      <Form className="form" onFinish={() => {}} layout="vertical">
        <p>{isRecruiter ? `Công ty: ${org}` : `Trường: ${org}`}</p>
        <Form.Item label="Email">
          <Input
            disabled
            value={email}
            className="form-item"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Họ">
          <Input
            required
            placeholder={lname}
            value={lname}
            className="form-item"
            onChange={(event) => {
              setLName(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Tên">
          <Input
            required
            placeholder={fname}
            value={fname}
            className="form-item"
            onChange={(event) => {
              setFName(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Mô tả bản thân">
          <Input.TextArea
            rows={3}
            required
            placeholder={`Mô tả bản thân`}
            value={selfDescription}
            className="form-item"
            onChange={(event) => {
              setSelfDescription(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            required
            placeholder={`Số điện thoại`}
            value={phoneNumber}
            className="form-item"
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />
        </Form.Item>
        <SubmitButton
          onClick={() => {
            // setUpdated(false);
            // setErrorMessage("");
            isRecruiter
              ? profileMutation.mutate({
                  account: {
                    first_name: fname,
                    last_name: lname,
                    email,
                    self_description: selfDescription,
                    phone_number: phoneNumber,
                  },
                  // company: org,
                })
              : profileMutation.mutate({
                  account: {
                    first_name: fname,
                    last_name: lname,
                    email,
                    self_description: selfDescription,
                    phone_number: phoneNumber,
                  },
                  // school: org,
                });
          }}
          isLoading={profileMutation.isLoading || profileQuery.isLoading}
          text="Cập nhật"
        />
        {contextHolder}
        {/* {updated && <p style={{ color: "green" }}>Cập nhật thành công</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
      </Form>
    </div>
  );
};

export default ProfilePage;
