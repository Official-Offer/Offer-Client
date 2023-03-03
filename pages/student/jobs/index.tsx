import { NextPage } from "next";
import { JobFilterNavbar } from "@components/navbar/JobFilterNavBar";
import { JobCard } from "@components/cardsGrid/JobCard";
import { Row, Col } from "antd";
import { JobContent } from "@components/main/JobContent";
//create a next page for the student home page, code below
const StudentJobs: NextPage = () => {
  const jobsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      <JobFilterNavbar />
      <Row>
        <Col span={6}>
          <div className="job-portal-list">
            <div className="job-portal-list-result">20k kết quả</div>
            {jobsList.map((job) => (
              <JobCard />
            ))}
          </div>
        </Col>
        <Col span={18}>
          <JobContent />
        </Col>
      </Row>
    </div>
  );
};

export default StudentJobs;
