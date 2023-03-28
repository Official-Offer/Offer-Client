import React, { useRef } from "react";

import { Card as AntdCard, Button } from "antd";
import { Card } from "./index";

type EventCardProps = {
  info: {
    name?: string,
    institution?: string,
    location?: string,
    attribute?: string,
    commonSchool?: Array<Object>,
    date?: Date,
  },
};

export const EventCard: React.FC<EventCardProps> = ({info}) => {
  const cardTrayRef = useRef(null);
  const { Meta } = AntdCard;

  return (
    <Card 
      className="event-card"
      cover={info.cover !== undefined ? <img alt={info.name + " at " + info.institution} src={info.cover}/> : ""}
      children={
          <div>
            <div className="event-date">
              <h2>{(info.date).getDate()}</h2>
              <h3>tháng</h3>
              <h3>{(info.date).getMonth()}</h3>
            </div>
            <div className="event-info">
              <h2>{info.name}</h2>
              <h4>{info.institution}</h4>
              <span>{info.location}</span>
              <p>{info.attribute}</p>
              {(info.commonSchool).length === 0 ? "" : <h4>{(info.commonSchool).length + " người từ trường bạn đang làm việc tại đây"}</h4>}
            </div>
          </div>
      } />
  );
};
