import { NextPage } from "next";
import { JobFilterNavbar } from "@components/navbar/JobFilterNavBar";
//create a next page for the student home page, code below
const StudentJobs: NextPage = () => {
  return (
    <div>
      <JobFilterNavbar />
      <h1>StudentJobs</h1>
    </div>
  );
};

export default StudentJobs;