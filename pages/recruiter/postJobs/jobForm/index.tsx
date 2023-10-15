import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { JobPostForm } from "@components/forms/JobPostForm";
import { postJob } from "@services/apiJob";

//create a next page for the student home page, code below
const PostJobs: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);

  const mutation = useMutation({
    mutationFn: postJob,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
  });

  return (
    <div className="recruiter-job-post">
      <h1>Tạo công việc mới</h1>
      <div className="recruiter-form">
        <JobPostForm
          onCancel={(): void => {
            router.push("/recruiter/jobs");
          }}
          onSubmit={(): void => {
            router.push("/recruiter/postJobs/jobDesc");
            return;
          }}
          isLoading={mutation.isLoading}
        />
      </div>
    </div>
  );
};

export default PostJobs;
