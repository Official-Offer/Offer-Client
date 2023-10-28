import { useRef } from "react";
import { Button } from "antd";
import moment from "moment";
import { Job } from "src/types/dataTypes";
import { BookmarkOutlined } from "@components/icons/BookmarkOutlined";
import { BookmarkButton } from "@components/button/BookmarkButton";
import { formatAddress } from "@utils/formatters/stringFormat";
import { translateJobType } from "@utils/formatters/translateFormat";

type JobCardProp = {
  jobData: Job,
  active: boolean, //use this to pass in parameters from the job site
  onClick: () => void,
  bookmarkClicked?: boolean,
  setBookmarkClicked?: (isBookmarked: boolean) => void,
  setJobContentBookmarkClicked?: (isBookmarked: boolean) => void,
};

export const JobCard: React.FC<JobCardProp> = ({ jobData, active, onClick, bookmarkClicked, setBookmarkClicked, setJobContentBookmarkClicked }) => {
  const bookmarkBtnRef = useRef();

  return (
    <div className={`job-portal-list-card ${active ? "active" : ""}`} onClick={onClick}>
      <div className="job-portal-list-card-main">
        <h3 className="job-portal-list-card-title">
          {jobData.title ?? "Tiêu đề trống"}
        </h3>
        <div className="job-portal-list-card-detail">
          <div>{jobData.company.name ?? "Công ty trống"}</div>
          <div>{formatAddress(jobData.address || jobData.company.address, true)}</div>
          <div>{translateJobType(jobData.job_type)}</div>
        </div>
      </div>
      <BookmarkButton
        className="job-portal-list-card-bookmark"
        id={jobData.pk}
        isClickedByOther={bookmarkClicked}
        setIsClickedByOther={setBookmarkClicked}
        setClickOther={setJobContentBookmarkClicked}
      />
    </div>
  );
};
