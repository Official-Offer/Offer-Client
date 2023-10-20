import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SubmitButton } from "@components/button/SubmitButton";
import { Form, Input, Select } from "antd";
import { setCompany, setDescription, setTitle } from "@redux/actions";

interface IForm {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const JobPostForm: React.FC<IForm> = ({ onSubmit, onCancel, isLoading }) => {
  const dispatch = useDispatch();

  const [companies, setCompanies] = useState<string[]>([
    "Apple",
    "Amz",
    "Meta",
  ]);

  const handleTitleChange = (event: any) => {
    dispatch(setTitle(event.target.value));
  };

  const handleDescChange = (event: any) => {
    dispatch(setDescription(event.target.value));
  };

  const handleContinue = (event: { preventDefault: () => void }) => {
    onSubmit();
    event.preventDefault();
  };

  const handleCancel = (event: { preventDefault: () => void }) => {
    onCancel();
    event.preventDefault();
  };

  return (
    <Form className="form" layout="vertical">
      <div className="form-grid-white">
        <Form.Item label="Tiêu đề" className="form-input full-width">
          <Input required className="form-item" onChange={handleTitleChange} />
        </Form.Item>
        {/* <Form.Item label="Công ty" className="form-input">
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
        </Form.Item> */}
        <Form.Item label="Miêu tả" className="form-input full-width">
          <Input.TextArea
            rows={6}
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
