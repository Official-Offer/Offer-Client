import EmailForm from "@components/forms/EmailForm";
import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUserList } from "services/apiUser";
import { getSchoolList } from "services/apiSchool";
import { useContext } from "react";
import AppContext from "@components/AppContext";

//create a next page for the student home page, code below
const StudentEmail: NextPage = () => {
  const queryClient = useQueryClient();
  const context = useContext(AppContext);
  // Queries
  const users = useQuery({ queryKey: ["users"], queryFn: getUserList });
  const schools = useQuery({ queryKey: ["schools"], queryFn: getSchoolList });
  console.log(schools);
  // Mutations
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //   },
  // });

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
              if (users.data.Response.filter((data: { email: string; }) => data.email == email).length > 0) {
                //if email is in database, navigate to login page
                router.push("/student/login");
              } else if (email.includes(".edu")) {
                const school = "Umass Amherst"
                // schools.data[email.split("@")[1]]
                //if email is not in database but have an .edu suffix, navigate to school page
                context.setRegisterEmail(email);
                context.setSchool(school);
                router.push(`/student/registration/password`);
              } else {
                //else, navigate to registration page
                context.setRegisterEmail(email)
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
