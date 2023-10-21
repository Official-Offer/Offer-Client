import { useRef } from "react";
import { Button } from "antd";
import { BookmarkOutlined } from "@components/icons/BookmarkOutlined";
import moment from "moment";
import { BookmarkButton } from "@components/button/BookmarkButton";

type JobCardProp = {
  jobData: {
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
