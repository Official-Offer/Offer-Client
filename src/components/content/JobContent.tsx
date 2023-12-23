import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button, Modal, Skeleton, Upload } from "antd";
import {
  UploadOutlined,
  SendOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { SelectOutlined } from "@ant-design/icons";
import moment from "moment";

import { postJobApp } from "@services/apiJob";

import { ApplyForm } from "@components/forms/ApplyForm";
import { ResumeForm } from "@components/forms/ResumeForm";
import { BookmarkButton } from "@components/button/BookmarkButton";

import { IconButton } from "@styles/styled-components/styledButton";
import { formatAddress } from "@utils/formatters/stringFormat";
import {
  formatNum,
  formatDate,
  dateDist,
  formatCurrency,
} from "@utils/formatters/numberFormat";
import {
  translateJobType,
  translateMajors,
} from "@utils/formatters/translateFormat";
import type { Job } from "src/types/dataTypes";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

type JobContentProps = {
  isLoading?: boolean;
  isMinimized?: boolean;
  isApplying?: boolean;
  jobData?: Job;
  bookmarkClicked?: boolean;
  setBookmarkClicked?: (isBookmarked: boolean) => void;
  setJobCardBookmarkClicked?: (isBookmarked: boolean) => void;
};

export const JobContent: React.FC<JobContentProps> = ({
  isLoading,
  isMinimized,
  isApplying,
  jobData,
  bookmarkClicked,
  setBookmarkClicked,
  setJobCardBookmarkClicked,
}) => {
  const router = useRouter();

  // Mock data
  const avatarURL = Array(
    Math.min(jobData?.expected_no_applicants ?? 0, 3),
  ).fill("/images/avatar.png");

  // States
  const [openApplyForm, setOpenApplyForm] = useState<boolean>(
    isApplying ?? false,
  );

  console.log("jobData", jobData);
  return (
    <div
      className={"job-portal-description " + (isMinimized ? "minimized" : "")}
    >
      {isLoading && (
        <>
          <Skeleton active loading={true} />
          <Skeleton active loading={true} />
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
          {isMinimized ? (
            <Link
              href={`/student/jobs${jobData?.pk ? `?id=${jobData.pk}` : ""}`}
            >
              <h2>{jobData?.title ?? "Tiêu đề trống"}</h2>
              {/* <span><SelectOutlined /></span> */}
            </Link>
          ) : (
            <h2>{jobData?.title ?? "Tiêu đề trống"}</h2>
          )}
          <h3>{jobData?.company.name}</h3>
        </div>
        <div className="job-portal-description-date">
          <span>
            Đăng vào {formatDate(jobData?.created_at, "D/M/YYYY", true)}
          </span>
          {jobData?.deadline && (
            <>
              <span>&ensp;•&ensp;</span>
              <span>
                {moment(jobData?.deadline).diff(moment()) <= 0
                  ? "Đã đóng đơn"
                  : `Hạn nộp: ${formatDate(jobData?.deadline, "D/M/YYYY")}`}
              </span>
            </>
          )}
        </div>
        {jobData?.company.logo ? (
          <img
            className="job-portal-description-logo"
            src={jobData.company.logo}
          />
        ) : (
          <BuildingOfficeIcon className="job-portal-description-logo" />
        )}
        <div className="job-portal-description-employees avatar-info-mini">
          <div>
            {new Array(Math.min(3, jobData?.company.no_employees ?? 3)).fill(
              <img src="/images/avatar.png" alt="Avatar" />,
            )}
          </div>
          <h5>
            {formatNum(jobData?.company.no_employees, false)} người đang làm
            việc trong công ty này
          </h5>
        </div>
        <div className="job-portal-description-actions">
          <Button
            className="apply"
            onClick={() =>
              isMinimized
                ? router.push(
                    `/student/jobs${
                      jobData?.pk ? `?id=${jobData.pk}` : ""
                    }&apply=true`,
                  )
                : setOpenApplyForm(true)
            }
          >
            Ứng tuyển
          </Button>
          {isMinimized && (
            <Link
              href={`/student/jobs${jobData?.pk ? `?id=${jobData.pk}` : ""}`}
            >
              <Button className="inbox">Chi Tiết</Button>
            </Link>
          )}
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
            open={jobData && openApplyForm ? true : false}
            submitFunction={postJobApp}
            onCancel={() => {
              setOpenApplyForm(false);
            }}
          />
        </div>
        <section className="job-portal-description-info">
          <div className="job-portal-description-info-section">
            <div>
              <h5>Mức lương:</h5>
              <div>
                {/* {jobData?.lower_salary} - {jobData?.upper_salary} */}
                {formatCurrency(jobData?.lower_salary, "Thỏa thuận")} -{" "}
                {formatCurrency(jobData?.upper_salary, "Thỏa thuận")}
              </div>
            </div>
            <div>
              <h5>Cấp bậc:</h5>
              <div>
                {jobData?.levels && jobData?.levels?.length > 0
                  ? jobData?.levels?.join(", ")
                  : "Không xác định"}
              </div>
            </div>
            <div>
              <h5>Địa điểm:</h5>
              <div>{formatAddress(jobData?.address)}</div>
            </div>
          </div>
          <div className="job-portal-description-info-section">
            <div>
              <h5>Hình thức làm việc:</h5>
              <div>
                {jobData?.job_types
                  ? "Không xác định"
                  : jobData?.job_types?.map((job_type) =>
                      translateJobType(job_type),
                    )}
              </div>
            </div>
            <div>
              <h5>Mô hình làm việc:</h5>
              <div>
                {jobData?.work_types
                  ? "Không xác định"
                  : jobData?.work_types?.map((work_type) =>
                      translateJobType(work_type),
                    )}
              </div>
            </div>
            <div>
              <h5>Yêu cầu ngành học:</h5>
              <div>{translateMajors(jobData?.required_majors)}</div>
            </div>
          </div>
        </section>
        {/* <section className="job-portal-description-section">
          <div className="job-portal-description-title">
            <h3>Yêu Cầu</h3>
          </div>
          <div className="job-portal-description-detail">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            cupiditate, consequuntur fugit illum rerum laudantium. Cumque
            repudiandae, iusto, velit excepturi dignissimos maiores quisquam,
            optio labore nobis nisi ducimus possimus tempora.
          </div>
        </section> */}
        <section>
          <div className="job-portal-description-title">
            <h3>Mô Tả</h3>
          </div>
          <div
            className="job-portal-description-detail"
            dangerouslySetInnerHTML={{ __html: jobData?.description ?? "" }}
          />
        </section>
      </Skeleton>
    </div>
  );
};
