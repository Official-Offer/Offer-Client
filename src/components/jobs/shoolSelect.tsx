import { NextPage } from "next";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { Checkbox, Divider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";
import { SubmitButton } from "@components/button/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { addSchoolsToJob } from "@services/apiJob";

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
import type { JSXElementConstructor, ReactNode } from "react";

type JSXComponent = JSXElementConstructor<{
  children?: ReactNode;
  [prop: string]: any;
}>;

export const SelectSchool: React.FC<any> = ({ onClick }) => {
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const [schoolId, setSchoolId] = useState<number[]>([]);
  const checkAll = schools.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < schools.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setSchoolId(list.map((item) => schools.indexOf(item as string) + 1));
    console.log(schoolId);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? schools : []);
    setSchoolId(
      e.target.checked ? schools.map((item, index) => index + 1) : [],
    );
    console.log(schoolId);
  };

  const state = useSelector((state: RootState) => state.jobs);

  const jobQuery = useMutation({
    mutationKey: ["school-job"],
    mutationFn: addSchoolsToJob,
    onSuccess: async (data) => {
      // dispatch(setJobId(data.id));
      onClick();
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
    },
  });

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
      <CheckboxGroup
        options={schools}
        value={checkedList}
        onChange={onChange}
      />
      <br />
      <SubmitButton
        text={"Đăng công việc"}
        isLoading={jobQuery.isLoading}
        onClick={() => {
          jobQuery.mutate({
            id: state.jobId,
            schools: schoolId,
          });
        }}
      />
    </div>
  );
};

export default SelectSchool;
