import { NextPage } from "next";
import { FilterNavbar } from "@components/navbar/FilterNavbar";
import { JobCard } from "@components/cardsGrid/JobCard";
import { Row, Col } from "antd";
import { JobDescription } from "@components/main/JobContent";
import { useState } from "react";
//create a next page for the student home page, code below
const StudentEvents: NextPage = () => {
  const jobsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  return (
    <div>
      <FilterNavbar />
      <div className="job-portal-fusion"></div>
      <Row>
        <Col span={7}>
          <div className="job-portal-list">
            <div className="job-portal-list-result">20k kết quả</div>
            {jobsList.map((job, i) => (
              <JobCard active={i===activeCardIndex} onClick={()=>setActiveCardIndex(i)}/>
            ))}
          </div>
        </Col>
        <Col span={17}>
          <JobDescription />
        </Col>
      </Row>
    </div>
  );
};

export default StudentEvents;
