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
import { postJob } from "@services/apiJob";

//create a next page for the student home page, code below
const DetailedCompanies: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);

  const mutation = useMutation({
    mutationFn: postJob,
    onSuccess: async (data) => {
      // Invalidate and refetch
      // router.reload();
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
  });

  // console.log(studentDetails);

  return (
    <div className="recruiter-job-post">
      <h1>Tạo công việc mới</h1>
      <div className="recruiter-form">
        <JobPostForm
          onSubmit={(
            title: string,
            department: string,
            description: string,
            salary: number,
            end_date: Date,
            expected_no_appliants: number
          ): void => {
            mutation.mutate({
              title,
              department,
              description,
              salary,
              end_date,
              expected_no_appliants,
            });
          }}
          isLoading={mutation.isLoading}
        />
      </div>
    </div>
  );
};

export default PostJobs;
