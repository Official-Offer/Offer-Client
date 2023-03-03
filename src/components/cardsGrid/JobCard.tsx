import { Col, Row, Button } from "antd";
import { TagOutlined } from "@ant-design/icons";
export const JobCard: React.FC = () => {
  return (
    <div className="job-portal-list-card">
      <div className="job-portal-list-card-title">
        <Row>
          <Col span={20}>Thực tập sinh kỹ sư phần mềm chi nhánh TP.HCM</Col>
          <Col span={3}>
            <Button icon={<TagOutlined size={100}/>} />
          </Col>
        </Row>
      </div>
      <div className="job-portal-list-card-detail">Samsung</div>
      <div className="job-portal-list-card-detail">Hồ Chí Minh</div>
      <div className="job-portal-list-card-detail">Full Time / New Grad</div>
    </div>
  );
};
