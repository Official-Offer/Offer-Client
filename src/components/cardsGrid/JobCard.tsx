import { Col, Row, Button } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
type JobCardProp = {
  children?: ReactNode;
  active: boolean; //use this to pass in parameters from the job site
  onClick: () => void;
};
export const JobCard: React.FC<JobCardProp> = ({ active, onClick }) => {
  const cardClassName = active
    ? "job-portal-list-card active"
    : "job-portal-list-card";
  return (
    <div className={cardClassName}>
      <div className="job-portal-list-card-title">
        <Row>
          <Col span={20} onClick={onClick}>
            Thực tập sinh kỹ sư phần mềm chi nhánh TP.HCM
          </Col>
          {!active && (
            <Col span={3}>
              <Button icon={<TagOutlined style={{ fontSize: 17 }} />} />
            </Col>
          )}
        </Row>
      </div>
      <div className="job-portal-list-card-detail">Samsung</div>
      <div className="job-portal-list-card-detail">Hồ Chí Minh</div>
      <div className="job-portal-list-card-detail">Full Time / New Grad</div>
    </div>
  );
};
