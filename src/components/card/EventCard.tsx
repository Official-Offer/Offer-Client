import React from "react";

import { Card as AntdCard, Button } from "antd";
import { Card } from "./index";

type EventCardProps = {
  info: {
    name: string;
    institution: string;
    location: string;
    attribute: string;
    commonSchool: Array<Object>;
    date: Date;
    cover?: string;
  };
};

export const EventCard: React.FC<EventCardProps> = ({ info, ...rest }) => {
  return (
    <Card
      className="event-card"
      cover={
        info.cover !== undefined ? (
          <img alt={info.name + " at " + info.institution} src={info.cover} />
        ) : (
          ""
        )
      }
      children={
        <div>
          <div className="event-date">
            <h3>{info.date.getDate()}</h3>
            <h4>tháng</h4>
            <h3>{info.date.getMonth()}</h3>
          </div>
          <div className="event-info">
            <h3>{info.name}</h3>
            <h4>{info.institution}</h4>
            <span>{info.location}</span>
            <p>{info.attribute}</p>
            {info.commonSchool.length === 0 ? (
              ""
            ) : (
              <h4>
                {info.commonSchool.length +
                  " người từ trường bạn đang làm việc tại đây"}
              </h4>
            )}
          </div>
        </div>
      }
      {...rest}
    />
  );
};
