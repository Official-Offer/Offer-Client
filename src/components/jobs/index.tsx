import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { generateJobDescription } from "@services/apiJob";
import { SubmitButton } from "@components/button/SubmitButton";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { LoadingLine } from "@components/loading/LoadingLine";
import { Input, Skeleton } from "antd";

export const JobDescription: React.FC<JSXComponent> = ({ onClick }) => {
  const state = useSelector((state: RootState) => state.jobs);
  const [salary, setSalary] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [requirements, setReq] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [exp, setExp] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [howTo, setHowTo] = useState<string>("");
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

  const jobQuery = useQuery({
    queryKey: ["job-description"],
    queryFn: () => generateJobDescription(jd),
    onSuccess: async (job) => {
      const jobDesc = JSON.parse(job);
      setSalary(jobDesc.salary);
      setLevel(jobDesc.level);
      setReq(jobDesc.requirements);
      setBenefits(jobDesc.benefits);
      setType(jobDesc.type);
      setLocation(jobDesc.location);
      setExp(jobDesc.requiredExperience);
      setHowTo(jobDesc.howTo);
    },
    onError: () => {},
    reloadOnWindowFocus: false,
  });

  return (
    <div className="job-desc">
      <div className="job-desc-nav">
        <h1>Xem trước</h1>
      </div>
      <div className="job-desc-content">
        <div className="job-desc-heading">
          <h2>
            {state.title || `Thực tập sinh Kỹ sư Phần Mềm chi nhánh TP.HCM`}
          </h2>
          <p onClick={() => (editing ? setEditing(false) : setEditing(true))}>
            Chỉnh sửa <EditOutlined />
          </p>
        </div>
        <h4>Đăng vào 2 ngày trước</h4>
        <p>{state.company || `Samsung`}</p>
        <SubmitButton text={"Nộp đơn"} />
        <div className="job-desc-pink">
          <div className="job-desc-grid">
            <div>
              <h3>Luơng</h3>
              {editing ? (
                <Input
                  required
                  value={salary}
                  className="form-job"
                  onChange={(event) => {
                    setSalary(event.target.value);
                  }}
                />
              ) : (
                <LoadingLine loading={jobQuery.isLoading}>
                  <p>{salary}</p>
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
          <div className="job-desc-single">
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
          </div>
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
        <div>
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
        </div>
      </div>
      <div className="job-desc-button">
        <SubmitButton
          onClick={() => {
            onClick();
          }}
          text={"Tiếp tục"}
        />
      </div>
    </div>
  );
};
