import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { SubmitButton } from "@styles/styled-components/styledButton";
import { Typography } from "antd";
import Link from "next/link";
import FootnoteForm from "./FootnoteForm";

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
        <div className="form">
          <label>
            <b> Kết nối với trường của bạn: </b>
          </label>
          <FormInput
            width="250px"
            list="mySuggestions"
            value={school}
            onChange={handleSchoolChange}
            required
          />
        </div>
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
        <FootnoteForm />
      </form>
    </div>
  );
}

export default SchoolForm;
 