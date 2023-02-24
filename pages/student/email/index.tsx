import EmailForm from "@components/forms/EmailForm";
import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";

//create a next page for the student home page, code below
const StudentEmail: NextPage = () => {
  return (
    <div className="student-email">
      <div className="student-email-sideBar">
       <LeftPanel> </LeftPanel>
      </div>
      <div className="student-email-content">
        <div className="student-email-content-form">
          <EmailForm
            onSubmit={(email) => {
              return;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentEmail;
