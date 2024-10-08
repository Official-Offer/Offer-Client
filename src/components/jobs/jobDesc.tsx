import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  editJob,
  generateJobDescription,
  postJob,
  postJobRecruiter,
  editJobRecruiter,
} from "@services/apiJob";
import { SubmitButton } from "@components/button/SubmitButton";
import { BackwardOutlined, CheckOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { LoadingLine } from "@components/loading/LoadingLine";
import { DatePicker, Input, Select, Skeleton, Slider, notification } from "antd";
import moment from "moment";
import { SliderMarks } from "antd/lib/slider";
import { setJobId, clearJobAll } from "@redux/actions";
// import locale from "antd/es/date-picker/locale/vi_VN";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { extractLabelFromValue } from "@utils/extractors";
import { majorList, processedMajorList } from "@public/static/list";
import { workTypes, levels } from "@public/static/dict";
interface JobDescriptionProps {
  onClick: () => void;
  onBack: () => void;
  edit?: boolean;
  id?: string | string[] | undefined;
}
type NotificationType = "success" | "info" | "warning" | "error";

export const JobDescription: React.FC<JobDescriptionProps> = ({ onClick, onBack, edit, id }) => {
  const router = useRouter();
  const { school } = router.query;
  const f = (arr: any) => arr.map((v: any) => ({ value: v, label: v }));
  const state = useSelector((state: RootState) => state.jobs);
  // console.log(state.major)
  const accountState = useSelector((state: RootState) => state.account);
  const [schoolIds, setSchoolIds] = useState<any>(state.schoolIds);
  const [title, setTitle] = useState<string>(state.title || "Công việc mẫu");
  const [salary, setSalary] = useState<number>(state.salary);
  const [upperSalary, setUpperSalary] = useState<number>(state.upperSalary);
  const [level, setLevel] = useState<string[]>(state.level || []);
  const [type, setType] = useState<string[]>(state.type || ["fulltime"]);
  const [location, setLocation] = useState<string>(state.address || "Hà Nội");
  const [deadline, setDeadline] = useState<Date>(state.deadline || new Date());
  const [publiclyAvail, setPubliclyAvail] = useState<any>(state.publiclyAvailalble || false);
  const [majors, setMajors] = useState<number[]>(state.major || [1]);
  const [company, setCompany] = useState<string | undefined>(state.company || "Công ty mẫu");
  const [companyId, setCompanyId] = useState<number>(
    router.pathname.includes("recruiter")
      ? Number(getCookie("orgId"))
      : state.companyId
        ? state.companyId
        : getCookie("orgId")
          ? Number(getCookie("orgId"))
          : 1
  );
  const [editing, setEditing] = useState<boolean>(false);
  const [jd, setJd] = useState<string>(state.description || "Mô tả công việc mẫu");
  //
  const locations = f(["Hà nội", "TP.HCM", "Đà Nẵng"]);
  const companyList = ["Meta", "Tesla", "Amazon", "VinaCapital"];
  const types = workTypes;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message,
      description,
    });
  };
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
    mutationFn: postJobRecruiter,
    onSuccess: async (data) => {
      console.log(data);
      dispatch(setJobId(data.id));
      clearJobAll()
      openNotification("success", "Hoàn tất đăng công việc", "Bạn đã thành công đăng công việc");
      onClick();
      // clear redux state
    },
    onError: (error: any) => {
      // console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
      openNotification("error", "Lỗi", error.response.data.message);
    },
  });

  const editJobQuery = useMutation({
    mutationKey: ["edit-job"],
    mutationFn: editJobRecruiter,
    onSuccess: async (data) => {
      dispatch(setJobId(data.id));
      clearJobAll()
      openNotification("success", "Hoàn tất sửa công việc", "Bạn đã thành công sửa công việc");
      // notification.success();
      // onClick();
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.message);
      openNotification("error", "Lỗi", error.response.data.message);
      // console.log(error.response.data.message);
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
        <h2 style={{ fontSize: "25px" }}>Xem lại</h2>
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
      <br />
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
            <h2 onClick={() => (editing ? setEditing(false) : setEditing(true))}>
              {title} <EditOutlined />
            </h2>
          )}
        </div>
        {/* {editing ? (
          <Select
            // mode="multiple"
            // value={company}
            // className="form-select"
            placeholder="Công ty"
            onChange={handleCompanyChange}
            options={companies}
          />
        ) : ( */}
        <h3>{company}</h3>
        <p>
          {state.createdAt
            ? `Đăng vào: ` + moment(state.createdAt).format("DD/MM/YYYY")
            : `Mới đăng`}
        </p>
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
                value={moment(deadline)}
              />
            </div>
          ) : (
            <p style={{ color: "red" }}>Hạn nộp: {moment(deadline).format("DD/MM/YYYY")}</p>
          )}
        </div>
        {/* <SubmitButton text={"Nộp đơn"} /> */}
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
                  value={[salary, upperSalary]}
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
                  value={level}
                />
              ) : (
                <p>{level.map((lv) => extractLabelFromValue(lv, levels)).join(", ")}</p>
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
                  value={type}
                />
              ) : (
                <p>{type.map((type) => extractLabelFromValue(type, types)).join(", ")}</p>
              )}
            </div>
            <div>
              <h3>Ngành học liên quan</h3>
              {editing ? (
                <Select
                  labelInValue
                  className="job-desc-form"
                  mode="multiple"
                  placeholder="Công nghệ thông tin"
                  onChange={(value) => {
                    setMajors(value.map((v:any) => v?.value));
                  }}
                  options={processedMajorList}
                  value={majors.map((v: any) => ({ value: v, label: extractLabelFromValue(v, processedMajorList) }))}
                />
              ) : (
                <p>{majors.map((v: any) => (extractLabelFromValue(v, processedMajorList))).join(", ")}</p>
              )}
            </div>
            <div>
              <h3>Địa điểm</h3>
              {editing ? (
                <Select
                  className="job-desc-form"
                  // mode="multiple"
                  placeholder="Hà Nội"
                  onChange={(value) => {
                    setLocation(value);
                  }}
                  options={locations}
                  value={location}
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
              className=""
              value={jd}
              onChange={(value) => {
                setJd(value);
              }}
            />
          ) : (
            <div className="form-description" dangerouslySetInnerHTML={{ __html: jd }} />
          )}
        </div>
        <div className="job-desc-button">
          <br />
          <SubmitButton
            onClick={() => {
              // console.log(state.address);
              const payload = {
                title,
                levels: levels.map((level: any) => {
                  if (level.value == "Thực tập") return "internship";
                  if (level.value == "Nhân viên chính thức") return "newgrad";
                  if (level.value == "Đã có kinh nghiệm") return "experienced";
                }),
                job_types: types.map((type: any) => {
                  if (type.value == "fulltime") return "fulltime";
                  if (type.value == "parttime") return "parttime";
                  if (type.value == "Hợp đồng") return "contract";
                  if (type.value == "Tình nguyện") return "volunteer";
                }),
                lower_salary: salary,
                address: edit
                  ? 1
                  : {
                      city: location,
                    },
                upper_salary: upperSalary,
                description: jd,
                company: companyId,
                contact_person: Number(getCookie("id")),
                deadline,
                required_majors: majors,
                request_approval_from: router.pathname.includes("advisor")
                  ? [Number(getCookie("orgId"))]
                  : school
                    ? [Number(school)]
                    : schoolIds
                      ? schoolIds
                      : [],
                publicly_available: publiclyAvail,
              };
              edit ? editJobQuery.mutate({ id, content: payload }) : postJobQuery.mutate(payload);
            }}
            isLoading={edit ? editJobQuery.isLoading : postJobQuery.isLoading}
            text={edit ? "Hoàn tất sửa công việc" : "Đăng tuyển"}
          />
        </div>
      </div>
      {contextHolder}
    </div>
  );
};
