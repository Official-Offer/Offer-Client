import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { SubmitButton } from "@styles/styled-components/styledButton";
import { Typography } from "antd";
import { FootnoteForm } from "./FootnoteForm";
import Link from "next/link";

interface IBasicInfoForm {
  onSubmit: (
    lastName: string,
    firstName: string,
    gradYear: string,
    job: string,
    major: string,
    school: string
  ) => void;
}

export const BasicInfoForm:React.FC = ({ onSubmit }: IBasicInfoForm) => {
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [job, setJob] = useState("");
  const [major, setMajor] = useState("");
  const [school, setSchool] = useState("");

  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };

  const handleGradYearChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setGradYear(event.target.value);
  };

  const handleDOBChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDOB(event.target.value);
  };

  const handleJobChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setJob(event.target.value);
  };

  const handleMajorChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMajor(event.target.value);
  };

  const handleSchoolChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSchool(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(name, dob, gradYear, job, major, school);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-input">
            <label>
              <b> Họ Tên *</b>
            </label>
            <FormInput
              type="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-input">
            <label>
              <b> Năm sinh *</b>
            </label>
            <FormInput
              type="string"
              id="dob"
              value={dob}
              onChange={handleDOBChange}
              required
            />
          </div>
          <div className="form-input">
            <label>
              <b> Năm tốt nghiệp * </b>
            </label>
            <FormInput
              type="string"
              id="gradYear"
              value={gradYear}
              onChange={handleGradYearChange}
              required
            />
          </div>
          <div className="form-input">
            <label>
              <b> Trường </b>
            </label>
            <FormInput
              type="input"
              id="school"
              list="schools"
              value={school}
              onChange={handleSchoolChange}
            />
            <datalist id="schools">
              <option value="Bách Khoa" />
              <option value="Sư Phạm" />
              <option value="Ngoại Thương" />
              <option value="Kinh Tế Quốc Dân" />
              <option value="FPT" />
              <option value="VinUniversity" />
              <option value="RMIT" />
              <option value="UMass" />
            </datalist>
          </div>
          <div className="form-input full-width">
            <label>
              <b> Ngành học *</b>
            </label>
            <FormInput
              type="input"
              id="major"
              list="majors"
              value={major}
              onChange={handleMajorChange}
              required
            />
            <datalist id="majors">
              <option value="CNTT" />
              <option value="Quản trị kinh doanh" />
              <option value="Đối ngoại" />
              <option value="Kế toán " />
            </datalist>
          </div>
          <div className="form-input full-width">
            <label>
              <b> Tìm kiếm công việc</b>
            </label>
            <FormInput
              type="input"
              id="school"
              list="jobs"
              value={job}
              onChange={handleJobChange}
              required
            />
            <datalist id="jobs">
              <option value="Frontend Developer" />
              <option value="Kế toán" />
              <option value="ADC" />
              <option value="Support" />
            </datalist>
          </div>
        </div>
        <div className="form-submit-button">
          <SubmitButton type="submit">Xác nhận</SubmitButton>
        </div>
      </form>
    </div>
  );
}