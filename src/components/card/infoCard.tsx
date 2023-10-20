import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { Card as AntdCard, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { BookmarkButton } from "@components/button/BookmarkButton";

type InfoCardProps = {
  info?: {
      id: number,
      title?: string,
      name?: string,
      institution?: string,
      location?: string,
      attribute?: string,
      commonSchool?: Array<Object>,
      date?: Date,
      time_published?: string,
      company_data?: {
        name?: string,
      },
      job_type?: string,
      applicants?: Array<Object>,
    },
  loading?: boolean,
};

export const InfoCard: React.FC<InfoCardProps> = ({ info, loading, ...rest }) => {
  const { Meta } = AntdCard;

  return (
    <AntdCard
      className="info-card"
      loading={loading}
      cover={
        // Temporary solution for disabling clicking during loading
        loading ? <img src="https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc" /> : 
        <Link href={`/student/jobs/${info?.id}`}>
          <img src="https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc" />
        </Link>
      }
      children={
          info && (
            <div>
              <BookmarkButton className="bookmark-btn" id={info.id}/>
              <Link href={`/student/jobs/${info.id}`}>
                <Meta
                  title={info.title || ""}
                  description={
                    <div>
                      <div className="date-posted">
                        {
                          info?.time_published === undefined ? 
                            "Ngày không xác định" 
                          : 
                            `Đăng vào ${moment(info.time_published).format("D/M/YYYY")}`
                        }
                      </div>
                      <h4>{ info.company_data?.name || "Công ty trống" }</h4>
                      <span>{ info.job_type || "Not Specified Status"}{" | "}{ info.location || "Unknown Location" }</span>
                      <div className="avatar-info-mini">
                        <div>
                          {info.applicants?.map((friend) => (<img src={"/images/avatar.png"}></img>))}
                        </div>
                        {(info.applicants && info.applicants.length !== 0) &&
                          <h4>{(info.applicants).length + " người từ trường bạn đang làm việc tại đây"}</h4>
                        }
                      </div>
                    </div>
                  }
                />
              </Link>
            </div>
          )
      }
      {...rest}
    />
  );
};