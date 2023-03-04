import { NextPage } from "next";
import { JobFilterNavbar } from "@components/navbar/JobFilterNavBar";
import { JobCard } from "@components/cardsGrid/JobCard";
import { Row, Col } from "antd";
import { JobDescription } from "@components/main/JobContent";
import { useState } from "react";
//create a next page for the student home page, code below
const StudentJobs: NextPage = () => {
  const jobsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  return (
    <div>
      <JobFilterNavbar />
      <div className="job-portal-fusion"></div>
      <Row>
        <Col span={6}>
          <div className="job-portal-list">
            <div className="job-portal-list-result">20k kết quả</div>
            {jobsList.map((job, i) => (
              <JobCard active={i===activeCardIndex} onClick={()=>setActiveCardIndex(i)}/>
            ))}
          </div>
        </Col>
        <Col span={18}>
          <JobDescription />
        </Col>
      </Row>
    </div>
  );
};

export default StudentJobs;
