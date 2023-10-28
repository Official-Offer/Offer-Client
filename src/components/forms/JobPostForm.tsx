import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SubmitButton } from "@components/button/SubmitButton";
import { DatePicker, Form, Input, Select, SelectProps } from "antd";
import {
  setCompany,
  setTitle,
  setDescription,
  setDeadline,
} from "@redux/actions";
import moment from "moment";
import locale from "antd/es/date-picker/locale/vi_VN";

interface IForm {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const JobPostForm: React.FC<IForm> = ({
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const dispatch = useDispatch();

  const { RangePicker } = DatePicker;

  // const locale = {
  //   ...en_US.DatePicker,
  //   lang: {
  //     ...en_US.DatePicker.lang,
  //     monthFormat: "MMMM",
  //   },
  // };

  const handleTitleChange = (event: any) => {
    dispatch(setTitle(event.target.value));
  };

  // const handleDeadlineChange = (value: any) => {
  //   console.log(moment(value).format("DD-MM-YYYY"));
  //   dispatch(setDeadline(moment(value).format("DD-MM-YYYY")));
  // };

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

  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form className="form" layout="vertical">
      <div className="form-grid-white">
        <Form.Item label="Tiêu đề" className="form-input full-width">
          <Input required className="form-item" onChange={handleTitleChange} />
        </Form.Item>
        {/* <Form.Item label="Ngành">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Chọn ngành"
            onChange={handleChange}
            options={options}
          />
        </Form.Item> */}
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
        {/* <Form.Item label="Hạn chót">
          <DatePicker locale={locale} onChange={handleDeadlineChange} />
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
