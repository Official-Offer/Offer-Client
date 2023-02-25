import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { SubmitButton } from "@styles/styled-components/styledButton";
import { Typography } from "antd";
import Link from "next/link";

interface IBasicInfoForm {
  onSubmit: (basicInfo: string) => void;
}

function BasicInfoForm({ onSubmit }: IBasicInfoForm) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [major, setMajor] = useState("");
  const [school, setSchool] = useState("");

  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {};

  const handleGradYearChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {};

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {};

  const handlePhoneNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {};

  const handleMajorChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {};

  const handleSchoolChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {};

  const handleSubmit = (event: { preventDefault: () => void }) => {
    onSubmit(name);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-basic-info">
          <div className="form-basic-info-left">
            <label>
              <b> Tên *</b>
            </label>
            <br />
            <FormInput
              width="230px"
              type="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-basic-info-right">
            <label>
              <b> Năm tốt nghiệp *</b>
            </label>
            <br />
            <FormInput
              width="230px"
              type="number"
              id="gradYear"
              value={gradYear}
              onChange={handleGradYearChange}
              required
            />
          </div>
        </div>
        <div className="form-basic-info">
          <div className="form-basic-info-left">
            <label>
              <b> Email * </b>
            </label>
            <br />
            <FormInput
              width="230px"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-basic-info-right">
            <label>
              <b> Số Điện Thoại </b>
            </label>
            <br />
            <FormInput
              width="230px"
              type="number"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </div>
        <label>
          <b> Ngành học *</b>
        </label>
        <br />
        <FormInput
          width="480px"
          type="input"
          id="major"
          value={major}
          onChange={handleMajorChange}
          required
        />
        <br />
        <label>
          <b> Trường *</b>
        </label>
        <br />
        <FormInput
          width="480px"
          type="input"
          id="school"
          value={school}
          onChange={handleSchoolChange}
          required
        />
        <br />
        <br />
        <div className="form-basic-info-button">
          <SubmitButton type="submit">Xác nhận</SubmitButton>
        </div>
        <hr />
        <Typography.Text type="secondary">
          Đã có tài khoản? <br />
          <Typography.Text underline>
            <Link href="/student/login">Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>
        <br />
        <br />
        <Typography.Text type="secondary">
          Bạn là nhà tuyển dụng? <br />
          <Typography.Text underline>
            <Link href="/student/login">Đăng ký/Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>
      </form>
    </div>
  );
}

export default BasicInfoForm;
