import { NextPage } from "next";
import { FilterNavbar } from "@components/navbar/FilterNavbar";
import { EventCard } from "@components/card/EventCard";
import { Row, Col } from "antd";
import { JobDescription } from "@components/main/JobContent";
import { useState } from "react";
//create a next page for the student home page, code below
const StudentEvents: NextPage = () => {
  const jobsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  return (
    <div>
      {typeof EventCard}
    </div>
  );
};

export default StudentEvents;
