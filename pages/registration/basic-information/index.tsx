import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { BasicInfoForm, FootnoteForm } from "@components/forms";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserDetails } from "services/apiUser";
import { getStudentDetails, updateStudent } from "services/apiStudent";

//create a next page for the student home page, code below
const RegisterBasicInfo: NextPage = () => {
  const router = useRouter();
  const studentQuery = useQuery({ queryKey: ["student-details"], queryFn: getStudentDetails });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: async (data) => {
      // Invalidate and refetch
      // router.reload();
      router.push("/student");
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
  });
  
  console.log(studentDetails);
  
  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <h1>Xác nhận thông tin cơ bản</h1>
          <BasicInfoForm
            onSubmit={(name: string, dob: string, gradYear: string, job: string, major: string, school: string): void => {
              mutation.mutate({
                name,
                // expected_graduation: gradYear,
                // desired_job: job,
                major,
                // school
              });
              router.push("/student");
            }}
          />
          <br/>
          <FootnoteForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterBasicInfo;
