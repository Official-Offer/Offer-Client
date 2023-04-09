import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { SubmitButton } from "@styles/styled-components/styledButton";
import { Typography } from "antd";
import { FootnoteForm } from "./FootnoteForm";
import Link from "next/link";

interface ISchoolForm {
  onSubmit: (email: string) => void;
}

export const SchoolForm: React.FC<ISchoolForm> = ({ onSubmit }: ISchoolForm) => {
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
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-flex">
          <div className="form-input">
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
        </div>
        <SubmitButton type="submit" className="form-submit-button">Tiếp tục</SubmitButton>
      </form>
      <FootnoteForm embedLogin />
    </div>
  );
}