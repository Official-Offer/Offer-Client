import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { ResumeCard } from "@styles/styled-components/styledBox";
import { getStudentResume, updateStudentResume, deleteStudentResume } from "@services/apiStudent";

export const ResumePanel: React.FC = () => {
  const [resumeFetch, setResumeFetch] = useState(true); // For refetching the resume if there's any update
  const [selectedFile, setSelectedFile] = useState(null); // Holding the formData of the selected file before uploading
  const [uploadedFile, setUploadedFile] = useState(null); // Holding the URL of uploaded resume for downloading

  const handleDownload = (data) => {
    setUploadedFile(data);
  };

  const selectResume = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    const resumeData = new FormData();
    resumeData.append("resume", selectedFile);
    return await updateStudentResume(resumeData);
  };

  const downloadQuery = useQuery({
    queryFn: () => {
      setResumeFetch(false);
      return getStudentResume();
    },
    onSuccess: handleDownload,
    onError: (err) => console.log(`Download Error: ${err}`),
    enabled: resumeFetch
  });

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => setResumeFetch(true),
    onError: (err) => console.log(`Upload Error: ${err}`),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudentResume,
    onSuccess: () => {
      setResumeFetch(true);
      handleDownload();
    },
    onError: (err) => console.log(`Delete Error: ${err}`),
  });

  const handleUpload = (event) => {
    event.preventDefault();
    uploadMutation.mutate();
  };

  const handleDelete = () => {
    event.preventDefault();
    deleteMutation.mutate();
  };

  return (
    <ResumeCard>
      <input type="file" onChange={selectResume}/>
      <button onClick={handleUpload}>Upload</button>
      <div>{"Upload status: " + uploadMutation.status}</div>
      <div>{uploadedFile && uploadedFile.length > 0 ? (downloadQuery.isLoading ? `Đang tải...` : `Đã tải.`) : `Vui lòng tải lên CV`}</div>
      <div>{"Download status: " + downloadQuery.status}</div>
      <a href={uploadedFile} target="_blank">
        <button>Download</button>
      </a>
      <button onClick={handleDelete}>Delete</button>
      <div>{"Delete status: " + deleteMutation.status}</div>
    </ResumeCard>
  );
};
