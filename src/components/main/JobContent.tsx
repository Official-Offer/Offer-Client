import { InboxOutlined, TagOutlined } from "@ant-design/icons";
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
      <img className="job-portal-description-logo" src="/images/samsing.png" />
      <div className="avatar-info">
        <div>
          {avatarURL.map((url) => (
            <img src={url}></img>
          ))}
        </div>
        <h4>18+ people from your school work here</h4>
      </div>
      <div className="job-portal-description-actions">
        <Button className="apply">Ung tuyen</Button>
        <Button className="bookmark" icon={<TagOutlined />} />
        <Button className="inbox" icon={<InboxOutlined style={{fontSize: 20}}/>}>Nhan tin</Button>
        
      </div>
      <div className="job-portal-description-important">
        <div className="flex">
          <div className="left">
            <div className="title">Mức lương</div>
            <div className="detail">120k USD</div>
            <div className="title">Cap bac</div>
            <div className="detail">Undergrad</div>
          </div>
          <div className="right">
            <div className="title">Company Size</div>
            <div className="detail">50-100</div>
            <div className="title">Hinh thuc lam viec</div>
            <div className="detail">Part-Time</div>
          </div>
        </div>
        <div className="title">Dia diem</div>
        <div className="detail">
          - Ha Noi: Tran Duy Hung <br /> - Saigon: Bui Vien
        </div>
      </div>
      <div className="job-portal-description-title">Mo ta</div>
      <div className="job-portal-description-detail">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        sequi illum perferendis similique perspiciatis quasi ratione, deserunt
        fuga ducimus rerum deleniti aut tenetur recusandae magnam? Placeat ullam
        accusantium ex distinctio.
      </div>
      <div className="job-portal-description-title">Yeu cau</div>
      <div className="job-portal-description-detail">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
        cupiditate, consequuntur fugit illum rerum laudantium. Cumque
        repudiandae, iusto, velit excepturi dignissimos maiores quisquam, optio
        labore nobis nisi ducimus possimus tempora.
      </div>
    </div>
  );
};
