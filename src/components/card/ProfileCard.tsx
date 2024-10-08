/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
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
import { formatProfileData } from "@utils/formatters/dataFormat";
import { formatDate } from "@utils/formatters/numberFormat";

// I bet you're thinking about how shit this code is, and I agree
type ProfileCardProps = {
  isEditable?: boolean;
  fieldTitle: string;
  fieldItemProps: {
    itemTitle: string;
    queryLabel: string;
    dataIdMap: string[]; // Which field needs list of data as options
    disableEndDate: boolean;
    layout: string[];
    labelToAPI: Record<string, string>;
    APIToLabel: Record<string, string>;
    itemType: Record<string, string>;
    isRequired: Record<string, boolean>;
  };
  isLoading?: boolean;
  isError?: boolean;
  data?: any[];
  refetchFunction: () => void;
  addFunction: (input: Record<string, unknown>) => void;
  editFunction: (id: number, input: Record<string, unknown>) => void;
  deleteFunction?: (id: number) => void;
  dataFunction: () => any;
};

/*
  Layout:
  - dates
  - sections in the order of field `layout`
  - description
*/

export const ProfileCard: React.FC<ProfileCardProps> = ({
  isEditable,
  fieldTitle,
  fieldItemProps,
  isLoading,
  isError,
  data,
  refetchFunction,
  addFunction,
  editFunction,
  deleteFunction,
  dataFunction,
}) => {
  const logoURL =
    "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png";

  // States
  const [queryItemList, setQueryItemList] = useState<Record<string, any>[]>([]);
  const [dataArr, setDataArr] = useState<Record<string, unknown>[][]>([]);
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const [openEditFormArr, setOpenEditFormArr] = useState<boolean[]>(
    queryItemList.map(() => false),
  );
  // console.log("Data from educations: ", data);
  // Hooks
  // fieldItemProps define how API fields are formatted as labels (For ex: "start_date" field in API would be shown as "Ngày bắt đầu" as label)
  // queryItemList will keep the raw JSON array from the API

  useEffect(() => {
    if (data) {
      if (fieldItemProps.queryLabel === "school") {
        for (let i = 0; i < data.length; i++) {
          data[i].majors = data[i].majors?.map((item: any) => item.name);
          data[i].schoolName = data[i].school.name || "Trường không xác định";
        }
      }
      setQueryItemList(data);
    }
  }, [data, isLoading]);

  // Fetch lists of datas (ex: if this is education, it will fetch schools for the form)
  const dataQuery = useQuery({
    queryKey: [fieldItemProps.queryLabel],
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

  const getLogo = (item: Record<string, any>) => {
    return item[fieldItemProps.queryLabel]?.logo ?? logoURL;
  };

  return (
    <AntdCard
      className="main-panel-card"
      loading={isLoading}
      title={
        <div className="main-panel-header">
          <h3>{fieldTitle}</h3>
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
            fieldValues={queryItemList?.[0]}
            updateFunction={addFunction}
            refetchFunction={refetchFunction}
            dataArr={dataArr}
          />
        </div>
      }
    >
      <div className="main-panel-layout">
        {isLoading ? (
          <div>Đang tải...</div>
        ) : queryItemList === undefined || isError ? (
          <div>Server hiện tại không đưa thông tin được.</div>
        ) : queryItemList.length === 0 ? (
          <div>Vui lòng thêm thông tin vào đây.</div>
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
                    fieldValues={queryItemList[index]}
                    updateFunction={editFunction}
                    deleteFunction={deleteFunction} // If there's only one school do not show delete function
                    refetchFunction={refetchFunction}
                    dataArr={dataArr}
                  />
                  <div className="main-panel-info">
                    <div className="main-panel-info-logo">
                      <img src={getLogo(item)} />
                    </div>
                    <div className="main-panel-info-center">
                      <h3>
                        {formatProfileData(
                          item[fieldItemProps.labelToAPI.itemTitle],
                        )}
                      </h3>
                      {item.start_date && (
                        <div className="main-panel-info-center-date">
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
                          <span>{": " + formatProfileData(item[apiName])}</span>
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
