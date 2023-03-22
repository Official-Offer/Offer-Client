import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TogglableButton } from "@styles/styled-components/styledButton";
export const JobFilterNavbar: React.FC = () => {
  
  return (
    <div className="job-portal-container navbar">
      <Input
        className="search-bar"
        placeholder="Tìm Kiếm"
        prefix={<SearchOutlined />}
      />
      <TogglableButton active>Full/Part</TogglableButton>
      <TogglableButton>1k+</TogglableButton>
      <TogglableButton>On-campus</TogglableButton>
    </div>
  );
};
