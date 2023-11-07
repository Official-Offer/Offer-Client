import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { generateJobDescription, postJob } from "@services/apiJob";
import { SubmitButton } from "@components/button/SubmitButton";
import {
  BackwardOutlined,
  CheckOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { LoadingLine } from "@components/loading/LoadingLine";
import { DatePicker, Input, Select, Skeleton, Slider } from "antd";
import moment from "moment";
import { SliderMarks } from "antd/lib/slider";
import { setJobId } from "@redux/actions";
// import locale from "antd/es/date-picker/locale/vi_VN";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface JobDescriptionProps {
  onClick: () => void;
  onBack: () => void;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({
  onClick,
  onBack,
}) => {
  const f = (arr: any) => arr.map((v: any) => ({ value: v, label: v }));

  const state = useSelector((state: RootState) => state.jobs);
  const accountState = useSelector((state: RootState) => state.account);
  const [title, setTitle] = useState<string>(state.title || "Công việc mẫu");
  const [salary, setSalary] = useState<number>(state.salary);
  const [upperSalary, setUpperSalary] = useState<number>(state.upperSalary);
  const [level, setLevel] = useState<string>(state.level || "");
  const [type, setType] = useState<string>("parttime");
  const [location, setLocation] = useState<string>(state.address || "");
  const [deadline, setDeadline] = useState<Date>(state.deadline || new Date());
  const [majors, setMajors] = useState<string>(state.major || "");
  const [company, setCompany] = useState<string>(state.company || `Samsung`);
  const [companyId, setCompanyId] = useState<number>(state.companyId || 1);
  const [editing, setEditing] = useState<boolean>(false);
  const [jd, setJd] = useState<string>(
    state.description || "Mô tả công việc mẫu"
  );
  //
  const locations = f(["Hà nội", "TP.HCM", "Đà Nẵng"]);
  const majorList = f([
    "Công nghệ thông tin",
    "Kinh tế",
    "Marketing",
    "Quản trị kinh doanh",
    "Luật",
  ]);
  const types = f(["fulltime", "parttime", "Hợp đồng", "Tình nguyện"]);
  const levels = f(["Thực tập", "Nhân viên chính thức", "Đã có kinh nghiệm"]);
  const companyList = ["Meta", "Tesla", "Amazon", "VinaCapital"]
  const companies = f(companyList);

  const handleCompanyChange = (value: any) => {
    setCompany(companyList[value - 1]);
    setCompanyId(value);
    // console.log(state.company);
  };
  const marks: SliderMarks = {
    0: "0",
    100: "100",
  };

  const dispatch = useDispatch();

  const postJobQuery = useMutation({
    mutationKey: ["post-job"],
    mutationFn: postJob,
    onSuccess: async (data) => {
      console.log(data);
      dispatch(setJobId(data.id));
      onClick();
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
    },
  });

  return (
    <div className="job-desc">
      <p
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          onBack();
        }}
      >
        <BackwardOutlined /> Quay lại
      </p>
      <div className="job-desc-nav">
        <h1>Xem trước</h1>
      </div>
      <div className="job-desc-content">
        <div className="job-desc-heading">
          {editing ? (
            <Input
              required
              value={title}
              className="form-job"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          ) : (
            <h2>{state.title}</h2>
          )}
          <div onClick={() => (editing ? setEditing(false) : setEditing(true))}>
            {editing ? (
              <p>
                {" "}
                Hoàn tất chỉnh sửa <CheckOutlined />
              </p>
            ) : (
              <p>
                Chỉnh sửa <EditOutlined />
              </p>
            )}
          </div>
        </div>
        <h4>Mới đăng</h4>
        {editing ? <Select
            // mode="multiple"
            // value={company}
            // className="form-select"
            placeholder="Công ty"
            onChange={handleCompanyChange}
            options={companies}
          />: (<p>{company}</p>)}
        <div>
          {editing ? (
            <div style={{ marginBottom: "10px" }}>
              <p>Hạn nộp</p>
              <DatePicker
                // locale={locale}
                onChange={(value) => {
                  if (value) {
                    setDeadline(value.toDate());
                  }
                }}
              />
            </div>
          ) : (
            <p>Hạn nộp: {moment(deadline).format("DD/MM/YYYY")}</p>
          )}
        </div>
        <SubmitButton text={"Nộp đơn"} />
        <div className="job-desc-pink">
          <div className="job-desc-grid">
            <div>
              <h3>Luơng</h3>
              {editing ? (
                <Slider
                className="job-desc-form"
                  range
                  defaultValue={[0, 100]}
                  marks={marks}
                  onAfterChange={(value) => {
                    setSalary(value[0]);
                    setUpperSalary(value[1]);
                  }}
                />
              ) : (
                <p>{`${salary} - ${upperSalary} triệu VNĐ/tháng`}</p>
              )}
            </div>
            <div>
              <h3>Cấp bậc</h3>
              {editing ? (
                <Select
                  className="job-desc-form"
                  mode="multiple"
                  placeholder="Thực tập"
                  onChange={(value) => {
                    setLevel(value);
                  }}
                  options={levels}
                />
              ) : (
                <p>{level}</p>
              )}
            </div>
            <div>
              <h3>Hình thức</h3>
              {editing ? (
                <Select
                  className="job-desc-form"
                  mode="multiple"
                  placeholder="Công nghệ thông tin"
                  onChange={(value) => {
                    setType(value);
                  }}
                  options={types}
                />
              ) : (
                <p>{type}</p>
              )}
            </div>
            <div>
              <h3>Ngành học liên quan</h3>
              {editing ? (
                <Select
                  className="job-desc-form"
                  mode="multiple"
                  placeholder="Công nghệ thông tin"
                  onChange={(value) => {
                    setMajors(value);
                  }}
                  options={majorList}
                />
              ) : (
                <p>{majors}</p>
              )}
            </div>
            <div>
              <h3>Địa điểm</h3>
              {editing ? (
                <Select
                  className="job-desc-form"
                  mode="multiple"
                  placeholder="Hà Nội"
                  onChange={(value) => {
                    setLocation(value);
                  }}
                  options={locations}
                />
              ) : (
                <p>{location}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <h2>Mô tả</h2>
          {editing ? (
            <ReactQuill
              value={jd}
              onChange={(value) => {
                setJd(value);
              }}
            />
          ) : (
            <div className="" dangerouslySetInnerHTML={{ __html: jd }} />
          )}
        </div>
      </div>
      <div className="job-desc-button">
        <SubmitButton
          onClick={() => {
            console.log(state.address);
            postJobQuery.mutate({
              title,
              level: level[0],
              job_type: type[0],
              lower_salary: salary,
              address: {
                city: location[0],
              },
              upper_salary: upperSalary,
              description: jd,
              company: companyId,
              contact_person: accountState.id || 1,
              deadline,
              required_majors: majors[0],
            });
          }}
          isLoading={postJobQuery.isLoading}
          text={"Đăng tuyển"}
        />
      </div>
    </div>
  );
};
