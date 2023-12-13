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
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

interface JobDescriptionProps {
  onClick: () => void;
  onBack: () => void;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({
  onClick,
  onBack,
}) => {
  const router = useRouter();
  const { school } = router.query;
  const f = (arr: any) => arr.map((v: any) => ({ value: v, label: v }));
  const majorList = [
    { value: 1, label: "Công nghệ thông tin" },
    { value: 2, label: "Kinh tế" },
    { value: 3, label: "Marketing" },
    { value: 4, label: "Quản trị kinh doanh" },
    { value: 5, label: "Luật" },
  ];
  const state = useSelector((state: RootState) => state.jobs);
  const accountState = useSeulector((state: RootState) => state.account);
  const [title, setTitle] = useState<string>(state.title || "Công việc mẫu");
  const [salary, setSalary] = useState<number>(state.salary);
  const [upperSalary, setUpperSalary] = useState<number>(state.upperSalary);
  const [level, setLevel] = useState<string>(state.level || "");
  const [type, setType] = useState<string[]>(state.type || ["fulltime"]);
  const [location, setLocation] = useState<string[]>(
    state.address || ["Hà Nội"]
  );
  const [deadline, setDeadline] = useState<Date>(state.deadline || new Date());
  const [majors, setMajors] = useState<number[]>(state.major || [1]);
  const [majorNames, setMajorNames] = useState<string[]>(
    state.major.map((major) => majorList[major - 1].label + ", ") || [
      "Công nghệ thông tin",
    ]
  );
  const [company, setCompany] = useState<string>(state.company || `Samsung`);
  const [companyId, setCompanyId] = useState<number>(
    getCookie("orgId") ? Number(getCookie("orgId")) : state.companyId || 1
  );
  const [editing, setEditing] = useState<boolean>(false);
  const [jd, setJd] = useState<string>(
    state.description || "Mô tả công việc mẫu"
  );
  //
  const locations = f(["Hà nội", "TP.HCM", "Đà Nẵng"]);
  const types = f(["fulltime", "parttime", "Hợp đồng", "Tình nguyện"]);
  const levels = f(["Thực tập", "Nhân viên chính thức", "Đã có kinh nghiệm"]);
  const companyList = ["Meta", "Tesla", "Amazon", "VinaCapital"];
  const companies = [
    { value: 1, label: "Meta" },
    { value: 2, label: "Tesla" },
    { value: 3, label: "Amazon" },
    { value: 4, label: "VinaCapital" },
  ];

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
        <h2 style={{ fontSize: "25px" }}>Xem trước</h2>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => (editing ? setEditing(false) : setEditing(true))}
        >
          {editing ? (
            <h3>
              {" "}
              Hoàn tất chỉnh sửa <CheckOutlined />
            </h3>
          ) : (
            <h3>
              Chỉnh sửa <EditOutlined />
            </h3>
          )}
        </div>
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
            <h2
              onClick={() => (editing ? setEditing(false) : setEditing(true))}
            >
              {title} <EditOutlined />
            </h2>
          )}
        </div>
        <h4>Mới đăng</h4>
        {editing ? (
          <Select
            // mode="multiple"
            // value={company}
            // className="form-select"
            placeholder="Công ty"
            onChange={handleCompanyChange}
            options={companies}
          />
        ) : (
          <p>{company}</p>
        )}
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
                  // mode="multiple"
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
                  placeholder="Fulltime"
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
                    setMajorNames(
                      value.map(
                        (major: number) => majorList[major - 1].label + ", "
                      )
                    );
                  }}
                  options={majorList}
                />
              ) : (
                <p>{majorNames}</p>
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
              level:
                level == "Thực tập"
                  ? "internship"
                  : level == "Nhân viên chính thức"
                    ? "newgrad"
                    : "experienced",
              job_type:
                type[0] == "Hợp đồng"
                  ? "contract"
                  : type[0] == "volunteer"
                    ? "volunteer"
                    : type[0],
              lower_salary: salary,
              address: {
                city: location[0],
              },
              upper_salary: upperSalary,
              description: jd,
              company: companyId,
              contact_person: accountState.id || 1,
              deadline,
              required_majors: majors,
              // request_approval_from: school ? Number(school) : null,
            });
          }}
          isLoading={postJobQuery.isLoading}
          text={"Đăng tuyển"}
        />
      </div>
    </div>
  );
};
