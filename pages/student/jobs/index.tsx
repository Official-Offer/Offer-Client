import { NextPage } from "next";
import { FilterNavbar } from "@components/navbar/FilterNavbar";
import { JobCard } from "@components/card/JobCard";
import { Row, Col } from "antd";
import { JobDescription } from "@components/main/JobContent";
import { useState } from "react";
//create a next page for the student home page, code below
const StudentJobs: NextPage = () => {
  const jobsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const jobFilterArr = [
    {
      name: "Full/Part",
      checked: true,
    },
    {
      name: "Intern",
      checked: false,
    },
    {
      name: "1k+",
      checked: false,
    },
    {
      name: "On-campus",
      checked: false,
    },
  ];

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  return (
    <div>
      <FilterNavbar filters={jobFilterArr} />
      <div className="split-layout no-padding">
        <div className="split-layout-main main-sm">
          <ul className="job-portal-list">
            <li className="job-portal-list-result">20k kết quả</li>
            {jobsList.map((job, i) => (
              <li>
                <JobCard active={i===activeCardIndex} onClick={()=>setActiveCardIndex(i)}/>
              </li>
            ))}
          </ul>
        </div>
        <div className="split-layout-main main-xl">
          <JobDescription />
        </div>
      </div>
    </div>
  );
};

export default StudentJobs;
