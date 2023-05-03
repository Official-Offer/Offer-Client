import  React, { useState } from "react";
import ReactDOM from "react-dom";
import { useQuery, useMutation } from "react-query";
import { Card as AntdCard, Button } from "antd";
import { ProfileCardForm } from "@components/forms";
import { ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";

type ProfileCardProps = {
  fieldTitle: string,
  getFunction: () => Record<string, unknown>[],
  addFunction: (input: Record<string, unknown>) => Record<string, unknown>,
  editFunction: (input: Record<string, unknown>) => Record<string, unknown>,
  deleteFunction: (input: Record<string, unknown>) => Record<string, unknown>,
  insertRef: any,
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ fieldTitle, getFunction, addFunction, editFunction, deleteFunction, insertSet }) => {
  const logoURL = "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png";

  const [itemList, setItemList] = useState<Record<string, unknown>[]>([]);
  const getItems = useQuery({
    queryKey: fieldTitle,
    queryFn: getFunction,
    onSuccess: (res) => setItemList(res),
    onError: (err) => console.log(`Not able to load profileCard's data: ${err}`),
  });

  const showForm = (isAdd: boolean): void => {
    insertSet(
      <ProfileCardForm
        title={fieldTitle}
        isAdd={isAdd}
        insertSet={insertSet} 
      />
    );
  };

  return (
    <AntdCard
      className="main-panel-card"
      loading={getItems.isLoading}
      title={
        <div className="main-panel-header">
          <h2>{fieldTitle}</h2>
          <Button className="icon-btn" type="text" onClick={() =>showForm(true)} icon={<PlusOutlined />} />
        </div>
      }
      children={
        <div className="main-panel-layout">
          { itemList.length === 0 ? <div>Xin hãy thêm thông tin vào đây</div> :
            itemList.map((item) => (
              <div className="main-panel-info">
                <div className="main-panel-info-logo">
                  <img src={logoURL} alt={"Logo of " + item.name} />
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