import React from "react";
import { useRouter } from "next/router";
import { Form, Input, Row, Select, notification, Col } from "antd";
import { OrgForm } from "@components/forms";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdvisor, updateAdvisor } from "@services/apiAdvisor";
import { getCookie } from "cookies-next";
import { SubmitButton } from "@components/button/SubmitButton";
type NotificationType = "success" | "info" | "warning" | "error";

export const AdvisorProfilePage: React.FC<any> = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [org, setOrg] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [selfGender, setSelfGender] = useState("O");
  const router = useRouter();
  const role = getCookie("role");
  const orgName = getCookie("orgName");
  const [api, contextHolder] = notification.useNotification();
  const genderChoices = [
    {
      label: "Nam",
      value: "M",
    },
    {
      label: "Nữ",
      value: "F",
    },
    {
      label: "Khác",
      value: "O",
    },
  ];
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getAdvisor,
    onSuccess: async (info) => {
      // console.log("info", info);
      setFName(info.account.first_name);
      setLName(info.account.last_name);
      setEmail(info.account.email);
      setPhoneNumber(info.account.phone_number);
      setOrg(info.school.name);
      setSelfDescription(info.account.self_description);
      setSelfGender(info.account.gender);
    },
    onError: () => {},
  });

  const openNotification = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message,
      description,
    });
  };

  const profileMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: updateAdvisor,
    onSuccess: async (data) => {
      openNotification("success", "Cập nhật thành công", "");
      // setUpdated(true);
      // console.log(data);
    },
    onError: (error: any) => {
      openNotification("error", "Cập nhật thất bại", error.response.data.message);
    },
  });
  return (
    <div className="advisor-profile">
      <Form className="form" onFinish={() => {}} layout="vertical">
        <h2>Tài khoản</h2>
        <Row gutter={20}>
          <Col>
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
          </Col>
          <Col>
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
          </Col>
          <Col>
            <Form.Item label="Giới tính">
              <Select
                placeholder={`Giới tính`}
                value={selfGender}
                className="form-item"
                onChange={(value) => {
                  setSelfGender(value);
                }}
                options={genderChoices}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col>
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
          </Col>
          <Col>
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
          </Col>
        </Row>

          <Form.Item label="Mô tả bản thân" className="description">
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

        <SubmitButton
          onClick={() => {
            profileMutation.mutate({
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
          text="Lưu thay đổi"
          background={getCookie("orgLogoColor")?.toString() || "#EA0A8E"}
        />
        {contextHolder}
      </Form>
    </div>
  );
};

export default AdvisorProfilePage;
