import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { RootState } from "@redux/reducers";
import { useSelector } from "react-redux";
import { SubmitButton } from "@components/button/SubmitButton";
import { Form, Input, Select } from "antd";

interface IBasicInfoForm {
  onSubmit: (
    first_name: string,
    last_name: string,
    // expected_graduation: string,
    phone_number: string,
    major: string,
    roles: string,
    // is_reviewer: boolean
  ) => void;
  isLoading?: boolean;
}

export const BasicInfoForm: React.FC<IBasicInfoForm> = ({
  onSubmit,
  isLoading,
}) => {
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  // const [expected_graduation, setGradYear] = useState<string>("");
  const [roles, setRoles] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  // const [is_reviewer, setIsReviewer] = useState<string>(false);
  const state = useSelector((state: RootState) => state.account);
  const [majors, setMajors] = useState<string[]>(["CNTT", "Kinh tế", "Luật"]);
  const [positions, setPositions] = useState<string[]>(["Thành viên", "Trưởng nhóm"]);

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value ?? "");
  };

  // const handleGradYearChange = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setGradYear(event.target.value);
  // };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value ?? "");
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoles(event.target.value ?? "");
  }

  // const handleReviewerChange = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setIsReviewer(event.target.value == "true");
  // };

  const handleMajorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMajor(event.target.value ?? "");
  }

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value ?? "");
  }

  const handleSubmit = () => {
    onSubmit(
      first_name,
      last_name,
      // expected_graduation,
      phone_number,
      major,
      roles,
      // is_reviewer
    );
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
          text="Xác nhận"
          isLoading={isLoading}
          onClick={handleSubmit}
        />
      </div>
    </Form>
  );
};
