import React, { useState } from "react";
import { Alert, Modal, Upload } from "antd";
import { useMutation } from "@tanstack/react-query";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import {
  CheckOutlined,
  FileDoneOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { IconButton } from "@styles/styled-components/styledButton";
import { AxiosError } from "src/types/errorTypes";

type ApplyFormProps = {
  jobId?: number;
  open: boolean;
  submitFunction: (data: any) => Promise<any>;
  onCancel: () => void;
};

export const ApplyForm: React.FC<ApplyFormProps> = ({
  jobId,
  open,
  submitFunction,
  onCancel,
}) => {
  const [resume, setResume] = useState<any>(null);

  const handleCancel = () => {
    setResume(null);
    onCancel();
  };

  const handleUpload = (file: any) => {
    setResume(file);
    return false;
  };

  const resumeMutation = useMutation<any, AxiosError, FormData>({
    mutationKey: ["resume"],
    mutationFn: submitFunction,
    onSuccess: () => {
      setTimeout(() => {
        handleCancel();
      }, 800);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleApply = () => {
    if (resume) {
      const applyData = new FormData();
      applyData.append("is_submitted", "true");
      applyData.append("job", `${jobId}`);
      applyData.append("resume", resume);
      resumeMutation.mutate(applyData);
    }
  };

  return (
    <Modal
      title="Ứng tuyển"
      open={open}
      onCancel={handleCancel}
      footer={[
        <IconButton backgroundColor="#D30B81" onClick={handleApply}>
          <div className="btn-body">
            <span>
              {resumeMutation.isLoading
                ? "Đang tải lên"
                : resumeMutation.isSuccess
                  ? "Nộp đơn thành công"
                  : "Nộp đơn"}
            </span>
            <span>
              {resumeMutation.isLoading ? (
                <LoadingOutlined />
              ) : resumeMutation.isSuccess ? (
                <CheckOutlined />
              ) : (
                <FileDoneOutlined />
              )}
            </span>
          </div>
        </IconButton>,
      ]}
    >
      <Upload.Dragger
        maxCount={1}
        listType="text"
        beforeUpload={handleUpload}
        // onPreview={handlePreview}
        // onDownload={handleDownload}
        progress={{
          strokeColor: "#D30B81",
          format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        }}
        showUploadList={{
          showRemoveIcon: true,
          showPreviewIcon: false,
          showDownloadIcon: false,
        }}
      >
        <UploadOutlined />
        <h4>Vui lòng tải lên CV của bạn</h4>
        <div>Bấm để chọn file hoặc kéo và thả file</div>
      </Upload.Dragger>
      {resumeMutation.isError ? (
        <Alert
          message={
            resumeMutation.error?.response?.data?.message.includes(
              "You have already applied for this job",
            )
              ? "Bạn đã nộp đơn ứng tuyển cho công việc này rồi"
              : "Đã có lỗi tải lên hệ thống. Vui lòng thử lại"
          }
          type="error"
          closable
          showIcon
        />
      ) : (
        ""
      )}
    </Modal>
  );
};
