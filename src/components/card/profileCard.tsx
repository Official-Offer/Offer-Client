import  React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useQuery, useMutation } from "react-query";
import { Card as AntdCard, Button } from "antd";
import { ProfileCardForm } from "@components/forms";
import { ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";

type ProfileCardProps = {
  fieldTitle: string,
  fieldItemProps: {
    labelToAPI: Record<string, string>,
    APItoLabel: Record<string, string>,
    isRequired: Record<string, boolean>,
  },
  getFunction: () => Record<string, unknown>[],
  addFunction: (input: Record<string, unknown>) => Record<string, unknown>,
  editFunction: (input: Record<string, unknown>) => Record<string, unknown>,
  deleteFunction: (input: Record<string, unknown>) => Record<string, unknown>,
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ fieldTitle, fieldItemProps, getFunction, addFunction, editFunction, deleteFunction }) => {
  const logoURL = "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png";

  // fieldItemProps define how API fields are formatted as labels (For ex: "start_date" field in API would be shown as "Ngày bắt đầu" as label)
  // queryItemList will keep the raw JSON array from the API
  const [queryItemList, setQueryItemList] = useState<Record<string, unknown>[]>();
  const getItems = useQuery({
    queryKey: fieldTitle,
    queryFn: getFunction,
    onSuccess: (res) => setQueryItemList(res),
    onError: (err) => console.log(`Not able to load profileCard's data: ${err}`),
  });

  const dialogRef = useRef<HTMLDialogElement>();

  return (
    <AntdCard
      className="main-panel-card"
      loading={getItems.isLoading}
      title={
        <div className="main-panel-header">
          <h2>{fieldTitle}</h2>
          <Button className="icon-btn" type="text" onClick={() => dialogRef.current?.showModal()} icon={<PlusOutlined />} />
          {/* Popup form */}
          <dialog ref={dialogRef} onClick={() => dialogRef.current?.close()}>
            <ProfileCardForm
              fieldTitle={fieldTitle}
              isAdd={true}
              dialogRef={dialogRef}
              fieldItemProps={fieldItemProps}
              queryItemList={queryItemList}
              postFunction={addFunction}
            />
          </dialog>
        </div>
      }
      children={
        <div className="main-panel-layout">
          { getItems.isLoading ? <div>Đang tải...</div> : 
            getItems.isError ? <div>Server hiện tại không đưa thông tin được.</div> :
            (queryItemList.length === 0 
              ? <div>Xin hãy thêm thông tin vào đây.</div> 
              : queryItemList.map((item) => (
                <div className="main-panel-info">
                  <div className="main-panel-info-logo">
                    <img src={logoURL}/>
                  </div>
                  <div className="main-panel-info-center">
                    <h3>{item[fieldItemProps.labelToAPI.itemTitle]}</h3>
                    {
                      item.start_date.length !== 0 && (
                        <div>
                          <span>{item.start_date + " - " + (item.is_current ? "Hiện tại" : item.end_date)}</span>
                        </div>
                      )
                    }
                    {
                      (Object.keys(fieldItemProps.labelToAPI)).map((label) => label !== "itemTitle" && (
                        <div>
                          <b>{label}</b>
                          <span>{": " + item[fieldItemProps.labelToAPI[label]]}</span>
                        </div>
                      ))
                    }
                  </div>
                  <div>
                    <Button className="icon-btn" type="text" icon={<EditOutlined />} />
                  </div>
                </div>
              ))
            )
          }
        </div>
      }
    />
  );
}