import { Button } from "antd";
import { BookmarkOutlined } from "@components/icons/BookmarkOutlined";
import moment from "moment";

type JobCardProp = {
  info: Record<string, unknown>,
  active: boolean; //use this to pass in parameters from the job site
  onClick: () => void;
};
export const JobCard: React.FC<JobCardProp> = ({ active, onClick }) => {
  return (
    <div className={`job-portal-list-card ${active ? "active" : ""}`} onClick={onClick}>
      <div>
        <h3 className="job-portal-list-card-title">Thực tập sinh kỹ sư phần mềm chi nhánh TP.HCM</h3>
        <div className="job-portal-list-card-detail">
          <div>Samsung</div>
          <div>Hồ Chí Minh</div>
          <div>Full Time / New Grad</div>
        </div>
      </div>
      <Button className="job-portal-list-card-bookmark icon-btn" type="text" icon={<BookmarkOutlined />} />
    </div>
  );
};
