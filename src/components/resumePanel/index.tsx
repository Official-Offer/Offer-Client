import { useState } from "react";
import { ResumeCard } from "@styles/styled-components/styledBox";
import { updateStudentResume } from "@services/apiStudent";

export const ResumePanel: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const selectFile = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  const uploadFile = async () => {
    const resumeData = new FormData();
    resumeData.append("resume", selectedFile);
    console.log('selectedFile', selectedFile);
    console.log('isFileSelected', isFileSelected);
    console.log('resumeData', resumeData);
    return await updateStudentResume(resumeData);
  };

  return (
    <ResumeCard>
      <input type="file" onChange={selectFile}/>
      <button onClick={uploadFile}>Upload</button>
      <div>{isFileSelected ? `Resume: ${selectedFile.name}` : `Please select a file`}</div>
      <button>Download</button>
      <button>Delete</button>
    </ResumeCard>
  );
};
