import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { RootState } from "@redux/reducers";
import { useSelector } from "react-redux";
import { SubmitButton } from "@components/button/SubmitButton";
import { Form, Input, Select } from "antd";
import router from "next/router";

interface IForm {
  onSubmit: (
    title: string,
    department: string,
    description: string,
    salary: number,
    end_date: Date,
    expected_no_appliants: number
    // is_reviewer: boolean
  ) => void;
  isLoading: boolean;
}

export const JobPostForm: React.FC = ({
  onSubmit,
  isLoading,
}: IForm) => {
  const [title, setTitle] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [departments, setDepartments] = useState([
    "Kinh doanh",
    "Công nghệ",
    "Luật",
  ]);
  const [description, setDescription] = useState<string>("");
  const [end_date, setEndDate] = useState<Date>(new Date());
  const [salary, setSalary] = useState<number>(0);
  const [expected_no_appliants, setExpected] = useState<number>(0);

  const [continued, setContinued] = useState(false);
  const handleTitleChange = (value: React.SetStateAction<string>) => {
    setTitle(value);
  };

  const handleDepartmentChange = (value: React.SetStateAction<string>) => {
    setDepartment(value);
  };

  const handleDescChange = (value: React.SetStateAction<string>) => {
    setDescription(value);
  };

  const handleSalaryChange = (value: React.SetStateAction<number>) => {
    setSalary(value);
  };
  const handleEndDateChange = (value: React.SetStateAction<Date>) => {
    setEndDate(value);
  };
  const handleExpectedChange = (value: React.SetStateAction<number>) => {
    setExpected(value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(
      title,
      department,
      description,
      salary,
      end_date,
      expected_no_appliants
    );
    router.push("/unverified");
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
    router.push("unverified");
  };

  return (
    <Form className="form" layout="vertical">
      <div className="form-grid-white">
        <Form.Item label="Tên công việc" className="form-input">
          <Input required className="form-item" onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item label="Tên phòng ban" className="form-input">
          <Select
            className="form-select"
            bordered={false}
            onChange={handleDepartmentChange}
          >
            {departments.map((dep) => (
              <Select.Option className="form-select-dropdown" value={dep}>
                {dep}
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
        {continued && (
          <>
            <Form.Item label="Lương" className="form-input full-width">
              <Input
                required
                className="form-item"
                onChange={handleSalaryChange}
              />
            </Form.Item>
            <Form.Item label="Hạn nộp" className="form-input full-width">
              <Input
                required
                className="form-item"
                onChange={handleEndDateChange}
              />
            </Form.Item>
            <Form.Item
              label="Số người muốn tuyển"
              className="form-input full-width"
            >
              <Input
                required
                className="form-item"
                onChange={handleExpectedChange}
              />
            </Form.Item>
            {/* <Form.Item label="Ngành" className="form-input full-width">
              <Select
                className="form-select full-width"
                bordered={false}
                onChange={handleIndustryChange}
              >
                {majors.map((major) => (
                  <Select.Option className="form-select-dropdown" value={major}>
                    {major}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item> */}
          </>
        )}
      </div>
      <div className="form-submit-button">
        <div className="form-submit-button-back">
          <SubmitButton
            text={continued ? "Quay lại" : "Huỷ"}
            isLoading={isLoading}
            type={2}
            onClick={continued ? handleBack : handleCancel}
          />
        </div>
        <div className="form-submit-button-continue">
          <SubmitButton
            text={continued ? "Lưu công việc" : "Tiếp tục"}
            isLoading={isLoading}
            type={3}
            onClick={continued ? handleSubmit : handleContinue}
          />
        </div>
      </div>
    </Form>
  );
};
