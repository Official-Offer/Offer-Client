import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { ResumeCard } from "@styles/styled-components/styledBox";
import { getStudentResume, updateStudentResume, deleteStudentResume } from "@services/apiStudent";

export const ResumePanel: React.FC = () => {
  const [resumeFetch, setResumeFetch] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDownload = (data) => {
    console.log(data);
    setUploadedFile(<a href={URL.createObjectURL(new Blob([data]))} download="file.pdf">CV của bạn</a>);
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
    enabled: resumeFetch
  });

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => setResumeFetch(true),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudentResume,
    onSuccess: () => setResumeFetch(true),
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
      {uploadedFile ?? <div>{downloadQuery.isLoading ? `Đang tải` : `Vui lòng tải lên CV`}</div>}
      <div>{"Download status: " + downloadQuery.status}</div>
      <button>Download</button>
      <button onClick={handleDelete}>Delete</button>
      <div>{"Delete status: " + deleteMutation.status}</div>
    </ResumeCard>
  );
};
