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
import { DatePicker, Input, Skeleton, Slider } from "antd";
import moment from "moment";
import { SliderMarks } from "antd/lib/slider";
import { setJobId } from "@redux/actions";
// import locale from "antd/es/date-picker/locale/vi_VN";

export const JobDescription: React.FC<any> = ({ onClick, onBack }) => {
  const state = useSelector((state: RootState) => state.jobs);
  const accountState = useSelector((state: RootState) => state.account);
  // console.log(state.deadline);
  const [title, setTitle] = useState<string>(state.title || "Công việc mẫu");
  // const [company, setCompany] = useState<string>(state.company || "");
  const [salary, setSalary] = useState<number>(state.salary);
  const [upperSalary, setUpperSalary] = useState<number>(state.upperSalary);
  const [level, setLevel] = useState<string>(state.level || "");
  const [requirements, setReq] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [type, setType] = useState<string>(state.type || "");
  const [location, setLocation] = useState<string>(state.address || "");
  const [deadline, setDeadline] = useState<Date>(state.deadline || new Date());
  const [majors, setMajors] = useState<string>(state.major || "");
  // const [discipline, setDiscipline] = useState<string>("");
  const [exp, setExp] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  // const [howTo, setHowTo] = useState<string>("");
  const [jd, setJd] = useState<string>(
    state.description ||
      `[HCM] Cơ hội trở thành "teammate" với Con Cưng cho sinh viên năm 3!!!
  Team HSE - Con Cưng đang rất mong chờ chào đón các bạn HSE Intern về chung một nhà! Apply ngay thôi !!!
  ---------------
  🥳 Bạn nhận được gì khi ở vị trí này?
  Thời gian làm việc: Fulltime (Thứ 2 - Thứ 6) (hỗ trợ nghỉ Phép 3 buổi/tháng)
  Được đào tạo, trải nghiệm và phát triển các nghiệp vụ chuyên môn trong lĩnh vực Nhân sự.
  Hỗ trợ trong quá trình thực tập: 3.000.000 - 5.000.000 đ/tháng.
  Được tham gia hầu hết các hoạt động của công ty.
  🤔 Chỉ cần bạn:
  Là sinh viên năm 3, 4. Có thể thực tập fulltime.
  Chăm chỉ, chịu khó, có tinh thần trách nhiệm và giao tiếp tốt.
  Khả năng sử dụng các công cụ thiết kế là điểm cộng.
  ---------------
  Xem thông tin JD tại: https://tuyendung.concung.com/603-tuyen-dung-hse-intern
  💁‍♀️ Bạn sẽ làm việc tại: Tầng 14, Tòa nhà Phú Mỹ Hưng, P. Tân Phú, Quận 7, TP HCM.
  🙆‍♀️ Thời gian bạn sẽ làm việc: 8h30 - 17h30 (T2 - T6).
  Nhanh tay gửi CV về: careers@concung.com hoặc inbox mình để trao đổi thêm nhé!!!`
  );

  const marks: SliderMarks = {
    0: "0",
    100: "100",
  };

  const dispatch = useDispatch();

  const jobQuery = useQuery({
    queryKey: ["job-description"],
    queryFn: () => generateJobDescription(title+jd),
    onSuccess: async (job) => {
      const jobDesc = JSON.parse(job);
      // setSalary(jobDesc.salary);
      // setLevel(jobDesc.level);
      setReq(jobDesc.requirements);
      setBenefits(jobDesc.benefits);
      // setDiscipline(jobDesc.discipline);
      // setMajors(jobDesc.majors);
      // setDeadline(jobDesc.deadline);
      setType(jobDesc.type);
      setLocation(jobDesc.location);
      setExp(jobDesc.requiredExperience);
      // setHowTo(jobDesc.howTo);
    },
    onError: () => {},
    reloadOnWindowFocus: false,
  });

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
          // setScreen(false);
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
          ) : jobQuery.isLoading ? (
            <h2>
              Hãy kiên nhẫn một chút, OfferAI đang tạo JD tối ưu cho bạn...
            </h2>
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
        <p>{state.company || `Samsung`}</p>
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
            <LoadingLine loading={jobQuery.isLoading}>
              <p>Hạn nộp: {moment(deadline).format("DD-MM-YYYY")}</p>
            </LoadingLine>
          )}
        </div>
        <SubmitButton text={"Nộp đơn"} />
        <div className="job-desc-pink">
          <div className="job-desc-grid">
            <div>
              <h3>Luơng</h3>
              {editing ? (
                // <Input
                //   required
                //   value={salary}
                //   className="form-job"
                //   onChange={(event) => {
                //     setSalary(event.target.value);
                //   }}
                // />
                <Slider
                  range
                  defaultValue={[0, 100]}
                  marks={marks}
                  onAfterChange={(value)=>{
                    setSalary(value[0]);
                    setUpperSalary(value[1]);
                  }}
                />
              ) : (
                <LoadingLine loading={jobQuery.isLoading}>
                  <p>{`${salary} - ${upperSalary} triệu VNĐ/tháng`}</p>
                </LoadingLine>
              )}
            </div>
            <div>
              <h3>Cấp bậc</h3>
              {editing ? (
                <Input
                  required
                  value={level}
                  className="form-job"
                  onChange={(event) => {
                    setLevel(event.target.value);
                  }}
                />
              ) : (
                <LoadingLine loading={jobQuery.isLoading}>
                  <p>{level}</p>
                </LoadingLine>
              )}
            </div>
            <div>
              <h3>Hình thức</h3>
              {editing ? (
                <Input
                  required
                  value={type}
                  className="form-job"
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                />
              ) : (
                <LoadingLine loading={jobQuery.isLoading}>
                  <p>{type}</p>
                </LoadingLine>
              )}
            </div>
            <div>
              <h3>Ngành học liên quan</h3>
              {editing ? (
                <Input
                  required
                  value={majors}
                  className="form-job"
                  onChange={(event) => {
                    setMajors(event.target.value);
                  }}
                />
              ) : (
                <LoadingLine loading={jobQuery.isLoading}>
                  <p>{majors}</p>
                </LoadingLine>
              )}
            </div>
            <div>
              <h3>Địa điểm</h3>
              {editing ? (
                <Input
                  required
                  value={location}
                  className="form-job"
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                />
              ) : (
                <LoadingLine loading={jobQuery.isLoading}>
                  <p>{location}</p>
                </LoadingLine>
              )}
            </div>
            <div>
              <h3>Kinh nghiệm</h3>
              {editing ? (
                <Input
                  required
                  value={exp}
                  className="form-job"
                  onChange={(event) => {
                    setExp(event.target.value);
                  }}
                />
              ) : (
                <LoadingLine loading={jobQuery.isLoading}>
                  <p>{exp}</p>
                </LoadingLine>
              )}
            </div>
          </div>
          {/* <div className="job-desc-single"> */}
          {/* </div> */}
        </div>
        <div>
          <h2>Quyền lợi</h2>
          {editing ? (
            <Input.TextArea
              rows={6}
              required
              value={benefits}
              className="form-job-long"
              onChange={(event) => {
                setBenefits(event.target.value);
              }}
            />
          ) : (
            <LoadingLine loading={jobQuery.isLoading}>
              <p>{benefits}</p>
            </LoadingLine>
          )}
        </div>
        <div>
          <h2>Yêu cầu</h2>
          {editing ? (
            <Input.TextArea
              rows={6}
              required
              value={requirements}
              className="form-job-long"
              onChange={(event) => {
                setReq(event.target.value);
              }}
            />
          ) : (
            <LoadingLine loading={jobQuery.isLoading}>
              <p>{requirements}</p>
            </LoadingLine>
          )}
        </div>
        <div>
          <h2>Mô tả</h2>
          {editing ? (
            <Input.TextArea
              rows={6}
              required
              value={jd}
              className="form-job-long"
              onChange={(event) => {
                setJd(event.target.value);
              }}
            />
          ) : (
            <Skeleton loading={jobQuery.isLoading} active>
              <pre>{jd}</pre>
            </Skeleton>
          )}
        </div>
        {/* <div>
          <h2>Cách ứng tuyển</h2>
          {editing ? (
            <Input.TextArea
              rows={6}
              required
              value={howTo}
              className="form-job-long"
              onChange={(event) => {
                setHowTo(event.target.value);
              }}
            />
          ) : (
            <Skeleton loading={jobQuery.isLoading} active>
              <pre>{howTo}</pre>
            </Skeleton>
          )}
        </div> */}
      </div>
      <div className="job-desc-button">
        <SubmitButton
          onClick={() => {
            console.log(state.address)
            postJobQuery.mutate({
              title: title.slice(0,99),
              level: level=="Thực tập"? "internship": level=="Nhân viên chính thức" ? "newgrad" : "experienced",
              job_type: type,
              // type=="Hợp đồng" || type=="Tình nguyện" ? "contract": type=="fulltime" ? "fulltime" : "parttime", 
              // work_type,
              salary,
              // address: {
              //   city: state.address[0],
              // },
              upper_salary: state.upperSalary,
              description: jd,
              benefits,
              company: state.companyId,
              requirements,
              location,
              contact_person: accountState.id,
              deadline,
              // required_majors: state.major,
              // required_experience: exp,
              // howTo,
            });
          }}
          isLoading={postJobQuery.isLoading}
          text={"Đăng tuyển"}
        />
      </div>
    </div>
  );
};
