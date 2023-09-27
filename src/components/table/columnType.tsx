import { Dropdown, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import {
  ApplicantDataType,
  JobDataType,
  ApprovedJobDataType,
  UnapprovedJobDataType,
  StudentDataType,
  EventAdvisorDataType,
  EventRecruiterDataType,
  AdvisorCompanyDataType,
  AdvisorSchoolDataType,
  RecruiterCompanyDataType,
  RecruiterSchoolDataType,
} from "./dataType";
import { MoreOutlined } from "@ant-design/icons";

const UnapprovedJobsActionItems = [
  { key: "1", label: "Duyệt công việc" },
  { key: "2", label: "Xem thêm" },
];

const ApprovedJobsActionItems = [
  { key: "1", label: "Duyệt công việc" },
  { key: "2", label: "Xem thêm" },
];

const ApplicantActionItems = [
  { key: "1", label: "Xem chi tiết" },
  { key: "2", label: "Ẩn ứng viên" },
  { key: "3", label: "Nhắn tin" },
];

const StudentActionItems = [
  { key: "1", label: "Xem chi tiết" },
  { key: "2", label: "Ẩn học sinh" },
  { key: "2", label: "Nhắn tin" },
];

const AdvisorSchoolActionItems = [
  { key: "1", label: "Xem chi tiết" },
  { key: "2", label: "Ẩn" },
  { key: "2", label: "Nhắn tin" },
];

const AdvisorCompanyActionItems = [
  { key: "1", label: "Xem chi tiết" },
  { key: "2", label: "Ẩn" },
  { key: "2", label: "Nhắn tin" },
];

const RecruiterSchoolActionItems = [
  { key: "1", label: "Xem chi tiết" },
  { key: "2", label: "Ẩn" },
  { key: "2", label: "Nhắn tin" },
];

const RecruiterCompanyActionItems = [
  { key: "1", label: "Xem chi tiết" },
  { key: "2", label: "Ẩn" },
  { key: "2", label: "Nhắn tin" },
];

const SchoolActionItems = [
  { key: "1", label: "Nhắn tin" },
  { key: "2", label: "Xem chi tiết" },
];
const CompanyActionItems = [
  { key: "1", label: "Nhắn tin" },
  { key: "2", label: "Xem chi tiết" },
];
const EventRecruiterActionItems = [
  { key: "1", label: "Nhắn tin" },
  { key: "2", label: "Xem chi tiết" },
];
const EventAdvisorActionItems = [
  { key: "1", label: "Nhắn tin" },
  { key: "2", label: "Xem chi tiết" },
];

export const JobColumns: ColumnsType<JobDataType> = [
  // {
  //   title: "ID",
  //   dataIndex: "ID",
  //   key: "ID",
  // },
  {
    title: "Ngày tạo",
    dataIndex: "posted_date",
    key: "posted_date",
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Trường chưa duyệt",
    dataIndex: "unapproved_schools",
    key: "unapproved_schools",
  },
  {
    title: "Trường đã duyệt",
    dataIndex: "approved_schools",
    key: "approved_schools",
  },
  {
    title: "Người ứng tuyển",
    dataIndex: "applicants",
    key: "applicants",
  },
  // {
  //   title: "Số người cần tuyển",
  //   dataIndex: "expected",
  //   key: "expected",
  // },
  // {
  //   title: "Tình trạng",
  //   key: "tags",
  //   dataIndex: "tags",
  //   render: (_, { tag }) => {
  //     let color =
  //       tag === "Chưa tạo danh sách"
  //         ? "red"
  //         : tag === "Chưa tuyển"
  //         ? "volcano"
  //         : "green";
  //     return (
  //       <Tag color={color} key={tag}>
  //         {tag.toUpperCase()}
  //       </Tag>
  //     );
  //   },
  // },
  // {
  //   title: "Hành động",
  //   key: "action",
  //   render: (_, record) => (
  //     // {record.name}
  //     <Space size="middle">
  //       <Dropdown menu={{ items: JobsActionItems }}>
  //         <a>
  //           <MoreOutlined />
  //         </a>
  //       </Dropdown>
  //     </Space>
  //   ),
  // },
];

export const UnapprovedJobColumns: ColumnsType<UnapprovedJobDataType> = [
  // {
  //   title: "ID",
  //   dataIndex: "ID",
  //   key: "ID",
  // },
  {
    title: "Ngày tạo",
    dataIndex: "posted_date",
    key: "posted_date",
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Công ty",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Người tuyển dụng",
    dataIndex: "recruiter",
    key: "recruiter",
  },
  {
    title: "Số người cần tuyển",
    dataIndex: "expected",
    key: "expected",
  },
  {
    title: "Độ phù hợp",
    dataIndex: "compatibility",
    key: "compatibility",
  },
  {
    title: "Hành động",
    key: "action",
    render: (_, record) => (
      // {record.name}
      <Space size="middle">
        <Dropdown menu={{ items: UnapprovedJobsActionItems }}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const ApprovedJobColumns: ColumnsType<ApprovedJobDataType> =
  [
    // {
    //   title: "ID",
    //   dataIndex: "ID",
    //   key: "ID",
    // },
    {
      title: "Ngày tạo",
      dataIndex: "posted_date",
      key: "posted_date",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Công ty",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Người tuyển dụng",
      dataIndex: "recruiter",
      key: "recruiter",
    },
    {
      title: "Số người cần tuyển",
      dataIndex: "expected",
      key: "expected",
    },
    {
      title: "Ứng viên trường bạn/tất cả",
      dataIndex: "applicants",
      key: "applicants",
    },
    {
      title: "Được nhận trường bạn/tất cả",
      dataIndex: "accepted",
      key: "accepted",
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        // {record.name}
        <Space size="middle">
          <Dropdown menu={{ items: ApprovedJobsActionItems }}>
            <a>
              <MoreOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

export const ApplicantColumns: ColumnsType<ApplicantDataType> = [
  // {
  //   title: "ID",
  //   dataIndex: "ID",
  //   key: "ID",
  // },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Trường",
    dataIndex: "school",
    key: "school",
  },
  {
    title: "Công việc nộp",
    dataIndex: "job",
    key: "job",
  },
  {
    title: "CV",
    dataIndex: "resume",
    key: "resume",
  },
  {
    title: "Độ phù hợp",
    dataIndex: "compatibility",
    key: "compatibility",
  },
  // {
  //   title: "Giai đoạn",
  //   key: "tags",
  //   dataIndex: "tags",
  //   render: (_, { tag }) => {
  //     let color =
  //       tag === "Chưa nộp"
  //         ? "volcano"
  //         : tag === "Đã nộp"
  //         ? "blue"
  //         : "green";
  //     return (
  //       <Tag color={color} key={tag}>
  //         {tag.toUpperCase()}
  //       </Tag>
  //     );
  //   },
  // },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Dropdown menu={{ items: ApplicantActionItems }}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const StudentColumns: ColumnsType<StudentDataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
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
    title: "Việc đã ứng tuyển",
    dataIndex: "jobs_applied",
    key: "jobs_applied",
  },
  {
    title: "Việc đã được nhận",
    dataIndex: "jobs_accepted",
    key: "jobs_accepted",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Dropdown menu={{ items: StudentActionItems }}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const AdvisorCompanyColumns: ColumnsType<AdvisorCompanyDataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Trường",
    dataIndex: "school",
    key: "school",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Liên hệ?",
    key: "contacted",
    dataIndex: "contacted",
    render: (_, { contacted }) => {
      let color =
      contacted === "Chưa liên hệ"
          ? "volcano"
          : "green";
      return (
        <Tag color={color} key={contacted}>
          {contacted?.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Dropdown menu={{ items: AdvisorCompanyActionItems }}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const AdvisorSchoolColumns: ColumnsType<AdvisorSchoolDataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Trường",
    dataIndex: "school",
    key: "school",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Xác thực email?",
    dataIndex: "email_verified",
    key: "email_verified",
  },
  {
    title: "Xác thực vai trò?",
    dataIndex: "role_verified",
    key: "role_verified",
  },
  {
    title: "Học sinh phụ trách",
    dataIndex: "managed_students",
    key: "managed_students",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Dropdown menu={{ items: AdvisorSchoolActionItems }}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const RecruiterSchoolColumns: ColumnsType<RecruiterSchoolDataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Công ty",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Số công việc đã đăng",
    dataIndex: "jobs_posted",
    key: "jobs_posted",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Liên hệ?",
    key: "contacted",
    dataIndex: "contacted",
    render: (_, { contacted }) => {
      let color =
      contacted === "Chưa liên hệ"
          ? "volcano"
          : "green";
      return (
        <Tag color={color} key={contacted}>
          {contacted?.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Dropdown menu={{ items: RecruiterSchoolActionItems }}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const RecruiterCompanyColumns: ColumnsType<RecruiterCompanyDataType> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Xác thực email?",
    dataIndex: "email_verified",
    key: "email_verified",
  },
  {
    title: "Xác thực vai trò?",
    dataIndex: "role_verified",
    key: "role_verified",
  },
  {
    title: "Số công việc đã đăng",
    dataIndex: "jobs_posted",
    key: "jobs_posted",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Dropdown menu={{ items: RecruiterCompanyActionItems }}>
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
    dataIndex: "no_students",
    key: "no_students",
  },
  {
    title: "Số ứng viên từ trường này",
    dataIndex: "students_applicants",
    key: "students_applicants",
  },
  {
    title: "Công việc chưa duyệt",
    dataIndex: "unapproved_jobs",
    key: "unapproved_jobs",
  },
  {
    title: "Công việc đã duyệt",
    dataIndex: "approved_jobs",
    key: "approved_jobs",
  },
  {
    title: "Độ phù hợp",
    dataIndex: "compatibility",
    key: "compatibility",
  },
  {
    title: "Xem thêm",
    key: "action",
    render: (_, record) => (
      // {record.name}
      <Space size="middle">
        <Dropdown menu={{ items: SchoolActionItems }}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const companyColumns: ColumnsType<UnapprovedJobDataType> = [
  // {
  //   title: "ID",
  //   dataIndex: "ID",
  //   key: "ID",
  // },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Người tuyển dụng",
    dataIndex: "recruiters",
    key: "recruiters",
  },
  {
    title: "Công việc chưa duyệt",
    dataIndex: "unapproved_jobs",
    key: "unapproved_jobs",
  },
  {
    title: "Công việc đã duyệt",
    dataIndex: "approved_jobs",
    key: "approved_jobs",
  },
  {
    title: "Học sinh tại công ty",
    dataIndex: "student_employees",
    key: "student_employees",
  },
  {
    title: "Độ phù hợp",
    dataIndex: "compatibility",
    key: "compatibility",
  },
  {
    title: "Xem thêm",
    key: "action",
    render: (_, record) => (
      // {record.name}
      <Space size="middle">
        <Dropdown menu={{ items: CompanyActionItems }}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const EventRecruiterColumns: ColumnsType<EventRecruiterDataType> = [
  // {
  //   title: "ID",
  //   dataIndex: "ID",
  //   key: "ID",
  // },
  {
    title: "Ngày đăng",
    dataIndex: "posted_date",
    key: "posted_date",
  },
  {
    title: "Tên sự kiện",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Công ty",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Số người tham gia",
    dataIndex: "no_attendants",
    key: "no_attendants",
  },
  {
    title: "Độ hợp",
    dataIndex: "compatibility",
    key: "compatibility",
  },
  {
    title: "Tình trạng",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tag }) => {
      let color =
        tag === "Đang duyệt"
          ? "volcano"
          : tag === "Không được duyệt"
          ? "blue"
          : "green";
      return (
        <Tag color={color} key={tag}>
          {tag?.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Xem thêm",
    key: "action",
    render: (_, record) => (
      // {record.name}
      <Space size="middle">
        <Dropdown menu={{ items: EventRecruiterActionItems }}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

export const EventAdvisorColumns: ColumnsType<EventAdvisorDataType> = [
  // {
  //   title: "ID",
  //   dataIndex: "ID",
  //   key: "ID",
  // },
  {
    title: "Ngày đăng",
    dataIndex: "posted_date",
    key: "posted_date",
  },
  {
    title: "Tên sự kiện",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Công ty",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Số người tham gia",
    dataIndex: "no_attendants",
    key: "no_attendants",
  },
  {
    title: "Độ hợp",
    dataIndex: "compatibility",
    key: "compatibility",
  },
  {
    title: "Tình trạng",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tag }) => {
      let color =
        tag === "Đang duyệt"
          ? "volcano"
          : tag === "Không được duyệt"
          ? "blue"
          : "green";
      return (
        <Tag color={color} key={tag}>
          {tag?.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Xem thêm",
    key: "action",
    render: (_, record) => (
      // {record.name}
      <Space size="middle">
        <Dropdown menu={{ items: EventAdvisorActionItems }}>
          <a>
            <MoreOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];
