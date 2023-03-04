import { Button } from "antd";
export const JobDescription: React.FC = () => {
  const avatarURL = [
    "/images/avatar.png",
    "/images/avatar.png",
    "/images/avatar.png",
  ];
  return (
    <div className="job-portal-description">
      <div className="job-portal-description-title">
        Thực tập sinh Kỹ sư phần mềm chi nhánh TPHCM
      </div>
      <div className="job-portal-description-detail">
        <p>Hạn nộp: 30/2/2023</p>
        <p>&emsp;•&emsp;</p>
        <p>Đăng 2 ngày trước</p>
      </div>
      <img src="/images/samsing.png" />
      <div className="job-portal-description-employees">
        <div className="job-portal-description-employees-avatars">
          {avatarURL.map((url) => (
            <img src={url}></img>
          ))}
        </div>
        <div className="job-portal-description-employees-number">
          18+ people from your school work here
        </div>
      </div>
      <div className="job-portal-description-actions">
        <Button>Ung tuyen</Button>
        <Button />
        <Button>Nhan tin</Button>
      </div>
    </div>
  );
};
