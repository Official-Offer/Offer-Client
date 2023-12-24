import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card as AntdCard, Button, Modal, Upload } from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import {
  PlusOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  LoadingOutlined,
  CheckOutlined,
  DeleteOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutlined } from "@heroicons/react/24/outline";
import { StyledResumeCard } from "@styles/styled-components/styledBox";
import {
  FileDownloadButton,
  IconButton,
} from "@styles/styled-components/styledButton";
import {
  getStudentResume,
  updateStudentResume,
  deleteStudentResume,
  updateStudentActiveResume
} from "@services/apiStudent";
import { Carousel } from "@components/list";
import { formatOverflowText, extractFileName } from "@utils/formatters/stringFormat";
import type { Resume } from "src/types/dataTypes";

type ResumeCardProps = {
  isEditable?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  refetchFunction: () => void;
  isRefetching?: boolean;
  resumes?: Record<string, Resume[]>;
};

export const ResumeCard: React.FC<ResumeCardProps> = ({
  isEditable,
  resumes,
  isError,
  isLoading,
  isRefetching,
  refetchFunction,
}) => {
  // States
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [uploadedFiles, setUploadedFiles] = useState<Resume[] | null>(); // Holding the URL of uploaded resume for downloading
  const [resetTimer, setResetTimer] = useState<ReturnType<typeof setTimeout>>(); // For resetting the timer after each upload
  const [deletingResumeIndex, setDeletingResumeIndex] = useState<number | null>(); // For deleting the file
  const [activeResumeIndex, setActiveResumeIndex] = useState<number>(0); // For switching between resumes

  // Hooks
  useEffect(() => {
    console.log("Resumes: ", resumes);
    if (resumes) {
      setUploadedFiles(resumes.resumes);
      setDeletingResumeIndex(null);

      // Temporary until Thuan fixes active_index to active_pk
      let activeIndex = 0;
      resumes.resumes.forEach((resume, index) => {
        if (resume.pk === resumes.active_resume?.pk) {
          activeIndex = index;
        }
      })
      setActiveResumeIndex(activeIndex);
    }
  }, [resumes]);

  const uploadMutation = useMutation({
    mutationKey: ["upload"],
    mutationFn: async (selectedFile: File) => {
      const resumeData = new FormData();
      resumeData.append("resume", selectedFile);
      resumeData.append("uploading_resume", "true");
      return await updateStudentResume(resumeData);
    },
    onSuccess: () => {
      refetchFunction();
      if (resetTimer) clearTimeout(resetTimer);
      setResetTimer(
        setTimeout(() => {
          setSelectedFile(null);
        }, 1000),
      );
    },
    onError: (err) => console.log(`Upload Error: ${err}`),
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (pk: number) => deleteStudentResume(pk),
    onSuccess: () => {
      refetchFunction();
    },
    onError: (err) => console.log(`Delete Error: ${err}`),
  });

  const updateActiveResumeMutation = useMutation({
    mutationKey: ["updateActiveResume"],
    mutationFn: (pk: number) => updateStudentActiveResume(pk),
    onSuccess: () => {
      refetchFunction();
    },
    onError: (err) => console.log(`Update Active Resume Error: ${err}`),
  })

  // Functions
  // const selectResume = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedFile(event.target.files?.[0] ?? null);
  // };

  const uploadsExist = () => {
    return uploadedFiles && uploadedFiles.length !== 0;
  }

  const selectResumeDrag = (file: File) => {
    setSelectedFile(file);
  }

  const handleUpload = (
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event) {
      event.preventDefault();
      if (event.target.files?.[0]) {
        uploadMutation.mutate(event.target.files[0]);
        setSelectedFile(event.target.files[0])
      }
    } else if (selectedFile) uploadMutation.mutate(selectedFile);
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
        setDeletingResumeIndex(pk);
        deleteMutation.mutate(pk);
      },
    });
  };

  const handleUpdateActiveResume = (pk: number) => {
    setActiveResumeIndex(pk)
    updateActiveResumeMutation.mutate(pk);
  }

  //TODO: Render multiple resumes and allow user to upload.
  return (
    <AntdCard
      className="main-panel-card"
      loading={isLoading}
      title={
        <div className="main-panel-header">
          <h3>CV</h3>
          {isEditable && (
            // <div className="btn-list-horizontal">
            //   <div className="file-btn">
            //     <input type="file" id="file-input" onChange={selectResume} />
            //     <label htmlFor="file-input">
            //       <IconButton
            //         round
            //         backgroundColor="#D30B81"
            //         disabled={uploadMutation.isLoading}
            //       >
            //         <div className="btn-body">
            //           <span>{selectedFile?.name ?? "Chọn CV"}</span>
            //           <span>
            //             <PlusOutlined />
            //           </span>
            //         </div>
            //       </IconButton>
            //     </label>
            //   </div>
              <div className="file-btn">
                {
                  uploadsExist() &&
                    <input type="file" id="file-input" onChange={handleUpload} />
                }
                <label htmlFor="file-input">
                  <IconButton
                    round
                    backgroundColor="#7277F1"
                    disabled={uploadMutation.isLoading}
                    onClick={() => !uploadsExist() && handleUpload()}
                  >
                    {uploadMutation.isLoading ? (
                      <div className="btn-body">
                        <span>Đang tải lên {formatOverflowText(selectedFile?.name ?? "CV", 10)}</span>
                        <span>
                          <LoadingOutlined />
                        </span>
                      </div>
                    ) : selectedFile && uploadMutation.isSuccess && uploadsExist() ? (
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
                </label>
              </div>
          )}
        </div>
      }
      // eslint-disable-next-line react/no-children-prop
      children={
        isLoading ? (
          <div>Đang tải...</div>
        ) : !uploadedFiles || uploadedFiles.length === 0 ? (
          <Upload.Dragger
            maxCount={1}
            listType="text"
            beforeUpload={selectResumeDrag}
            accept=".pdf"
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
            <div>Bấm để chọn file hoặc kéo và thả file (.pdf)</div>
          </Upload.Dragger>
        ) : (
          <Carousel
            noMargin
            slidesToScroll={2}
            slides={uploadedFiles.map((uploadedFile, index) => (
              // eslint-disable-next-line react/jsx-key
              <StyledResumeCard>
                <div className="resume-star" onClick={() => handleUpdateActiveResume(index)}>
                {
                // uploadedFile.pk === (resumes?.active_resume?.pk ?? -1) || 
                  index === activeResumeIndex ? (
                    <StarIcon />
                    ) : <StarIconOutlined />}
                </div>
                <h3 className="clamp-1">{extractFileName(uploadedFile.resume)}</h3>
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
                      type="primary"
                      shape="circle"
                      loading={deletingResumeIndex === uploadedFile.pk}
                      icon={<DeleteOutlined />}
                      onClick={(event) => handleDelete(event, uploadedFile.pk)}
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
