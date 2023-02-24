import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";

interface IEmailForm {
  onSubmit: (email: string) => void;
}

function EmailForm({ onSubmit }: IEmailForm) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nhập email của bạn:
      </label>
      <FormInput
          width="250px"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EmailForm;

