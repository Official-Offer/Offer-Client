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

export const InfoCard: React.FC<InfoCardProps> = ({ info, ...rest }) => {
  const cardTrayRef = useRef(null);
  const { Meta } = AntdCard;

  return (
    <Card 
      className="info-card"
      cover={<img src="https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc" />}
      children={
          <Meta
            title={info?.title || ""}
            description={
              <div>
                <span className="date-posted">{info?.time_published === undefined ? "Ngày không xác định" : (new Date(info.time_published)).toDateString()}</span>
                <h4>{ info?.company || "Unknown Company Name" }</h4>
                <span>{ info?.job_type || "Not Specified Status"}{" | "}{ info?.location || "Unknown Location" }</span>
                <div className="avatar-info-mini">
                  <div>
                    {info?.applicants?.map((friend) => (<img src={"/images/avatar.png"}></img>))}
                  </div>
                  {(info?.applicants || []).length === 0 ? "" : <h4>{(info?.applicants).length + " người từ trường bạn đang làm việc tại đây"}</h4>}
                </div>
              </div>
            }
          />
      }
      {...rest}
    />
  );
};
