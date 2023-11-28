import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button, Modal, Skeleton, Upload } from "antd";
import { UploadOutlined, SendOutlined, FileDoneOutlined } from "@ant-design/icons";
import { SelectOutlined } from "@ant-design/icons";
import moment from "moment";

import { applyJob } from '@services/apiJob';

import { ApplyForm } from "@components/forms/ApplyForm";
import { ResumeForm } from "@components/forms/ResumeForm";
import { BookmarkButton } from "@components/button/BookmarkButton";

import { IconButton } from "@styles/styled-components/styledButton";
import { formatAddress } from "@utils/formatters/stringFormat";
import { formatNum, formatDate, dateDist } from "@utils/formatters/numberFormat";
import { translateJobType, translateMajors } from "@utils/formatters/translateFormat";
import type { Job } from "src/types/dataTypes";

type JobContentProps = {
  isLoading?: boolean,
  isMinimized?: boolean,
  jobData?: Job,
  bookmarkClicked?: boolean,
  setBookmarkClicked?: (isBookmarked: boolean) => void,
  setJobCardBookmarkClicked?: (isBookmarked: boolean) => void,
};

export const JobContent: React.FC<JobContentProps> = ({ isLoading, isMinimized, jobData, bookmarkClicked, setBookmarkClicked, setJobCardBookmarkClicked }) => {
  // Mock data
  const avatarURL = Array(Math.min(jobData?.expected_no_applicants ?? 0, 3)).fill("/images/avatar.png");
  
  // States
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  return (
    <div className={"job-portal-description " + (isMinimized ? "minimized" : "")}>
      {isLoading && (
        <>
          <Skeleton
            active
            loading={true}
          />
          <Skeleton
            active
            loading={true}
          />
        </>
      )}
      <Skeleton 
        active
        loading={isLoading}
        paragraph={{
          rows: 10,
        }}
      >
        <div className="job-portal-description-title">
          {
            isMinimized ? (
              <Link href={`/student/jobs${jobData?.pk ? `?id=${jobData.pk}` : ""}`}>
                <h2>{jobData?.title ?? "Tiêu đề trống"}</h2>
                {/* <span><SelectOutlined /></span> */}
              </Link>
            ) : (
              <h2>{jobData?.title ?? "Tiêu đề trống"}</h2>
            )
          }
          <h3>{jobData?.company.name}</h3>
        </div>
        <div className="job-portal-description-date">
          <span>Đăng vào {formatDate(jobData?.time_posted, "D/M/YYYY", true)}</span>
          <span>&ensp;•&ensp;</span>
          <span>
            {
              moment(jobData?.deadline).diff(moment()) <= 0 ? "Đã đóng đơn" :
                `Hạn nộp: ${formatDate(jobData?.deadline, "D/M/YYYY")}`
            }
          </span>
        </div>
        <img className="job-portal-description-logo" src="/images/samsing.png" />
        <div className="job-portal-description-employees avatar-info-mini">
          <div>
            {new Array(Math.min(3, jobData?.company.no_employees ?? 3)).fill(
              <img src="/images/avatar.png" alt="Avatar" />
            )}
          </div>
          <h4>
            {
              formatNum(jobData?.company.no_employees, false)
            } người đang làm việc trong công ty này
          </h4>
        </div>
        <div className="job-portal-description-actions">
          <Button
            className="apply"
            onClick={() => setIsVisible(true)}
          >
            Ứng tuyển
          </Button>
          {
            isMinimized && (
              <Link href={`/student/jobs${jobData?.pk ? `?id=${jobData.pk}` : ""}`}>
                <Button className="inbox">
                  Chi Tiết
                </Button>
              </Link>
            )
          }
          {jobData && (
            <BookmarkButton
              className="job-portal-list-card-bookmark"
              id={jobData?.pk}
              isClickedByOther={bookmarkClicked}
              setIsClickedByOther={setBookmarkClicked}
              setClickOther={setJobCardBookmarkClicked}
            />
          )}
          <ApplyForm 
            jobId={jobData?.pk} 
            open={jobData && isVisible ? true : false}
            submitFunction={applyJob}
            onCancel={() => {setIsVisible(false)}}
          />
        </div>
        <section className="job-portal-description-info">
          <div className="job-portal-description-info-section">
            <div>
              <h4>Mức lương:</h4>
              <div>{formatNum(jobData?.lower_salary, false, "Thỏa thuận")}</div>
            </div>
            <div>
              <h4>Cấp bậc:</h4>
              <div>Undergrad</div>
            </div>
            <div>
              <h4>Địa điểm:</h4>
              <div>{formatAddress(jobData?.company.address)}</div>
            </div>
          </div>
          <div className="job-portal-description-info-section">
            <div>
              <h4>Hình thức làm việc:</h4>
              <div>{translateJobType(jobData?.job_type)}</div>
            </div>
            <div>
              <h4>Mô hình làm việc:</h4>
              <div>{translateJobType(jobData?.work_type)}</div>
            </div>
            <div>
              <h4>Yêu cầu ngành học:</h4>
              <div>{translateMajors(jobData?.required_majors)}</div>
            </div>
          </div>
        </section>
        <section className="job-portal-description-section">
          <div className="job-portal-description-title">
            <h3>Yêu Cầu</h3>
          </div>
          <div className="job-portal-description-detail">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            cupiditate, consequuntur fugit illum rerum laudantium. Cumque
            repudiandae, iusto, velit excepturi dignissimos maiores quisquam, optio
            labore nobis nisi ducimus possimus tempora.
          </div>
        </section>
        <section>
          <div className="job-portal-description-title">
            <h3>Mô Tả</h3>
          </div>
          <div className="job-portal-description-detail" dangerouslySetInnerHTML={{ __html: jobData?.description ?? "" }} />
        </section>
      </Skeleton>
    </div>
  );
};
