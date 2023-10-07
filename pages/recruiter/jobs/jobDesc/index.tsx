import axios from "axios";
import { NextPage } from "next";
import { useQuery } from "react-query";
import { useState } from "react";
import { generateJobDescription } from "@services/apiJob";
import { SubmitButton } from "@components/button/SubmitButton";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

const JobDescription: NextPage = (comp) => {
  const state = useSelector((state: RootState) => state.jobs);
  const [salary, setSalary] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [requirements, setReq] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [exp, setExp] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [jd, setJd] =
    useState<string>(state.description || `[HCM] Cơ hội trở thành "teammate" với Con Cưng cho sinh viên năm 3!!!
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
  Nhanh tay gửi CV về: careers@concung.com hoặc inbox mình để trao đổi thêm nhé!!!`);

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
      //   setJob(res);
    },
    onError: () => {},
  });
  return jobQuery.isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="job-desc">
      <div className="job-desc-nav">
        <h1>Xem trước</h1>
      </div>
      <div className="job-desc-content">
        <div className="job-desc-heading">
          <h2>{state.title || `Thực tập sinh Kỹ sư Phần Mềm chi nhánh TP.HCM`}</h2>
          <p onClick={() => (editing ? setEditing(false) : setEditing(true))}>
            Chỉnh sửa <EditOutlined />
          </p>
        </div>
        <h4>Đăng vào 2 ngày trước</h4>
        <p>{state.company || `Samsung`}</p>
        <SubmitButton text={"Nộp đơn"} />
        <div className="job-desc-pink">
          <div className="job-desc-row">
            <div>
              <h3>Luơng</h3>
              {editing ? (
                <input
                  type="text"
                  className="job-desc-input"
                  value={salary}
                  onChange={(event) => {
                    setSalary(event.target.value);
                  }}
                />
              ) : (
                <p>{salary}</p>
              )}
            </div>
            <div>
              <h3>Cấp bậc</h3>
              {editing ? (
                <input
                  type="text"
                  className="job-desc-input"
                  value={level}
                  onChange={(event) => {
                    setLevel(event.target.value);
                  }}
                ></input>
              ) : (
                <p>{level}</p>
              )}
            </div>
          </div>
          <div className="job-desc-row">
            <div>
              <h3>Hình thức</h3>
              {editing ? (
                <input
                  type="text"
                  className="job-desc-input"
                  value={type}
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                />
              ) : (
                <p>{type}</p>
              )}
            </div>
            <div>
              <h3>Kinh nghiệm</h3>
              {editing ? (
                <input
                  type="text"
                  className="job-desc-input"
                  value={exp}
                  onChange={(event) => {
                    setExp(event.target.value);
                  }}
                />
              ) : (
                <p>{exp}</p>
              )}
            </div>
          </div>
          <div className="job-desc-single">
            <div>
              <h3>Địa điểm</h3>
              {editing ? (
                <input
                  type="text"
                  className="job-desc-input"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                />
              ) : (
                <p>{location}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <h2>Quyền lợi</h2>
          {editing ? (
            <input
              type="text"
              className="job-desc-input"
              value={benefits}
              onChange={(event) => {
                setBenefits(event.target.value);
              }}
            />
          ) : (
            <p>{benefits}</p>
          )}
        </div>
        <div>
          <h2>Yêu cầu</h2>
          {editing ? (
            <input
              type="text"
              className="job-desc-input"
              value={requirements}
              onChange={(event) => {
                setReq(event.target.value);
              }}
            />
          ) : (
            <p>{requirements}</p>
          )}
        </div>
        <div>
          <h2>Mô tả</h2>
          <p>{jd}</p>
          {/* {editing ? (
            <input
              type="text"
              className="job-desc-input"
              value={jd}
              onChange={(event) => {
                setJd(event.target.value);
              }}
            />
          ) : (
            <p>{jd}</p>
          )} */}
        </div>
      </div>
      <div className="job-desc-button">
        <SubmitButton text={"Tiếp tục"} />
      </div>
    </div>
  );
};
export default JobDescription;
