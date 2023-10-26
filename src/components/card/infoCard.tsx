import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Card as AntdCard, Button, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import type { Address, Job } from "@types/dataTypes";
import { BookmarkButton } from "@components/button/BookmarkButton";
import { JobContent } from "@components/content/JobContent";
import { formatAddress, formatNum, dateDist } from "@utils/formatters";

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
                        { info.job_types.toString() || "Loại công việc trống"}
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
        {/* <div className="modal-info">
          <div className="modal-info-header">
            <div className="modal-info-header-left">
              <h1>{info?.title}</h1>
              <span>
                <h3>{info?.company.name}</h3>
                <span>{`Đăng vào ${formatDate(info?.time_posted, "D/M/YYYY", true)}`}</span>
              </span>
            </div>
          </div>
          <div className="modal-info-body">
            <div className="modal-info-body-left">
              <div className="modal-info-body-left-header">
                <h3>Thông tin công việc</h3>
                <span>
                  {
                    info?.time_posted === null ? 
                      "Ngày không xác định" 
                    : 
                      `Đăng vào ${formatDate(info?.time_posted, "D/M/YYYY")}`
                  }
                </span>
              </div>
              <div className="modal-info-body-left-content">
                <h4>Mô tả công việc</h4>
                <div dangerouslySetInnerHTML={{__html: info?.description || "Trống"}} />
              </div>
              <div className="modal-info-body-left-content">
                <h4>Yêu cầu công việc</h4>
                <div dangerouslySetInnerHTML={{__html: info?.requirements || "Trống"}} />
              </div>
              <div className="modal-info-body-left-content">
                <h4>Quyền lợi được hưởng</h4>
                <div dangerouslySetInnerHTML={{__html: info?.benefits || "Trống"}} />
              </div>
            </div>
            <div className="modal-info-body-right">
              <div className="modal-info-body-right-header">
                <h3>Thông tin công ty</h3>
              </div>
              <div className="modal-info-body-right-content">
                <h4>Giới thiệu</h4>
                <div dangerouslySetInnerHTML={{__html: info?.company.description || ""}} />
              </div>
              <div className="modal-info-body-right-content">
                <h4>Địa chỉ</h4>
                <div dangerouslySetInnerHTML={{__html: formatAddress(info?.company.address as Address, true)}} />
              </div>
              <div className="modal-info-body-right-content">
                <h4>Website</h4>
                <div dangerouslySetInnerHTML={{__html: info?.company.website || ""}} />
              </div>
              <div className="modal-info-body-right-content">
                <h4>Số điện thoại</h4>
                <div dangerouslySetInnerHTML={{__html: info?.company.phone || ""}} />
              </div>
            </div>
          </div>
        </div> */}
        <JobContent jobData={info} />
      </Modal>
    </>
  );
};