import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Card as AntdCard, Button, Modal } from "antd";
import { PlusOutlined, CloudDownloadOutlined, CloudUploadOutlined, LoadingOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { StyledResumeCard } from "@styles/styled-components/styledBox";
import { FileAddButton, FileDownloadButton, FileUploadButton } from "@styles/styled-components/styledButton";
import { getStudentResume, updateStudentResume, deleteStudentResume } from "@services/apiStudent";

export const ResumeCard: React.FC = () => {
  // States
  const [selectedFile, setSelectedFile] = useState<File>(null); // Holding the formData of the selected file before uploading
  const [uploadedFile, setUploadedFile] = useState<string>(null); // Holding the URL of uploaded resume for downloading
  const [resetTimer, setResetTimer] = useState<number>(0); // For resetting the timer after each upload

  // Hooks
  const downloadQuery = useQuery({
    queryKey: "resumeDownload",
    queryFn: getStudentResume,
    onSuccess: (res) => {
      if (!res?.endsWith("media/")) {
        setUploadedFile(res);
      }
    },
    onError: (err) => console.log(`Download Error: ${err}`),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (selectedFile) {
        const resumeData = new FormData();
        resumeData.append("resume", selectedFile);
        return await updateStudentResume(resumeData);
      }
    },
    onSuccess: () => {
      downloadQuery.refetch();
      if (resetTimer) clearTimeout(resetTimer);
      setResetTimer(setTimeout(() => {
        setSelectedFile(null);
      }, 2000));
    },
    onError: (err) => console.log(`Upload Error: ${err}`),
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteStudentResume,
    onSuccess: () => {
      downloadQuery.refetch();
    },
    onError: (err) => console.log(`Delete Error: ${err}`),
  });

  // Functions  
  const selectResume = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleUpload = (event) => {
    event.preventDefault();
    uploadMutation.mutate();
  };

  const handleDelete = () => {
    event.preventDefault();
    Modal.confirm({
      centered: true,
      content: `Bạn chắc chắn bạn muốn xóa file này không?`,
      okText: `Xóa`,
      cancelText: `Không, cảm ơn`,
      onOk() {
        deleteMutation.mutate();
      },
    });
  };

  return (
    <AntdCard
      className="main-panel-card"
      loading={downloadQuery.isLoading || downloadQuery.isRefetching}
      title={
        <div className="main-panel-header">
          <h2>CV</h2>
          <div className="btn-list-horizontal">
            <div className="file-btn">
              <input type="file" id="file-input" onChange={selectResume} />
              <label htmlFor="file-input">
                <FileAddButton disabled={uploadMutation.isLoading}>
                  <span>{selectedFile?.name ?? "Chọn CV"}</span>
                  <span><PlusOutlined /></span>
                </FileAddButton>
              </label>
            </div>
            <FileUploadButton disabled={uploadMutation.isLoading} onClick={(selectedFile && !uploadMutation.isLoading) && handleUpload}>
              {
                uploadMutation.isLoading ? (
                  <div className="btn-body">
                    <span>Đang tải lên...</span>
                    <span><LoadingOutlined /></span>
                  </div>
                ) : (
                  (selectedFile && uploadMutation.isSuccess) ? (
                    <div className="btn-body">
                      <span>Tải lên thành công</span>
                      <span><CheckOutlined /></span>
                    </div>
                  ) : (
                    <div className="btn-body">
                      <span>Tải lên</span>
                      <span><CloudUploadOutlined /></span>
                    </div>
                  )
                )
              }
            </FileUploadButton>
          </div>
        </div>
      }
      children={
        downloadQuery.isLoading ? (
          <div>Đang tải...</div>
        ) : (
          !uploadedFile || uploadedFile.length < 0 ? (
            <div>Vui lòng tải lên CV</div>
          ) : (
            <StyledResumeCard>
              <h3>CV hiện tại</h3>
              <div className="btn-list-horizontal">
                <a className="btn-list-horizontal-expand" href={uploadedFile} target="_blank">
                  <FileDownloadButton>
                    <span>Tải xuống</span>
                    <span><CloudDownloadOutlined /></span>
                  </FileDownloadButton>
                </a>
                <Button type="danger" shape="circle" loading={deleteMutation.isLoading} icon={<DeleteOutlined />} onClick={handleDelete} />
              </div>
            </StyledResumeCard>
          )
        )
      }
    />
  );
};