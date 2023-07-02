import { Dropdown, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { ApplicantDataType, UnapprovedJobDataType } from "./dataType";
import { MoreOutlined } from "@ant-design/icons";

const UnapprovedJobsActionItems = [
  { key: "1", label: "Copy ID" },
  { key: "2", label: "Tạo danh sách ứng viên" },
  { key: "3", label: "Chỉnh sửa công việc" },
  { key: "4", label: "Xoá công việc" },
];

const ApplicantActionItems = [
  { key: "1", label: "Xem CV" },
  { key: "2", label: "Xoá ứng viên" },
];

const SchoolActionItems = [
  { key: "1", label: "Xem chi tiết" },
  { key: "2", label: "Copy ID" },
];

export const approvedJobColumns: ColumnsType<UnapprovedJobDataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Ngày tạo",
    dataIndex: "date",
    key: "date",
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
        tag === "Chưa tạo danh sách"
          ? "red"
          : tag === "Chưa tuyển"
          ? "volcano"
          : "green";
      return (
        <Tag color={color} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Hành động",
    key: "action",
    render: (_, record) => (
      // {record.name}
      <Space size="middle">
        <Dropdown menu={{items: UnapprovedJobsActionItems}}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const unapprovedJobColumns: ColumnsType<UnapprovedJobDataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Ngày tạo",
    dataIndex: "date",
    key: "date",
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
        tag === "Chưa tạo danh sách"
          ? "blue"
          : tag === "Chưa tuyển"
          ? "volcano"
          : "green";
      return (
        <Tag color={color} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Hành động",
    key: "action",
    render: (_, record) => (
      // {record.name}
      <Space size="middle">
        <Dropdown menu={{items: UnapprovedJobsActionItems}}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const ApplicantColumns: ColumnsType<ApplicantDataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Trường",
    dataIndex: "school",
    key: "school",
  },
  {
    title: "Ngành học",
    dataIndex: "major",
    key: "major",
  },
  {
    title: "Năm tốt nghiệp",
    dataIndex: "expected_graduation",
    key: "expected_graduation",
  },
  {
    title: "Giai đoạn",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tag }) => {
      let color =
        tag === "Vòng đơn"
          ? "volcano"
          : tag === "Vòng phỏng vấn"
          ? "blue"
          : "green";
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
      <Space size="middle">
        <Dropdown menu={{items: ApplicantActionItems}}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const schoolColumns: ColumnsType<UnapprovedJobDataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Số học sinh",
    dataIndex: "noStudents",
    key: "noStudents",
  },
  {
    title: "Số công việc",
    dataIndex: "noJobs",
    key: "noJobs",
  },
  {
    title: "Tình trạng",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tag }) => {
      let color =
        tag === "Chưa tạo danh sách"
          ? "red"
          : tag === "Chưa tuyển"
          ? "volcano"
          : "green";
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
        <Dropdown menu={{items: SchoolActionItems}}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];