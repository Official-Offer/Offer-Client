import { NextPage } from "next";
import dynamic from "next/dynamic";

//create a next page for the student home page, code below
const Recruiter: NextPage = () => {
  const ApplicantTable = dynamic(() =>
    import("@components").then((mod: any) => mod.ApplicantTable)
  ) as any;

  return (
    <div>
      <ApplicantTable />
    </div>
  );
};

export default Recruiter;
