import { NextPage } from "next";
import { JobFilterNavbar } from "@components/navbar/JobFilterNavBar";
import { Row } from "antd";
//create a next page for the student home page, code below
const StudentJobs: NextPage = () => {
  return (
    <div>
      <JobFilterNavbar />
      <Row>
        
      </Row>
      <h1>StudentJobs</h1>
    </div>
  );
};

export default StudentJobs;