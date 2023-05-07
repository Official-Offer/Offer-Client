import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { RootState } from "@redux/reducers";
import { useSelector } from "react-redux";
import { SubmitButton } from "@components/button/SubmitButton";
import { Form } from "antd";

interface IBasicInfoForm {
  onSubmit: (
    first_name: string,
    last_name: string,
    expected_graduation: string,
    phone_number: string,
    major: string,
    roles: string,
    is_reviewer: boolean
  ) => void,
  isLoading: boolean;
}

export const BasicInfoForm: React.FC = ({ onSubmit, isLoading}: IBasicInfoForm) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [expected_graduation, setGradYear] = useState("");
  const [roles, setRoles] = useState("");
  const [major, setMajor] = useState("");
  const [is_reviewer, setIsReviewer] = useState(false);
  const state = useSelector((state: RootState) => state.account);

  const handleFirstNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFirstName(event.target.value);
  };

  const handleGradYearChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setGradYear(event.target.value);
  };

  const handleLastNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLastName(event.target.value);
  };

  const handleRoleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRoles(event.target.value);
  };

  const handleReviewerChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setIsReviewer(event.target.value == "true");
  };

  const handleMajorChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMajor(event.target.value);
  };

  const handlePhoneNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(
      first_name,
      last_name,
      expected_graduation,
      phone_number,
      major,
      roles,
      is_reviewer
    );
  };

  return (
      <Form className="form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-input">
            <label>
              <b> Họ *</b>
            </label>
            <FormInput
              type="name"
              id="first_name"
              value={first_name}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div className="form-input">
            <label>
              <b> Tên *</b>
            </label>
            <FormInput
              type="string"
              id="last_name"
              value={last_name}
              onChange={handleLastNameChange}
              required
            />
          </div>
          <div className="form-input">
            <label>
              <b> Số điện thoại </b>
            </label>
            <FormInput
              type="string"
              id="phone_number"
              value={phone_number}
              onChange={handlePhoneNumberChange}
              required
            />
          </div>
          <div className="form-input">
            <label>
              <b>
                {" "}
                {state.role.isStudent
                  ? "Năm tốt nghiệp"
                  : "Người kiểm duyệt"}{" "}
              </b>
            </label>
            <FormInput
              type="input"
              id={state.role.isStudent ? "gradYear" : "is_reviewer"}
              list={state.role.isStudent ? "gradYear" : "is_reviewer"}
              value={state.role.isStudent ? expected_graduation : is_reviewer}
              onChange={
                state.role.isStudent
                  ? handleGradYearChange
                  : handleReviewerChange
              }
            />
            <datalist id="gradYear">
              <option value="2022" />
              <option value="2023" />
              <option value="2024" />
              <option value="2025" />
            </datalist>
            <datalist id="is_reviewer">
              <option value="true" />
              <option value="false" />
            </datalist>
          </div>
          <div className="form-input full-width">
            <label>
              <b> {state.role.isStudent ? "Ngành học" : "Chức vụ"} </b>
            </label>
            <FormInput
              type="input"
              id={state.role.isStudent ? "majors" : "roles"}
              list={state.role.isStudent ? "majors" : "roles"}
              value={state.role.isStudent ? major : roles}
              onChange={
                state.role.isStudent ? handleMajorChange : handleRoleChange
              }
              required
            />
            <datalist id="majors">
              <option value="CNTT" />
              <option value="Quản trị kinh doanh" />
              <option value="Đối ngoại" />
              <option value="Kế toán " />
            </datalist>
            <datalist id="roles">
              <option value="Frontend Developer" />
              <option value="Kế toán" />
              <option value="ADC" />
              <option value="Support" />
            </datalist>
          </div>
        </div>
        <div className="form-submit-button">
        <SubmitButton
            text="Xác nhận"
            isLoading={isLoading}
            onClick={handleSubmit}
          />
          {/* <SubmitButton type="submit">Xác nhận</SubmitButton> */}
        </div>
      </Form>
  );
};
