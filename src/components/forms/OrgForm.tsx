import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { SubmitButton } from "@styles/styled-components/styledButton";
import { Typography } from "antd";
import { FootnoteForm } from "./FootnoteForm";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

interface IOrgForm {
  onSubmit: (email: string) => void;
}

export const OrgForm: React.FC<IOrgForm> = ({ onSubmit }: IOrgForm) => {
  const [Org, setOrg] = useState("");
  const state = useSelector((state: RootState) => state.account);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(Org);
  };

  const handleOrgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrg(event.target.value);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-flex">
          <div className="form-input">
            <label>
              <b>
                {" "}
                {state.role.isStudent || state.role.isAdvisor
                  ? "Kết nối với trường của bạn:"
                  : "Kết nối với công ty của bạn:"}{" "}
              </b>
            </label>
            <FormInput
              width="250px"
              list={state.role.isStudent || state.role.isAdvisor ? "schoolSuggestions" : "companySuggestions"}
              value={Org}
              onChange={handleOrgChange}
              required
            />
          </div>
          <datalist id="schoolSuggestions">
            <option value="Bách Khoa" />
            <option value="Sư Phạm" />
            <option value="Ngoại Thương" />
            <option value="Kinh Tế Quốc Dân" />
            <option value="FPT" />
            <option value="VinUniversity" />
            <option value="RMIT" />
            <option value="UMass" />
          </datalist>
          <datalist id="companySuggestions">
            <option value="Tesla" />
            <option value="Vingroup" />
            <option value="Google Brain" />
            <option value="OpenAI" />
          </datalist>
        </div>
        <SubmitButton type="submit" className="form-submit-button">
          Tiếp tục
        </SubmitButton>
      </form>
      <FootnoteForm embedLogin />
    </div>
  );
};
