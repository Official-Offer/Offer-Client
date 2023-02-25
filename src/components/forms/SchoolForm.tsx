import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { SubmitButton } from "@styles/styled-components/styledButton";
import { Typography } from "antd";
import Link from "next/link";

interface ISchoolForm {
  onSubmit: (email: string) => void;
}

function SchoolForm({ onSubmit }: ISchoolForm) {
  const [school, setSchool] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(school);
  };

  const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchool(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <b> Kết nối với trường của bạn: </b>
        </label>
        <br />
        <br />
        <FormInput
          width="250px"
          list="mySuggestions"
          value={school}
          onChange={handleSchoolChange}
          required
        />
        <datalist id="mySuggestions">
          <option value="Bách Khoa" />
          <option value="Sư Phạm" />
          <option value="Ngoại Thương" />
          <option value="Kinh Tế Quốc Dân" />
          <option value="FPT" />
          <option value="VinUniversity" />
          <option value="RMIT" />
          <option value="UMass" />
        </datalist>
        <br />
        <br />
        <SubmitButton type="submit">Tiếp tục</SubmitButton>
        <br />
        <br />
        <hr />
        <Typography.Text type="secondary">
          Đã có tài khoản? <br />
          <Typography.Text underline>
            <Link href="/student/login">Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>
        <br />
        <br />
        <Typography.Text type="secondary">
          Bạn là nhà tuyển dụng? <br />
          <Typography.Text underline>
            <Link href="/student/login">Đăng ký/Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>
      </form>
    </div>
  );
}

export default SchoolForm;
