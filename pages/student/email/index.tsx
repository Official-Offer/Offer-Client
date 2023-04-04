import EmailForm from "@components/forms/EmailForm";
import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'

//create a next page for the student home page, code below
const StudentEmail: NextPage = () => {

  const router = useRouter();
  return (
    <div className="student-email">
      <div className="student-email-sideBar">
        <LeftPanel> </LeftPanel>
      </div>
      <div className="student-email-content">
        <div className="student-email-content-form">
          <EmailForm
            onSubmit={(email) => {
              if (email == "kiento0905.hec@gmail.com") {
                router.push("/student/login");
                //if email is in database, navigate to login page
              } else if (email.includes(".edu")) {
                //if email is not in database but have an .edu suffix, navigate to school page
                router.push("/student/registration/school");
              } else {
                //else, navigate to registration page
                router.push("/student/registration");
              }
              return;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentEmail;
