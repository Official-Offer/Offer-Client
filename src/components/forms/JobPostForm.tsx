import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitButton } from "@components/button/SubmitButton";
import { DatePicker, Form, Input, Select, SelectProps, Slider } from "antd";
import {
  setCompany,
  setTitle,
  setDescription,
  setDeadline,
  setLevel,
  setAddress,
  setSalary,
  setMajor,
  setType,
  setReqs,
  setBenefits,
  setUpperSalary,
  setCompanyId,
} from "@redux/actions";
import moment from "moment";
import { SliderMarks } from "antd/lib/slider";
import { OrgForm } from "./OrgForm";
import { RootState } from "@redux/reducers";
import locale from "antd/es/date-picker/locale/vi_VN";
import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import ReactQuill from 'react-quill';

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
  const f = (arr: any) => arr.map((v: any) => ({ value: v, label: v }));

  const { RangePicker } = DatePicker;
  const locations = f(["Hà nội", "TP.HCM", "Đà Nẵng"]);
  // const majorList = [
  //   "Công nghệ thông tin",
  //   "Kinh tế",
  //   "Marketing",
  //   "Quản trị kinh doanh",
  //   "Luật",
  // ];
  // const [major, setMajor] = useState<string[]>(["Công nghệ thông tin"]);
  const types = f(["fulltime", "parttime", "Hợp đồng", "Tình nguyện"]);
  const levels = f(["Thực tập", "Nhân viên chính thức", "Đã có kinh nghiệm"]);
  const majors = [
    { value: 1, label: "Công nghệ thông tin" },
    { value: 2, label: "Kinh tế" },
    { value: 3, label: "Marketing" },
    { value: 4, label: "Quản trị kinh doanh" },
    { value: 5, label: "Luật" },
  ];
  const [desc, setDesc] = useState<any>("");

  const marks: SliderMarks = {
    0: "0",
    100: "100",
  };

  const handleTitleChange = (event: any) => {
    dispatch(setTitle(event.target.value));
  };

  const handleTypeChange = (value: any) => {
    console.log(value);
    dispatch(setType(value));
  };

  const handleDeadlineChange = (value: any) => {
    // console.log(moment(value).format("DD-MM-YYYY"));
    dispatch(setDeadline(value.toDate()));
  };

  const handleDescChange = (value: any) => {
    setDesc(value);
    dispatch(setDescription(value));
  };

  const handleLevelChange = (value: any) => {
    console.log(value);
    dispatch(setLevel(value));
  };

  const handleAddressChange = (value: any) => {
    console.log(value);
    dispatch(setAddress(value));
  };

  const handleSalaryChange = (value: any) => {
    console.log(value);
    dispatch(setSalary(value[0]));
    dispatch(setUpperSalary(value[1]));
  };

  const handleMajorChange = (value: any) => {
    console.log(value);
    dispatch(setMajor(value));
    // setMajor(majorList[value - 1]);
  };
  const state = useSelector((state: RootState) => state.jobs);

  const handleContinue = (event: { preventDefault: () => void }) => {
    //don't let user continue if they haven't filled in all the required fields
    if (!state.title || !state.address || !state.level || !state.description) {
      alert("Vui lòng điền thông tin cần thiết");
      return;
    } else {
      onSubmit();
      event.preventDefault();
    }
  };

  const handleCancel = (event: { preventDefault: () => void }) => {
    onCancel();
    event.preventDefault();
  };

  return (
    <Form className="form" layout="vertical">
      <div className="form-grid-white">
        <Form.Item label="Tiêu đề" required className="form-input full-width">
          <Input required onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item label="Địa điểm" required>
          <Select
            // mode="multiple"
            placeholder="Hà Nội"
            onChange={handleAddressChange}
            options={locations}
          />
        </Form.Item>
        <Form.Item label="Cấp bậc" className="form-input" required>
          <Select
            mode="multiple"
            placeholder="Thực tập"
            onChange={handleLevelChange}
            options={levels}
          />
        </Form.Item>
        <Form.Item label="Mức lương (triệu đồng/tháng)">
          <Slider
            range
            defaultValue={[0, 100]}
            marks={marks}
            onAfterChange={handleSalaryChange}
          />
        </Form.Item>
        <Form.Item label="Tính chất công việc">
          <Select
            // className="form-select"
            mode="multiple"
            placeholder="Fulltime"
            onChange={handleTypeChange}
            options={types}
          />
        </Form.Item>
        <Form.Item label="Ngành học liên quan">
          <Select
            // className="form-select"
            mode="multiple"
            placeholder="Công nghệ thông tin"
            onChange={handleMajorChange}
            options={majors}
          />
        </Form.Item>
        <Form.Item label="Hạn chót">
          <DatePicker
            className="form-date-picker"
            locale={locale}
            onChange={handleDeadlineChange}
          />
        </Form.Item>
        <Form.Item required label="Miêu tả" className="form-input full-width">
          <ReactQuill className="form-desc" theme="snow" value={desc} onChange={handleDescChange} />
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
