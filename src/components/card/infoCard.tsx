import React, { useRef } from "react";

import { Card as AntdCard, Button } from "antd";
import { Card } from "./index";

type InfoCardProps = {
  info: {
      name?: string,
      institution?: string,
      location?: string,
      attribute?: string,
      commonSchool?: Array<Object>,
      date?: Date,
    },
};

export const InfoCard: React.FC<InfoCardProps> = ({info}) => {
  const cardTrayRef = useRef(null);
  const { Meta } = AntdCard;

  return (
    <Card 
      className="info-card"
      cover={info.cover !== undefined ? <img alt={info.name + " at " + info.institution} src={info.cover}/> : ""}
      children={
          <Meta
            title={info.name}
            description={
              <div>
                <span className="date-posted">{(info.date).toDateString()}</span>
                <h4>{info.institution}</h4>
                <span>{info.location}</span>
                <p>{info.attribute}</p>
                <div className="avatar-info">
                  <div>
                    {info.commonSchool.map((friend) => (<img src={friend.avatar}></img>))}
                  </div>
                  {(info.commonSchool).length === 0 ? "" : <h4>{(info.commonSchool).length + " người từ trường bạn đang làm việc tại đây"}</h4>}
                </div>
              </div>
            }
          />
      }
    />
  );
};
