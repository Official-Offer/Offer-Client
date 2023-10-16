import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { RootState } from "@redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { SubmitButton } from "@components/button/SubmitButton";
import { Form, Input, Select } from "antd";
import router from "next/router";
import { setCompany, setDescription, setTitle } from "@redux/actions";

interface IForm {
  onSubmit: (
    title: string,
    company: string,
    description: string
    // is_reviewer: boolean
  ) => void;
  isLoading: boolean;
}

export const JobPostForm: React.FC<IForm> = ({ onSubmit, isLoading }) => {
  const dispatch = useDispatch();

  const [companies, setCompanies] = useState<string[]>([
    "Apple",
    "Amz",
    "Meta",
  ]);

  const handleTitleChange = (event: any) => {
    dispatch(setTitle(event.target.value));
  };

  const handleCompanyChange = (value: React.SetStateAction<string>) => {
    dispatch(setCompany(value));
  };

  const handleDescChange = (event: any) => {
    dispatch(setDescription(event.target.value));
  };

  const handleContinue = (event: { preventDefault: () => void }) => {
    router.push("/jobs/jobDesc");
    event.preventDefault();
  };


  const handleCancel = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <Form className="form" layout="vertical">
      <div className="form-grid-white">
        <Form.Item label="Tiêu đề" className="form-input">
          <Input required className="form-item" onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item label="Công ty" className="form-input">
          <Select
            className="form-select"
            bordered={false}
            onChange={handleCompanyChange}
          >
            {companies.map((comp) => (
              <Select.Option className="form-select-dropdown" value={comp}>
                {comp}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Miêu tả" className="form-input full-width">
          <Input
            required
            className="form-item-long"
            onChange={handleDescChange}
          />
        </Form.Item>
      </div>
      <div className="form-submit-button">
        <div className="form-submit-button-back">
          <SubmitButton
            text={"Quay lại"}
            isLoading={isLoading}
            type={2}
            onClick={handleCancel}
          />
        </div>
        <div className="form-submit-button-continue">
          <SubmitButton
            text={"Tiếp tục"}
            isLoading={isLoading}
            type={3}
            onClick={handleContinue}
          />
        </div>
      </div>
    </Form>
  );
};
