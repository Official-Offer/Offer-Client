import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { UnapprovedJobDataType } from "./dataType";

export const unapprovedJobColumns: ColumnsType<UnapprovedJobDataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Ngày tạo",
    dataIndex: "date",
    key: "date",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Địa điểm",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Số trường",
    dataIndex: "schools",
    key: "schools",
  },
  {
    title: "Số đơn",
    dataIndex: "applicants",
    key: "applicants",
  },
  {
    title: "Tình trạng",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tag }) => {
      let color =
        tag === "Chưa tạo danh sách" ? "red" : tag === "Chưa tuyển" ? "volcano" : "green";
      return (
        <Tag color={color} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      // {record.name}
      <Space size="middle">
        <a>Copy ID</a>
        <a>Tạo danh sách ứng viên</a>
        <a>Chỉnh sửa công việc</a>
        <a>Xoá công việc</a>
      </Space>
    ),
  },
];