import React, { useRef } from "react";

import { Card as AntdCard, Button } from "antd";
import { Card } from "@components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

export const InfoCardTray: React.FC<Props> = ({infoList, isEvent}) => {
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
        {infoList.map((info) => {
          return (
            <Card 
              className="info-card"
              cover={info.cover !== "" ? <img alt={info.name + " at " + info.institution} src={info.cover}/> : ""}
              children={
                <div className={isEvent ? "event-card" : ""}>
                  {isEvent ? <span className="event-date">{(info.datePosted).toDateString()}</span> : ""}
                  <Meta
                    title={info.name}
                    description={
                      <div>
                        <h4>{info.institution}</h4>
                        <span>{info.location}</span>
                        <p>{info.attribute}</p>
                        {isEvent ? "" : <span className="date-posted">{(info.datePosted).toDateString()}</span>}
                        {(info.commonSchool).length === 0 ? "" : <h4>{(info.commonSchool).length + " người từ trường bạn đang làm việc tại đây"}</h4>}
                      </div>
                    }
                  />
                </div>
              }
            />);
          })}
      </div>
      <Button className="scroll-btn next-btn" icon={<ArrowRightOutlined />} onClick={scrollRight}/>
    </div>
  );
};
