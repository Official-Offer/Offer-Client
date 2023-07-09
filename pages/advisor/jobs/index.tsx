import { NextPage } from "next";
import dynamic from "next/dynamic";

//create a next page for the student home page, code below
const Jobs: NextPage = () => {
  const ApplicantTable = dynamic(() =>
    import("@components").then((mod: any) => mod.ApplicantTable)
  ) as any;

  return (
    <div className="advisor">
      <h1 className="advisor-title">Công việc</h1>
      <div className="advisor-filter"></div>
      <div className="advisor-table">
        <ApplicantTable />
      </div>
    </div>
  );
};

export default Jobs;
