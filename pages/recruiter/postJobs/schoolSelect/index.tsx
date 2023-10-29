import { NextPage } from "next";
import { useRouter } from "next/router";
import SelectSchool from "@components/jobs/shoolSelect";

const SchoolSelect: NextPage = () => {
  const router = useRouter();

  return (
    <div className="recruiter-job-post">
      <div className="recruiter-form">
        <SelectSchool
          onClick={(): void => {
            router.push("/recruiter/jobs");
          }}
        />
      </div>
    </div>
  );
};

export default SchoolSelect;
