import { NextPage } from "next";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { Checkbox, Divider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";
import { SubmitButton } from "@components/button/SubmitButton";

const CheckboxGroup = Checkbox.Group;

const schools = [
  "Bach Khoa",
  "Ngoai Thuong",
  "Kinh Te Quoc Dan",
  "UMass",
  "HSGS",
];
const defaultCheckedList = ["Bach Khoa", "Ngoai Thuong"];
//create a next page for the student home page, code below
const SelectSchool: NextPage = () => {
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const checkAll = schools.length === checkedList.length;
<<<<<<< HEAD:pages/jobs/schoolSelect/index.tsx
  const indeterminate = checkedList.length > 0; // < plainOptions.length;
=======
  const indeterminate =
    checkedList.length > 0 && checkedList.length < schools.length;
>>>>>>> 059b1ffa9db8799f3d3faf346036187802da52bd:pages/recruiter/postJobs/schoolSelect/index.tsx

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? schools : []);
  };

  const state = useSelector((state: RootState) => state.account);

  return (
    <div className="job-school">
      <h2>Chọn trường để đăng công việc</h2>
      <br />
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Chọn tất cả
      </Checkbox>
      {/* <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Chọn trường công nghệ (recommended)
      </Checkbox> */}
      {/* <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Chọn trường kinh tế
      </Checkbox> */}
      <Divider />
      <CheckboxGroup options={schools} value={checkedList} onChange={onChange} />
      <br />
      <SubmitButton text={"Đăng công việc"} />
    </div>
  );
};

export default SelectSchool;
