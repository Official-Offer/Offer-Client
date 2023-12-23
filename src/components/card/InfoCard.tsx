import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Card as AntdCard, Button, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import type { Address, Job } from "src/types/dataTypes";
import { BookmarkButton } from "@components/button/BookmarkButton";
import { JobContent } from "@components/content/JobContent";
import { formatAddress } from "@utils/formatters/stringFormat";
import { formatNum, dateDist } from "@utils/formatters/numberFormat";
import { translateJobType } from "@utils/formatters/translateFormat";
import { FireIcon } from "@heroicons/react/16/solid";

type InfoCardProps = {
  info?: Job;
  loading?: boolean;
};

export const InfoCard: React.FC<InfoCardProps> = ({
  info,
  loading,
  ...rest
}) => {
  const { Meta } = AntdCard;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const isNew = (date?: string): boolean => {
    if (date) {
      const today = new Date();
      const diff = today.getTime() - new Date(date).getTime();
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      return diffDays <= 7;
    }
    return false;
  };

  return (
    <>
      <AntdCard
        className="info-card"
        hoverable
        loading={loading}
        onClick={() => !loading && setOpenModal(true)}
        // cover={
        //   // Temporary solution for disabling clicking during loading
        //   loading ? (
        //     <img src="https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc" />
        //   ) : (
        //     <img src="https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc" />
        //   )
        // }
        children={
          info && (
            <div>
              {/* <BookmarkButton className="bookmark-btn" id={info.pk}/> */}
              {/* <Link href={`/student/jobs/${info.id}`}> */}
              <Meta
                // title={info.title || ""}
                description={
                  <>
                    {/* <div className="date-posted">
                      {info.created_at === null
                        ? "Ngày không xác định"
                        : `Đăng ${dateDist(info.created_at)}`}
                    </div> */}
                    <div>
                      {isNew(info.created_at) ? (
                        <div className="new-tag">Mới đăng</div>
                      ) : (
                        <div className="featured-tag">
                          <span className="tag-icon">
                            <FireIcon />
                          </span>
                          <span>Nổi bật</span>
                        </div>
                      )}
                      <h4 className="clamp-2 bold">
                        {info.title || "Tiêu đề trống"}
                      </h4>
                    </div>
                    <div className="bottom-section">
                      <h6>{info.company.name || "Công ty trống"}</h6>
                      <span>
                        {info?.job_types?.map(job_type => translateJobType(job_type)) || "Không xác định"}
                        {" | "}
                        {info.address
                          ? formatAddress(info.address, true)
                          : info.company.address
                            ? formatAddress(info.company.address, true)
                            : info.location ?? "Không có địa điểm"}
                      </span>
                      <div className="avatar-info-mini">
                        {info.expected_no_applicants &&
                          info.expected_no_applicants !== 0 && (
                            <>
                              <div>
                                {new Array(
                                  Math.min(3, info.expected_no_applicants),
                                ).fill(
                                  <img src="/images/avatar.png" alt="Avatar" />,
                                )}
                              </div>
                              <h4>
                                {formatNum(info.expected_no_applicants, false) +
                                  " người cùng trường bạn"}
                              </h4>
                            </>
                          )}
                      </div>
                    </div>
                  </>
                }
              />
              {/* </Link> */}
            </div>
          )
        }
        {...rest}
      />
      <Modal
        className="ant-modal-big"
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <JobContent jobData={info} isMinimized />
      </Modal>
    </>
  );
};
