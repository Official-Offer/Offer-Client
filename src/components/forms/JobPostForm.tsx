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
// import locale from "antd/es/date-picker/locale/vi_VN";

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
  const companyList = ["Meta", "Tesla", "Amazon", "VinaCapital"];
  const [companies, setCompanies] = useState<any>(
    [
      { value: 1, label: "Meta" },
      { value: 2, label: "Tesla" },
      { value: 3, label: "Amazon" },
      { value: 4, label: "VinaCapital" },
    ]
  );
  // const [company, setCompani] = useState<any>([
  //   { value: [1, "Meta"], label: "Meta" },
  // ]);
  const [levels, setLevels] = useState<any>(
    f(["Thực tập", "Nhân viên chính thức", "Đã có kinh nghiệm"])
  );
  const [location, setLocation] = useState<any>(
    f(["Hà nội", "TP.HCM", "Đà Nẵng"])
  );
  const [types, setTypes] = useState<any>(
    f(["fulltime", "parttime", "Hợp đồng", "Tình nguyện"])
  );
  const [majors, setMajors] = useState<any>(
    f([
      "Công nghệ thông tin",
      "Kinh tế",
      "Marketing",
      "Quản trị kinh doanh",
      "Luật",
    ])
  );

  const marks: SliderMarks = {
    0: "0",
    100: "100",
  };

  const handleTitleChange = (event: any) => {
    dispatch(setTitle(event.target.value));
  };

  const handleDeadlineChange = (value: any) => {
    // console.log(moment(value).format("DD-MM-YYYY"));
    dispatch(setDeadline(value.toDate()));
  };

  const handleDescChange = (event: any) => {
    dispatch(setDescription(event.target.value));
  };

  const handleLevelChange = (value: any) => {
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
    dispatch(setMajor(value));
  };
  const state = useSelector((state: RootState) => state.jobs);

  const handleCompanyChange = (value: any) => {
    dispatch(setCompany(companyList[value - 1]));
    dispatch(setCompanyId(value));
    // console.log(state.company);
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
        <Form.Item label="Tiêu đề" required className="form-input full-width">
          <Input required className="form-item" onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item label="Công ty" className="form-input" required>
          <Select
            // mode="multiple"
            // value={company}
            className="form-select"
            placeholder="Công ty"
            onChange={handleCompanyChange}
            options={companies}
          />
        </Form.Item>
        <Form.Item label="Địa điểm" required>
          <Select
            className="form-select"
            mode="multiple"
            placeholder="Hà Nội"
            onChange={handleAddressChange}
            options={location}
          />
        </Form.Item>
        <Form.Item label="Cấp bậc" className="form-input" required>
          <Select
            // mode="multiple"
            className="form-select"
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
        {/* <Form.Item label="Tính chất công việc">
          <Select
            className="form-select"
            mode="multiple"
            placeholder="Fulltime"
            onChange={handleTypeChange}
            options={types}
          />
        </Form.Item> */}
        <Form.Item label="Ngành học liên quan">
          <Select
            className="form-select"
            mode="multiple"
            placeholder="Công nghệ thông tin"
            onChange={handleMajorChange}
            options={majors}
          />
        </Form.Item>
        <Form.Item label="Hạn chót">
          <DatePicker
            className="form-select"
            // locale={locale}
            onChange={handleDeadlineChange}
          />
        </Form.Item>
        <Form.Item required label="Miêu tả" className="form-input full-width">
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
