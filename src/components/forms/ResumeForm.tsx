import React, { useState } from "react";
import { FormInput } from "@styles/styled-components/styledForm";
import { Button, Modal, Upload, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface IResumeForm {
  onSubmit: (resume: string) => void;
}

export const ResumeForm:React.FC<IResumeForm> = ({ onSubmit }) => {
  const [resume, setResume] = useState("");

  const handleSubmit = () => {
    onSubmit(resume);
  };

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResume(event.target.value);
  };

  const props: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-flex">
          <div className="form-input">
            <label>
              <b> Chọn resume </b>
            </label>
            <FormInput
              width="250px"
              // marginRight="20px"
              list="mySuggestions"
              value={resume}
              onChange={handleResumeChange}
              required
            />
          </div>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Tai CV moi</Button>
          </Upload>
          <datalist id="mySuggestions">
            <option value="CV 1" />
            <option value="CV 2" />
            <option value="CV 3" />
          </datalist>
        </div>
      </form>
    </div>
  );
}
