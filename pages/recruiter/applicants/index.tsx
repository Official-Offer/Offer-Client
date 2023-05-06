import { NextPage } from "next";
import dynamic from "next/dynamic";

//create a next page for the student home page, code below
const Applicant: NextPage = () => {
  const ApplicantTable = dynamic(() =>
    import("@components").then((mod: any) => mod.ApplicantTable)
  ) as any;

  return (
    <div className = "applicant">
      <h1 className="applicant-title">Applicant table</h1>
      <div className="filter-applicant"></div>
      <div className = "applicant-table">
      <ApplicantTable />
      </div>
    </div>
  );
};

export default Applicant;
