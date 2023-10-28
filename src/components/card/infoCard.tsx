import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Card as AntdCard, Button, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import type { Address, Job } from "@types/dataTypes";
import { BookmarkButton } from "@components/button/BookmarkButton";
import { JobContent } from "@components/content/JobContent";
import { formatAddress } from "@utils/formatters/stringFormat";
import { formatNum, dateDist } from "@utils/formatters/numberFormat";
import { translateJobType } from "@utils/formatters/translateFormat";

type InfoCardProps = {
  info?: Job,
  loading?: boolean,
};

export const InfoCard: React.FC<InfoCardProps> = ({ info, loading, ...rest }) => {
  const { Meta } = AntdCard;
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <AntdCard
        className="info-card"
        loading={loading}
        onClick={() => !loading && setOpenModal(true)}
        cover={
          // Temporary solution for disabling clicking during loading
          loading ? <img src="https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc" /> : 
          <img src="https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc" />
        }
        children={
          info && (
            <div>
              {/* <BookmarkButton className="bookmark-btn" id={info.pk}/> */}
              {/* <Link href={`/student/jobs/${info.id}`}> */}
                <Meta
                  title={info.title || ""}
                  description={
                    <div>
                      <div className="date-posted">
                        {
                          info.time_posted === null ? 
                            "Ngày không xác định" 
                          : 
                            `Đăng ${dateDist(info.time_posted)}`
                        }
                      </div>
                      <h4>{ info.company.name || "Công ty trống" }</h4>
                      <span>
                        { translateJobType(info.job_type) || "Không xác định"}
                        {" | "}
                        {
                          info.address ? formatAddress(info.address, true) : (
                            info.company.address ? formatAddress(info.company.address, true) : "Không có địa điểm"
                        )}
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
      <Modal
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        footer={null}
        className="layout-largescreen"
      >
        <JobContent jobData={info} isMinimized />
      </Modal>
    </>
  );
};