import React, { useState } from "react";
import { Card as AntdCard, Button, Form, Input, Modal, Upload } from "antd";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  BuildingOfficeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Skeleton from "react-loading-skeleton";
import { formatDate } from "@utils/formatters/numberFormat";
import { schoolList, majorList } from "@public/static/list";

interface BioCardProps {
  isLoading?: boolean;
  data?: Record<string, any>;
};

export const BioCard: React.FC<BioCardProps> = ({ isLoading, data }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<string>("");
  const [coverPhoto, setCoverPhoto] = useState<string>("");

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        form.resetFields();
        setIsEditing(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  }

  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };

  return (
    <AntdCard
      cover={
        data?.account?.cover_photo ? (
          <img src={data.account.cover_photo} />
        ) : (
          <div className="gradient"></div>
        )
      }
      children={
        <div>
          {data?.account?.avatar ? (
            <img
              className="student-bio-avatar"
              src={data.account.avatar}
            />
          ) : (
            <div className="student-bio-avatar">
              {isLoading ? <LoadingOutlined /> : <UserIcon />}
            </div>
          )}
          <div className="student-bio-header">
            {isLoading ? (
              <Skeleton height="1.25rem" width="50%" />
            ) : (
              <h1>
                {data?.account?.first_name &&
                data?.account?.last_name
                  ? data?.account.first_name +
                    " " +
                    data?.account.last_name
                  : "Họ Tên"}
              </h1>
            )}
          </div>
          <div className="student-bio-info">
            <div className="student-bio-info-item">
              <BuildingOfficeIcon />
              <span>
                {isLoading ? (
                  <Skeleton height="1rem" />
                ) : (
                  data?.school?.name ?? "Trường không xác định"
                )}
              </span>
            </div>
            <div className="student-bio-info-item">
              <AcademicCapIcon />
              <span>
                {isLoading ? (
                  <Skeleton height="1rem" />
                ) : data?.expected_graduation_date ? (
                  formatDate(
                    data.expected_graduation_date,
                    "D/M/YYYY",
                  )
                ) : (
                  "Không xác định"
                )}
              </span>
            </div>
            <div className="student-bio-info-item">
              <BookOpenIcon />
              <span>
                {isLoading ? (
                  <Skeleton height="1rem" />
                ) : data?.majors?.length > 0 ? (
                  data?.majors
                    ?.map((major: { name: string }) => major.name)
                    .join(", ")
                ) : (
                  "Ngành chưa xác định"
                )}
              </span>
            </div>
            <div className="student-bio-info-item">
              <HeartIcon />
              <span>
                {isLoading ? (
                  <Skeleton height="1rem" />
                ) : data?.desired_industries?.length > 0 ? (
                  data?.desired_industries
                    ?.map((industry: { name: string }) => industry.name)
                    .join(", ")
                ) : (
                  "Không xác định"
                )}
              </span>
            </div>
          </div>
          <Button type="text" icon={<EditOutlined/>} shape="circle" className="student-bio-edit-btn" onClick={() => setIsEditing(true)}/>
          <Modal
            className="student-bio-edit-form"
            centered
            footer={[
              <Button onClick={handleCancel}>Bỏ qua</Button>,
              <Button type="primary" onClick={handleOk}>
                Lưu
              </Button>,
            ]}
            visible={isEditing}
            onCancel={() => setIsEditing(false)}
          >
            <Form
              form={form}
            >
              <Form.Item name="avatar">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // beforeUpload={beforeUpload}
                  // onChange={this.handleChange}
                >
                  {data?.account?.avatar ? (
                    <img
                      src={data.account.avatar}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      {isLoading ? <LoadingOutlined /> : <UserIcon />}
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item name="cover_photo">
                <Upload
                  name="cover_photo"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // beforeUpload={beforeUpload}
                  // onChange={this.handleChange}
                >
                  {data?.account?.cover_photo ? (
                    <img
                      src={data.account.cover_photo}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      {isLoading ? <LoadingOutlined /> : <UserIcon />}
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item name={["account", "last_name"]}>
                <Input
                  placeholder="Họ"
                />
              </Form.Item>
              <Form.Item name={["account", "first_name"]}>
                <Input
                  placeholder="Tên"
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      }
    />
  );
}