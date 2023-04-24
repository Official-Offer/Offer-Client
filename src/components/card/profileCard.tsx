import { Card as AntdCard, Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";

type ProfileCardProps = {
  fieldTitle: string,
  itemList?: [
    {
      name: string,
      logoURL?: string,
      dateLabel: string,
      dates?: [number, number],
      infoList?: [
        {
          label: string;
          details: string;
        }
      ]
    }
  ]
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ fieldTitle, itemList }) => {
  return (
    <AntdCard
      className="main-panel-card"
      title={
        <div className="main-panel-header">
          <h2>{fieldTitle}</h2>
          <Button className="icon-btn" type="text" icon={<PlusOutlined />} />
        </div>
      }
      children={
        <div className="main-panel-layout">
          {
            itemList.map((item) => (
              <div className="main-panel-info">
                <div className="main-panel-info-logo">
                  {item.logoURL && <img src={item.logoURL} alt={"Logo of " + item.name} />}
                </div>
                <div className="main-panel-info-center">
                  <h3>{item.name}</h3>
                  {
                    item.dates && (
                      <div>
                        <b>{item.dateLabel}</b>
                        <span>{": " + item.dates[0] + "-" + item.dates[1]}</span>
                      </div>
                    )
                  }
                  {
                    (item.infoList) && (item.infoList).map((info) => (
                      <div>
                        <b>{info.label}</b>
                        <span>{": " + info.details}</span>
                      </div>
                    ))
                  }
                </div>
                <div>
                  <Button className="icon-btn" type="text" icon={<EditOutlined />} />
                </div>
              </div>
            ))
          }
        </div>
      }
    />
  );
}