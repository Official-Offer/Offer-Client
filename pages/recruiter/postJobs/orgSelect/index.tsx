import { NextPage } from "next";
import { useRouter } from "next/router";
import SelectOrg from "@components/jobs/orgSelect";

const OrgSelect: NextPage = () => {
  const router = useRouter();

  return (
    <div className="recruiter-job-post">
      <div className="recruiter-form">
        <SelectOrg
          onClick={(): void => {
            router.push("/recruiter/postJobs/jobForm");
          }}
        />
      </div>
    </div>
  );
};

export default OrgSelect;
