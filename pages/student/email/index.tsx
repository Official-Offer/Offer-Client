import EmailForm from "@components/forms/EmailForm";
import { NextPage } from "next";

//create a next page for the student home page, code below
const StudentEmail: NextPage = () => {
  return (
    <div>
      <EmailForm onSubmit={(email)=>{return}}/>
    </div>
  );
};

export default StudentEmail;