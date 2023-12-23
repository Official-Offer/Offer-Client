import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card as AntdCard, Button, Modal } from "antd";
import {
  PlusOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  LoadingOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { StyledResumeCard } from "@styles/styled-components/styledBox";
import {
  FileDownloadButton,
  IconButton,
} from "@styles/styled-components/styledButton";
import {
  getStudentResume,
  updateStudentResume,
  deleteStudentResume,
} from "@services/apiStudent";
import { CardTray } from "@components/list";
import type { Resume } from "src/types/dataTypes";

type ResumeCardProps = {
  isEditable?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  refetchFunction: () => void;
  isRefetching?: boolean;
  resumes?: Record<string, Resume[]>
};

export const ResumeCard: React.FC<ResumeCardProps> = ({ isEditable, resumes, isError, isLoading, isRefetching, refetchFunction }) => {
  // States
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Holding the formData of the selected file before uploading
  const [uploadedFiles, setUploadedFiles] = useState<Resume[] | null>([]); // Holding the URL of uploaded resume for downloading
  const [resetTimer, setResetTimer] = useState<ReturnType<typeof setTimeout>>(); // For resetting the timer after each upload
  const [activeResumeIndex, setActiveResumeIndex] = useState<number>(0); // For switching between resumes
  // Hooks
  useEffect(() => {
    console.log("Resumes: ", resumes)
    if (resumes) {
      setUploadedFiles(resumes.resumes);
      setActiveResumeIndex(resumes.active_resume.pk)
    }
  }, [resumes, isError, isLoading, isRefetching])
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (selectedFile) {
        const resumeData = new FormData();
        resumeData.append("resume", selectedFile);
        resumeData.append("uploading_resume", "true");
        return await updateStudentResume(resumeData);
      }
    },
    onSuccess: () => {
      refetchFunction();
      if (resetTimer) clearTimeout(resetTimer);
      setResetTimer(
        setTimeout(() => {
          setSelectedFile(null);
        }, 2000),
      );
    },
    onError: (err) => console.log(`Upload Error: ${err}`),
  });

  const deleteMutation = useMutation({
    mutationFn: (pk: number)=>deleteStudentResume(pk),
    onSuccess: () => {
      refetchFunction();
    },
    onError: (err) => console.log(`Delete Error: ${err}`),
  });

  // Functions
  const selectResume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] ?? null);
  };

  const handleUpload = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    uploadMutation.mutate();
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    pk: number,
  ) => {
    
    event.preventDefault();
    Modal.confirm({
      centered: true,
      content: `Bạn chắc chắn bạn muốn xóa file này không?`,
      okText: `Xóa`,
      cancelText: `Không, cảm ơn`,
      onOk() {
        deleteMutation.mutate(pk);
      },
    });
  };
  //TODO: Render multiple resumes and allow user to upload.
  return (
    <AntdCard
      className="main-panel-card"
      loading={isLoading || isRefetching}
      title={
        <div className="main-panel-header">
          <h2>CV</h2>
          {isEditable && (
            <div className="btn-list-horizontal">
              <div className="file-btn">
                <input type="file" id="file-input" onChange={selectResume} />
                <label htmlFor="file-input">
                  <IconButton
                    round
                    backgroundColor="#D30B81"
                    disabled={uploadMutation.isLoading}
                  >
                    <div className="btn-body">
                      <span>{selectedFile?.name ?? "Chọn CV"}</span>
                      <span>
                        <PlusOutlined />
                      </span>
                    </div>
                  </IconButton>
                </label>
              </div>
              <IconButton
                round
                backgroundColor="#7277F1"
                disabled={uploadMutation.isLoading}
                onClick={(event: any) =>
                  selectedFile &&
                  !uploadMutation.isLoading &&
                  handleUpload(event)
                }
              >
                {uploadMutation.isLoading ? (
                  <div className="btn-body">
                    <span>Đang tải lên...</span>
                    <span>
                      <LoadingOutlined />
                    </span>
                  </div>
                ) : selectedFile && uploadMutation.isSuccess ? (
                  <div className="btn-body">
                    <span>Tải lên thành công</span>
                    <span>
                      <CheckOutlined />
                    </span>
                  </div>
                ) : (
                  <div className="btn-body">
                    <span>Tải lên</span>
                    <span>
                      <CloudUploadOutlined />
                    </span>
                  </div>
                )}
              </IconButton>
            </div>
          )}
        </div>
      }
      // eslint-disable-next-line react/no-children-prop
      children={
        isLoading ? (
          <div>Đang tải...</div>
        ) : !uploadedFiles || uploadedFiles.length < 0 ? (
          <div>Vui lòng tải lên CV</div>
        ) : (
          <CardTray
            cardList={uploadedFiles.map((uploadedFile) => (
              // eslint-disable-next-line react/jsx-key
              <StyledResumeCard>
                {uploadedFile.pk== activeResumeIndex && <h3>CV hiện tại</h3>}
                <div className="btn-list-horizontal">
                  <a
                    className="btn-list-horizontal-expand"
                    href={uploadedFile.resume}
                    target="_blank"
                  >
                    <IconButton round fullWidth backgroundColor="#8799AE">
                      <div className="btn-body">
                        <span>Tải xuống</span>
                        <CloudDownloadOutlined className="icon-md" />
                      </div>
                    </IconButton>
                  </a>
                  {isEditable && (
                    <Button
                      danger
                      shape="circle"
                      loading={deleteMutation.isLoading}
                      icon={<DeleteOutlined />}
                      onClick={(event)=> handleDelete(event, uploadedFile.pk)}
                    />
                  )}
                </div>
              </StyledResumeCard>
            ))}
          />
        )
      }
    />
  );
};
