import React, { useRef } from "react";

import { Card as AntdCard, Button } from "antd";
import { EventCard } from "@components/card/eventCard";
import { InfoCard } from "@components/card/infoCard";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

type InfoCardProps = {
  infoList: ({
    name?: string,
    institution?: string,
    location?: string,
    attribute?: string,
    commonSchool?: Array<Object>,
    date?: Date,
  })[],
  isEvent: boolean,
};

export const InfoCardTray: React.FC<InfoCardProps> = ({infoList, isEvent}) => {
  const cardTrayRef = useRef(null);
  const { Meta } = AntdCard;

  const scrollLeft = (e) => {
    e.preventDefault();
    cardTrayRef.current.scrollBy({
      left: -cardTrayRef.current.clientWidth,
      behavior: "smooth"
    });
  };
  const scrollRight = (e) => {
    e.preventDefault();
    cardTrayRef.current.scrollBy({
      left: cardTrayRef.current.clientWidth,
      behavior: "smooth"
    });
  };

  return (
    <div className="info-section">
      <Button className="scroll-btn prev-btn" icon={<ArrowLeftOutlined />} onClick={scrollLeft}/>
      <div className="card-tray" ref={cardTrayRef}>
        {infoList.map((info) => (isEvent ? (<EventCard info={info} />) : (<InfoCard info={info} />)))}
      </div>
      <Button className="scroll-btn next-btn" icon={<ArrowRightOutlined />} onClick={scrollRight}/>
    </div>
  );
};
