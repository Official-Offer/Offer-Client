import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { BasicInfoForm, FootnoteForm } from "@components/forms";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserDetails } from "services/apiUser";
import { getStudentDetails, updateStudent } from "services/apiStudent";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { JobPostForm } from "@components/forms/JobPostForm";

//create a next page for the student home page, code below
const PostJobs: NextPage = () => {
  const router = useRouter();
  const studentQuery = useQuery({ queryKey: ["student-details"], queryFn: getStudentDetails });
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);

  const mutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: async (data) => {
      // Invalidate and refetch
      // router.reload();
      router.push("/student");
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
  });
  
  // console.log(studentDetails);
  
  return (
      <div className="register-content">
        <div className="register-content-form">
          <h1>Tạo công việc mới</h1>
          <JobPostForm
            onSubmit={(first_name: string, last_name: string, phone_number: string, major: string, roles: string): void => {
              state.role.isStudent ? mutation.mutate({
                first_name,
                last_name,
                phone_number,
                // expected_graduation,
                major,
              }): mutation.mutate({
                first_name,
                last_name,
                phone_number,
                // is_reviewer,
                roles
              })
            }}
            isLoading={mutation.isLoading}
          />
        </div>
      </div>
  );
};

export default PostJobs;
