import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMutation } from "react-query";
import moment from "moment";
import { bookmarkJob, deleteBookmarkedJob } from "@services/apiJob";
import { Card as AntdCard, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { BookmarkOutlined, BookmarkFilled } from "@components/icons";

type InfoCardProps = {
  info: {
      id?: number,
      name?: string,
      institution?: string,
      location?: string,
      attribute?: string,
      commonSchool?: Array<Object>,
      date?: Date,
    },
};

export const InfoCard: React.FC<InfoCardProps> = ({ info, ...rest }) => {
  const { Meta } = AntdCard;

  // States
  const [bookmarkClicked, setBookmarkClicked] = useState<boolean>(false);
  const [isInitBookmarked, setIsInitBookmarked] = useState<boolean>(info && info.is_bookmarked);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(info && info.is_bookmarked);

  // Hooks
  // Update bookmark when job data is ready
  useEffect(() => {
    setIsInitBookmarked(info?.is_bookmarked);
    setIsBookmarked(info?.is_bookmarked);
  }, [info]);

  // Start timer when bookmark button is clicked, reset if clicked again in under 2 seconds
  useEffect(() => {
    if (bookmarkClicked === false) return;
    // Prevent lags from user spam clicking the bookmark button by delaying API call by 2 seconds
    let resetTimer;
    resetTimer = setTimeout(() => {
      if (isInitBookmarked === isBookmarked) return;
      bookmarkMutation.mutate(info?.id);
      setBookmarkClicked(false);
      setIsInitBookmarked(isBookmarked);
    }, 2000);
    return () => clearTimeout(resetTimer);
  }, [isBookmarked]);

  const bookmarkMutation = useMutation({
    mutationFn: (id) => isBookmarked ? bookmarkJob(id) : deleteBookmarkedJob(id),
    onError: (err) => console.log(`Bookmark Error: ${err}`),
  });

  // Functions
  const handleBookmark = () => {
    setBookmarkClicked(true);
    setIsBookmarked(!isBookmarked);
  };

  return (
    <AntdCard
      className="info-card"
      cover={
        <Link href={`/student/jobs/${info?.id}`}>
          <img src="https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc" />
        </Link>
      }
      children={
        <div>
          <button className="bookmark-btn" onClick={handleBookmark}>
            {
              isBookmarked ? <BookmarkFilled /> : <BookmarkOutlined />
            }
          </button>
          <Link href={`/student/jobs/${info?.id}`}>
            <Meta
              title={info?.title || ""}
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
                  <h4>{ info?.company_data?.name || "Công ty trống" }</h4>
                  <span>{ info?.job_type || "Not Specified Status"}{" | "}{ info?.location || "Unknown Location" }</span>
                  <div className="avatar-info-mini">
                    <div>
                      {info?.applicants?.map((friend) => (<img src={"/images/avatar.png"}></img>))}
                    </div>
                    {(info?.applicants || []).length === 0 ? "" : <h4>{(info?.applicants).length + " người từ trường bạn đang làm việc tại đây"}</h4>}
                  </div>
                </div>
              }
            />
          </Link>
        </div>
      }
      {...rest}
    />
  );
};