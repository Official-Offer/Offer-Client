import React from "react";
import { NextPage } from "next";
// import { JobDescription } from "@components/jobs";
import { useRouter } from "next/router";
import { JobDescription } from "@components/jobs/jobDesc";
import { getJob } from "../../../../services/apiJob";
import { useQuery } from "@tanstack/react-query";
import { LoadingLine } from "@components/loading/LoadingLine";
import { LoadingPage } from "@components/loading/LoadingPage";
import { useDispatch } from "react-redux";
import {
  setAddress,
  setDeadline,
  setDescription,
  setLevel,
  setMajor,
  setTitle,
  setType,
  setUpperSalary,
  setSalary,
  setSchoolIds,
  setCreatedAt
} from "@redux/actions";
// import { LoadingLine } from "@components/loading/LoadingLine";

const JobEdit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const getJobQuery = useQuery(["job", id], () => getJob(Number(id)), {
    onSuccess: async (job: any) => {
      dispatch(setTitle(job.title));
      dispatch(setMajor(job.required_majors.map((major: any) => major.id)));
      dispatch(setAddress(job.address.city));
      dispatch(setDeadline(job.deadline));
      dispatch(setSalary(job.lower_salary));
      dispatch(setUpperSalary(job.upper_salary));
      dispatch(setCreatedAt(job.created_at))
      dispatch(setSchoolIds(job.request_approval_from));
      dispatch(
        setLevel(
          job.levels.map((level: any) => {
            if (level == "internship") return "Thực tập";
            if (level == "newgrad") return "Nhân viên chính thức";
            if (level == "experienced") return "Đã có kinh nghiệm";
          })
        )
      );
      dispatch(
        setType(
            job.job_types.map((type: any) => {
                if (type == "contract") return "Hợp đồng";
                if (type == "volunteer") return "Tình nguyện";
                return type
            })
            )
        )
      dispatch(setDescription(job.description));
    //   console.log(job);
    },
    onError: () => {},
  });

  return getJobQuery.isLoading ? (
    <LoadingPage />
  ) : (
    <JobDescription
      onClick={() => {
        // router.push("/recruiter/postJobs/schoolSelect");
        router.push("/recruiter/jobs");
      }}
      onBack={() => {
        router.back();
      }}
      edit={true}
      id={id}
    />
  );
};
export default JobEdit;
