import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitButton } from "@components/button/SubmitButton";
import { DatePicker, Form, Input, Select, SelectProps, Slider, notification } from "antd";
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
  setUpperSalary,
  setCreatedAt,
} from "@redux/actions";
import moment from "moment";
import { SliderMarks } from "antd/lib/slider";
import { OrgForm } from "./OrgForm";
import { RootState } from "@redux/reducers";
// import locale from "antd/es/date-picker/locale/vi_VN";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { extractLabelFromValue } from "@utils/extractors";
import { majorList, processedMajorList } from "@public/static/list";
import { workTypes, levels } from "@public/static/dict";
import { set } from "lodash";
// import ReactQuill from 'react-quill';

interface IForm {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}
type NotificationType = "success" | "info" | "warning" | "error";

export const JobPostForm: React.FC<IForm> = ({ onSubmit, onCancel, isLoading }) => {
  const dispatch = useDispatch();
  const f = (arr: any) => arr.map((v: any) => ({ value: v, label: v }));
  const state = useSelector((state: RootState) => state.jobs);
  const { RangePicker } = DatePicker;
  const locations = f(["Hà nội", "TP.HCM", "Đà Nẵng"]);
  const types = workTypes;
  const [title, setTitl] = useState<any>(state.title || "");
  const [address, setAdd] = useState<string>(state.address || "");
  const [major, setMaj] = useState<any>(state.major || []);
  const [salary, setSal] = useState<number>(state.salary || 0);
  const [upperSalary, setUpperSal] = useState<number>(state.upperSalary || 0);
  const [type, setTyp] = useState<any>(state.type || []);
  const [deadline, setDeadl] = useState<any>(state.deadline || new Date());
  const [level, setLev] = useState<any>(state.level || []);
  const [desc, setDesc] = useState<any>(state.description || "");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message,
      description,
    });
  };
  const marks: SliderMarks = {
    0: "0",
    100: "100",
  };

  const handleTitleChange = (event: any) => {
    setTitl(event.target.value);
  };

  const handleTypeChange = (value: any) => {
    setTyp(value);
  };

  const handleDeadlineChange = (value: any) => {
    // console.log(moment(value).format("DD-MM-YYYY"));
    // dispatch(setDeadline(value.toDate()));
    setDeadl(value.toDate());
  };

  const handleDescChange = (value: any) => {
    setDesc(value);
    // dispatch(setDescription(value));
  };

  const handleLevelChange = (value: any) => {
    console.log(value);
    setLev([...value]);
    // dispatch(setLevel(value));
  };

  const handleAddressChange = (value: any) => {
    setAdd(value);
    // dispatch(setAddress(value));
  };

  const handleSalaryChange = (value: any) => {
    // console.log(value);
    setSal(value[0]);
    setUpperSal(value[1]);
  };

  const handleMajorChange = (value:any) => {
    console.log(value.map((v:any) => v.value));
    setMaj(value.map((v:any) => v.value));
  };

  const handleContinue = (event: { preventDefault: () => void }) => {
    //don't let user continue if they haven't filled in all the required fields
    if (!title) {
      openNotification("error", "Vui lòng điền tiêu đề", "");
      return;
    }
    if (!address) {
      openNotification("error", "Vui lòng chọn địa điểm", "");
      return;
    }
    if (!level) {
      openNotification("error", "Vui lòng chọn cấp bậc", "");
      return;
    }
    if (!desc) {
      openNotification("error", "Vui lòng điền mô tả", "");
      return;
    } else {
      dispatch(setTitle(title));
      dispatch(setAddress(address));
      dispatch(setLevel(level));
      dispatch(setDescription(desc));
      dispatch(setSalary(salary));
      dispatch(setUpperSalary(upperSalary));
      dispatch(setMajor(major));
      dispatch(setType(type));
      dispatch(setDeadline(deadline));
      dispatch(setCreatedAt(new Date()));
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
          <Input required onChange={handleTitleChange} value={title} />
        </Form.Item>
        <Form.Item label="Địa điểm" required>
          <Select
            // mode="multiple"
            placeholder="Hà Nội"
            onChange={handleAddressChange}
            options={locations}
            value={address}
          />
        </Form.Item>
        <Form.Item label="Cấp bậc" className="form-input" required>
          <Select
            mode="multiple"
            placeholder="Thực tập"
            onChange={handleLevelChange}
            options={levels}
            value={[...level]}
          />
        </Form.Item>
        <Form.Item label="Mức lương (triệu đồng/tháng)">
          <Slider
            range
            defaultValue={[0, 100]}
            marks={marks}
            onAfterChange={handleSalaryChange}
            value={[salary, upperSalary]}
          />
        </Form.Item>
        <Form.Item label="Tính chất công việc">
          <Select
            // className="form-select"
            mode="multiple"
            placeholder="Fulltime"
            onChange={handleTypeChange}
            options={types}
            value={type}
          />
        </Form.Item>
        <Form.Item label="Ngành học liên quan">
          <Select
            // className="form-select"
            labelInValue={true}
            mode="multiple"
            placeholder="Công nghệ thông tin"
            onChange={handleMajorChange}
            options={processedMajorList}
            value={major.map((v: any) => ({ value: v, label: extractLabelFromValue(v, processedMajorList) }))}
          />
        </Form.Item>
        <Form.Item label="Hạn chót">
          <DatePicker
            className="form-date-picker"
            // locale={locale}
            onChange={handleDeadlineChange}
            value={moment(deadline)}
          />
        </Form.Item>
        <Form.Item required label="Miêu tả" className="form-input full-width">
          <ReactQuill className="form-desc" theme="snow" value={desc} onChange={handleDescChange} />
        </Form.Item>
      </div>
      <div className="form-submit-button">
        <div className="form-submit-button-back">
          <SubmitButton text={"Quay lại"} isLoading={isLoading} type={2} onClick={handleCancel} />
        </div>
        <div className="form-submit-button-continue">
          <SubmitButton text={"Tiếp tục"} isLoading={isLoading} type={3} onClick={handleContinue} />
        </div>
        {contextHolder}
      </div>
    </Form>
  );
};
