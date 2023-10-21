import { useRef } from "react";
import { Button } from "antd";
import moment from "moment";
import { Job } from "@types/dataTypes";
import { BookmarkOutlined } from "@components/icons/BookmarkOutlined";
import { BookmarkButton } from "@components/button/BookmarkButton";

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
          <div>{jobData.company_data?.name ?? "Công ty trống"}</div>
          <div>{jobData.location ?? "Vị trí trống"}</div>
          <div>{jobData.job_type ?? "Hình thức trống"}</div>
        </div>
      </div>
      <BookmarkButton
        className="job-portal-list-card-bookmark"
        id={jobData.id}
        isClickedByOther={bookmarkClicked}
        setIsClickedByOther={setBookmarkClicked}
        setClickOther={setJobContentBookmarkClicked}
      />
    </div>
  );
};
