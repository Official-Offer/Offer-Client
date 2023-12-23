import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { JobPostForm } from "@components/forms/JobPostForm";
import { postJob } from "@services/apiJob";

//create a next page for the student home page, code below
const PostJobs: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);
  const { school } = router.query;

  return (
    <div className="recruiter-job-post">
      <h1>Tạo công việc mới</h1>
      <div className="recruiter-form">
        <JobPostForm
          onCancel={(): void => {
            router.back();
            // router.push("/advisor/jobs");
          }}
          onSubmit={(): void => {
            school
              ? router.push(`/advisor/postJobs/jobDesc?school=${school}`)
              : router.push(`/advisor/postJobs/jobDesc`);
          }}
        />
      </div>
    </div>
  );
};

export default PostJobs;
