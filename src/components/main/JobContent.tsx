import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button, Modal, Skeleton, Upload } from "antd";
import { UploadOutlined, SendOutlined, FileDoneOutlined } from "@ant-design/icons";
import moment from "moment";
import { ResumeForm } from "@components/forms/ResumeForm";
import { BookmarkButton } from "@components/button/BookmarkButton";
import { IconButton } from "@styles/styled-components/styledButton";

type JobContentProps = {
  isLoading?: boolean,
  jobData?: Record<string, unknown>,
  bookmarkClicked?: boolean,
  setBookmarkClicked?: (isBookmarked: boolean) => void,
  setJobCardBookmarkClicked?: (isBookmarked: boolean) => void,
};

export const JobContent: React.FC<JobContentProps> = ({ isLoading, jobData, bookmarkClicked, setBookmarkClicked, setJobCardBookmarkClicked }) => {
  // Mock data
  const avatarURL = Array(Math.min(jobData?.company_data.number_of_employees ?? 0, 3)).fill("/images/avatar.png");
  
  // States
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Function
  const numberFormat = (n: number) => n?.toLocaleString().replace(/,/g, ".");
  
  return (
    <div className="job-portal-description">
      <Skeleton 
        active
        loading={isLoading}
        paragraph={{
          rows: 18,
        }}
      >
        <div className="job-portal-description-title">
          <h2>{jobData?.title ?? "Tiêu đề trống"}</h2>
        </div>
        <div className="job-portal-description-date">
          <span>Đăng vào {moment(jobData?.time_published).format("D/M/YYYY")}</span>
          <span>&emsp;•&emsp;</span>
          <span>
            {
              jobData?.is_closed ? "Đã đóng đơn" :
                `Hạn nộp: ${moment(jobData?.deadline).format("D/M/YYYY")}`
            }
          </span>
        </div>
        <img className="job-portal-description-logo" src="/images/samsing.png" />
        <div className="job-portal-description-employees avatar-info-mini">
          <div>
            {avatarURL.map((url) => (
              <img src={url}></img>
            ))}
          </div>
          <h4>
            {
              numberFormat(jobData?.company_data?.number_of_employees)
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
          <Button
            className="inbox"
            icon={<SendOutlined />}
          >
            Nhắn tin
          </Button>
          <BookmarkButton
            className="job-portal-list-card-bookmark"
            id={jobData?.id}
            isClickedByOther={bookmarkClicked}
            setIsClickedByOther={setBookmarkClicked}
            setClickOther={setJobCardBookmarkClicked}
          />
          <Modal
            title="Ứng tuyển"
            open={isVisible}
            onOk={() => {setIsVisible(false)}}
            onCancel={() => {setIsVisible(false)}}
            footer={[
              <IconButton backgroundColor="#D30B81">
                <div className="btn-body">
                  <span>Nộp đơn</span>
                  <span><FileDoneOutlined /></span>
                </div>
              </IconButton>
            ]}
          >
            <Upload.Dragger
              listType="picture"
              onChange={(info) => console.log(info)}
            >
              <UploadOutlined />
              <h4>Vui lòng tải lên CV của bạn</h4>
              <div>Bạn có thể kéo và thả file ở đây</div>
            </Upload.Dragger>
          </Modal>
        </div>
        <section className="job-portal-description-info">
          <div className="job-portal-description-info-section">
            <div>
              <h4>Mức lương</h4>
              <div>{numberFormat(jobData?.salary)}</div>
            </div>
            <div>
              <h4>Cấp bậc</h4>
              <div>Undergrad</div>
            </div>
          </div>
          <div className="job-portal-description-info-section">
            <div>
              <h4>Số lượng nhân viên</h4>
              <div>{(jobData?.company_data?.number_of_employees)?.toLocaleString().replace(/,/g, ".")}</div>
            </div>
            <div>
              <h4>Hình thức làm việc</h4>
              <div>{jobData?.job_type}</div>
            </div>
          </div>
          <div className="full-width">
            <h4>Địa điểm</h4>
            <div>{jobData?.location}</div>
          </div>
        </section>
        <section className="job-portal-description-section">
          <div className="job-portal-description-title">
            <h3>Mô Tả</h3>
          </div>
          <div className="job-portal-description-detail">
            {jobData?.description}
          </div>
        </section>
        <section>
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
      </Skeleton>
    </div>
  );
};
