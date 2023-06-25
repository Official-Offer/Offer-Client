import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { RootState } from "@redux/reducers";
import { useSelector } from "react-redux";
import { SubmitButton } from "@components/button/SubmitButton";
import { Form, Input, Select } from "antd";
import router from "next/router";

interface IBasicInfoForm {
  onSubmit: (
    first_name: string,
    last_name: string,
    // expected_graduation: string,
    phone_number: string,
    major: string,
    roles: string
    // is_reviewer: boolean
  ) => void;
  isLoading: boolean;
}

export const JobPostForm: React.FC = ({
  onSubmit,
  isLoading,
}: IBasicInfoForm) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  // const [expected_graduation, setGradYear] = useState("");
  const [roles, setRoles] = useState("");
  const [major, setMajor] = useState("");
  // const [is_reviewer, setIsReviewer] = useState(false);
  const state = useSelector((state: RootState) => state.account);
  const [majors, setMajors] = useState(["CNTT", "Kinh tế", "Luật"]);
  const [positions, setPositions] = useState(["Thành viên", "Trưởng nhóm"]);

  const [continued, setContinued] = useState(false);
  const handleFirstNameChange = (value: React.SetStateAction<string>) => {
    setFirstName(value);
  };

  // const handleGradYearChange = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setGradYear(event.target.value);
  // };

  const handleLastNameChange = (value: React.SetStateAction<string>) => {
    setLastName(value);
  };

  const handleRoleChange = (value: React.SetStateAction<string>) => {
    setRoles(value);
  };

  // const handleReviewerChange = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setIsReviewer(event.target.value == "true");
  // };

  const handleMajorChange = (value: React.SetStateAction<string>) => {
    setMajor(value);
  };

  const handlePhoneNumberChange = (value: React.SetStateAction<string>) => {
    setPhoneNumber(value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(
      first_name,
      last_name,
      // expected_graduation,
      phone_number,
      major,
      roles
      // is_reviewer
    );
    router.push("/recruiter/jobs/unverified");
  };

  const handleContinue = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setContinued(true);
  };

  const handleBack = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setContinued(false);
  };

  const handleCancel = (event: { preventDefault: () => void }) => {
    router.push('recruiter/jobs/unverified')
  };

  return (
    <Form className="form" layout="vertical">
      <div className="form-grid">
        <Form.Item label="Họ" className="form-input">
          <Input
            required
            className="form-item"
            onChange={handleFirstNameChange}
          />
        </Form.Item>
        <Form.Item label="Tên" className="form-input">
          <Input
            required
            className="form-item"
            onChange={handleLastNameChange}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại" className="form-input full-width">
          <Input
            required
            className="form-item"
            onChange={handlePhoneNumberChange}
          />
        </Form.Item>
        <Form.Item
          label={state.role.isStudent ? "Ngành học" : "Chức vụ"}
          className="form-input full-width"
        >
          <Select
            className="form-select full-width"
            bordered={false}
            onChange={
              state.role.isStudent ? handleMajorChange : handleRoleChange
            }
          >
            {state.role.isStudent || state.role.isAdvisor
              ? majors.map((major) => (
                  <Select.Option className="form-select-dropdown" value={major}>
                    {major}
                  </Select.Option>
                ))
              : positions.map((pos) => (
                  <Select.Option className="form-select-dropdown" value={pos}>
                    {pos}
                  </Select.Option>
                ))}
          </Select>
        </Form.Item>
      </div>
      <div className="form-submit-button">
        <SubmitButton
          text={continued ? "Huỷ" : "Quay lại"}
          isLoading={isLoading}
          onClick={continued ? handleBack : handleCancel}
        />
        <SubmitButton
          text={continued ? "Tạo công việc" : "Tiếp tục"}
          isLoading={isLoading}
          onClick={continued ? handleSubmit : handleContinue}
        />
      </div>
    </Form>
  );
};
