import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { Form, Input } from "antd";
import { OrgForm } from "@components/forms";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdvisor, updateAdvisor } from "@services/apiAdvisor";
import { getCookie } from "cookies-next";
import { getRecruiter, updateRecruiter } from "@services/apiRecruiter";

export const ProfilePage: React.FC<any> = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [org, setOrg] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [updated, setUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const role = getCookie("role");
  const isRecruiter =
    role == "recruiter" || router.pathname.includes("recruiter");

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: isRecruiter ? getRecruiter : getAdvisor,
    onSuccess: async (info) => {
      console.log("info", info);
      setFName(info.account.first_name);
      setLName(info.account.last_name);
      setEmail(info.account.email);
      setPhoneNumber(info.account.phone_number);
      setOrg(isRecruiter ? info.company.name : info.school.name);
      setSelfDescription(info.account.self_description);
    },
    onError: () => {},
  });

  const profileMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: isRecruiter ? updateRecruiter : updateAdvisor,
    onSuccess: async (data) => {
      setUpdated(true);
      console.log(data);
    },
    onError: (error: any) => {
    setErrorMessage("Cập nhật thất bại");
    //   setErrorMessage(error.response.data.message);
      console.log(error.response.data.message);
    },
  });
  return (
    <div className="recruiter-schools">
      <h2>Hồ sơ</h2>
      <Form className="form" onFinish={() => {}} layout="vertical">
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
        <OrgForm
          onSubmit={function (org: string): void {
            setOrg(org);
            setUpdated(false);
            setErrorMessage("");
            isRecruiter
              ? profileMutation.mutate({
                  account: {
                    first_name: fname,
                    last_name: lname,
                    email,
                    self_description: selfDescription,
                    phone_number: phoneNumber,
                  },
                  company: org,
                })
              : profileMutation.mutate({
                  account: {
                    first_name: fname,
                    last_name: lname,
                    email,
                    self_description: selfDescription,
                    phone_number: phoneNumber,
                  },
                  school: org,
                });
          }}
          type="update"
          isLoading={profileMutation.isLoading || profileQuery.isLoading}
        />
        {updated && <p style={{ color: "green" }}>Cập nhật thành công</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Form>
    </div>
  );
};

export default ProfilePage;
