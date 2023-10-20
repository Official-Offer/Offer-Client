import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { Card as AntdCard, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Address, Job } from "@types/dataTypes";
import { BookmarkButton } from "@components/button/BookmarkButton";
import { formatAddress, formatNum } from "@utils/formatters";

type InfoCardProps = {
  info?: Job,
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
              <BookmarkButton className="bookmark-btn" id={info.pk}/>
              {/* <Link href={`/student/jobs/${info.id}`}> */}
                <Meta
                  title={info.title || ""}
                  description={
                    <div>
                      <div className="date-posted">
                        {
                          info?.time_posted === null ? 
                            "Ngày không xác định" 
                          : 
                            `Đăng vào ${moment(info.time_posted).format("D/M/YYYY")}`
                        }
                      </div>
                      <h4>{ info.company.name || "Công ty trống" }</h4>
                      <span>
                        { info.job_types.toString() || "Loại công việc trống"}
                        {" | "}{info.address ? formatAddress(info.address, true) : "Không có địa điểm"}
                      </span>
                      <div className="avatar-info-mini">
                        {(info.expected_no_applicants && info.expected_no_applicants !== 0) && 
                          <>
                            <div>
                              {new Array(Math.min(3, info.expected_no_applicants)).fill(
                                <img src="/images/avatar.png" alt="Avatar" />
                              )}
                            </div>
                            <h4>{
                              formatNum(info.expected_no_applicants) + 
                              " người cùng trường bạn"
                            }</h4>
                          </>
                        }
                      </div>
                    </div>
                  }
                />
              {/* </Link> */}
            </div>
          )
      }
      {...rest}
    />
  );
};