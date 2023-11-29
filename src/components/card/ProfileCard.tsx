import React, { useState } from "react";
import moment from "moment";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card as AntdCard, Button, Divider } from "antd";
import { ProfileCardForm } from "@components/forms";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { formatDate } from "@utils/formatters/numberFormat";

type ProfileCardProps = {
  isEditable?: boolean;
  fieldTitle: string;
  fieldItemProps: {
    itemTitle: string;
    dataIDLabel: string;
    dataName: string;
    disableEndDate: boolean;
    layout: string[];
    labelToAPI: Record<string, string>;
    APIToLabel: Record<string, string>;
    itemType: Record<string, string>;
    isRequired: Record<string, boolean>;
  };
  getFunction: () => Promise<Record<string, unknown>[]>;
  addFunction: (input: Record<string, unknown>) => void;
  editFunction: (id: number, input: Record<string, unknown>) => void;
  deleteFunction?: (id: number) => void;
  dataFunction: () => Promise<Record<string, unknown>[]>;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  isEditable,
  fieldTitle,
  fieldItemProps,
  getFunction,
  addFunction,
  editFunction,
  deleteFunction,
  dataFunction,
}) => {
  const logoURL =
    "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png";

  // States
  const [queryItemList, setQueryItemList] = useState<Record<string, any>[]>([]);
  const [dataArr, setDataArr] = useState<Record<string, unknown>[]>([]);
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const [openEditFormArr, setOpenEditFormArr] = useState<boolean[]>(
    queryItemList.map(() => false),
  );

  // Hooks
  // fieldItemProps define how API fields are formatted as labels (For ex: "start_date" field in API would be shown as "Ngày bắt đầu" as label)
  // queryItemList will keep the raw JSON array from the API
  const itemsQuery = useQuery({
    queryKey: [fieldTitle],
    queryFn: getFunction,
    onSuccess: (res: Record<string, any>[]) =>
      setQueryItemList(
        res.map((item) => {
          item.start_date = moment(item.start_date);
          item.end_date = moment(item.end_date);
          return item;
        }),
      ),
    onError: (err) =>
      console.log(`Not able to load profileCard's data: ${err}`),
    refetchOnWindowFocus: false,
  });

  // Fetch lists of datas (ex: if this is education, it will fetch schools for the form)
  const dataQuery = useQuery({
    queryKey: [fieldItemProps.dataIDLabel],
    queryFn: dataFunction,
    onSuccess: (data) => typeof data === "object" && setDataArr(data),
    onError: (err) => console.log(`Data Error: ${err}`),
  });

  // Functions
  const setOpenEditForm = (index: number | boolean) => {
    // Open specific edit form for an item
    if (typeof index === "number") {
      const newArr = queryItemList?.map(() => false);
      newArr[index] = true;
      setOpenEditFormArr(newArr);
    } else {
      // Close all edit forms
      setOpenEditFormArr(queryItemList?.map(() => false));
    }
  };

  return (
    <AntdCard
      className="main-panel-card"
      loading={itemsQuery.isLoading || itemsQuery.isRefetching}
      title={
        <div className="main-panel-header">
          <h2>{fieldTitle}</h2>
          {isEditable && (
            <Button
              className="icon-btn"
              type="text"
              icon={<PlusOutlined />}
              onClick={() => setOpenAddForm(true)}
            />
          )}
          {/* Popup adding form */}
          <ProfileCardForm
            open={openAddForm}
            closeForm={() => setOpenAddForm(false)}
            isAdd={true}
            fieldTitle={fieldTitle}
            fieldItemProps={fieldItemProps}
            fieldItems={queryItemList?.[0]}
            postFunction={addFunction}
            refetchFunction={itemsQuery.refetch}
            dataArr={dataArr}
          />
        </div>
      }
    >
      <div className="main-panel-layout">
        {itemsQuery.isLoading ? (
          <div>Đang tải...</div>
        ) : queryItemList === undefined || itemsQuery.isError ? (
          <div>Server hiện tại không đưa thông tin được.</div>
        ) : queryItemList.length === 0 ? (
          <div>Xin hãy thêm thông tin vào đây.</div>
        ) : (
          queryItemList
            .sort((item1, item2) => {
              // Sorting items by their dates
              if (item1.is_current && !item2.is_current) return -1;
              if (!item1.is_current && item2.is_current) return 1;
              if (!item1.is_current && !item2.is_current)
                return (
                  (item2.end_date?.valueOf() ?? 0) -
                  (item1.end_date?.valueOf() ?? 0)
                );
              return (
                (item2.start_date?.valueOf() ?? 0) -
                (item1.start_date?.valueOf() ?? 0)
              );
            })
            .map((item, index) => {
              return (
                <div>
                  {index !== 0 && <Divider />}
                  {/* Popup adding form */}
                  <ProfileCardForm
                    open={openEditFormArr?.[index]}
                    closeForm={() => setOpenEditForm(false)}
                    isAdd={false}
                    fieldTitle={fieldTitle}
                    fieldItemProps={fieldItemProps}
                    fieldItems={queryItemList[index]}
                    postFunction={editFunction}
                    deleteFunction={deleteFunction}
                    refetchFunction={itemsQuery.refetch}
                    dataArr={dataArr}
                  />
                  <div className="main-panel-info">
                    <div className="main-panel-info-logo">
                      <img src={logoURL} />
                    </div>
                    <div className="main-panel-info-center">
                      <h3>{item[fieldItemProps.labelToAPI.itemTitle]}</h3>
                      {item.start_date.length !== 0 && (
                        <div>
                          <span>
                            {formatDate(item.start_date, "MM/YYYY") +
                              " - " +
                              (item.is_current
                                ? "Hiện tại"
                                : formatDate(item.end_date, "MM/YYYY"))}
                          </span>
                        </div>
                      )}
                      {fieldItemProps.layout.map((apiName) => (
                        <div>
                          <b>{fieldItemProps.APIToLabel[apiName]}</b>
                          <span>{": " + item[apiName]}</span>
                        </div>
                      ))}
                      <div className="main-panel-info-center-description">
                        {item.description}
                      </div>
                    </div>
                    {isEditable && (
                      <div>
                        <Button
                          className="icon-btn"
                          type="text"
                          icon={<EditOutlined />}
                          onClick={() => setOpenEditForm(index)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
        )}
      </div>
    </AntdCard>
  );
};
