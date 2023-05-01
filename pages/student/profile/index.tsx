import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { getCookie } from "cookies-next";
import { Card as AntdCard, Button } from "antd";
import { InfoCard } from "@components/card/infoCard";
import { CardTray, ResumePanel } from "@components";
import { ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { getStudentDetails } from "@services/apiStudent";
import { getSchool } from "@services/apiSchool";
import { getJob } from "@services/apiJob";

const profile = {
  cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  avatar: "/images/avatar.png",
  name: "Kien To",
  year: "2021-2024",
  school: "MIT at Amherst",
  major: "Công Nghệ Thông Tin",
  jobs: ["SWE", "Sales"],
};

const info = {
  name: "Thực tập sinh Kỹ sư Phần Mềm",
  institution: "Samsung",
  location: "TP. Hồ Chí Minh",
  attribute: "Full-Time/Part-Time/Remote",
  commonSchool: [
    {name: "Tom Ngo", avatar: "/images/avatar.png"}, 
    {name: "Kien To", avatar: "/images/avatar.png"}
  ],
  date: new Date('2023-2-27'),
  cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
};

const school = {
  name: "MIT at Amherst",
  logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png",
  year: "08/2021 - 10/2024",
  major: "Công Nghệ Thông Tin"
};

const exp = {
  name: "Techfarm",
  logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png",
  year: "08/2021 - 10/2024",
  role: "Software Developer",
  location: "HCM"
};

const StudentProfile: NextPage = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const studentQuery = useQuery({
    queryKey: "students/me",
    queryFn: getStudentDetails,
    onSuccess: async (res) => setStudentDetails(res),
    onError: (err) => console.log(`Error: ${err}`),
  });
  
  return (
    <main className="student-profile">
      <section className="sticky-panel sticky-panel-profile">
        <AntdCard
          loading={studentQuery.isLoading}
          cover={<img src={profile.cover}/>}
          children={
            <div>
              <img className="sticky-panel-profile-avatar" src={profile.avatar} />
              <div className="sticky-panel-profile-header">
                <h2>{studentDetails?.name}</h2>
                <span>{studentDetails?.expected_graduation === undefined ? "Ngày không xác định" : (new Date(studentDetails.expected_graduation)).toDateString()}</span>
              </div>
              <div className="sticky-panel-profile-info">
                {
                  (studentDetails?.school === undefined || studentDetails?.school.length === 0) 
                  ? <h4>Trường không xác định</h4>
                  : studentDetails?.school.map((school) => <h4>{school}</h4>)
                }
                <h4>{studentDetails?.major ?? "Ngành không xác định"}</h4>
                <h4>Đang tìm kiếm công việc:</h4>
                <h4>{studentDetails?.desired_job ?? "Không xác định"}</h4>
              </div>
            </div>
          }
        />
      </section>
      <section className="main-panel">
        <AntdCard
          className="main-panel-card"
          title={
            <div className="main-panel-header">
              <h2>CV</h2>
            </div>
          }
          children={
            <div>
              <ResumePanel />
            </div>
          }
        />
        <AntdCard
          className="main-panel-card"
          title={
            <div className="main-panel-header">
              <h2>Giáo Dục</h2>
              <Button className="icon-btn" type="text" icon={<PlusOutlined />} />
            </div>
          }
          children={
            <div className="main-panel-info">
              <div className="main-panel-info-logo">
                <img src={school.logo} alt={"Logo of " + school.name} />
              </div>
              <div className="main-panel-info-center">
                <h3>{school.name}</h3>
                <div>
                  <b>Thời gian học:</b>
                  <span>{" " + school.year}</span>
                </div>
                <div>
                  <b>Ngành học:</b>
                  <span>{" " + school.major}</span>
                </div>
              </div>
              <div>
                <Button className="icon-btn" type="text" icon={<EditOutlined />} />
              </div>
            </div>
          }
        />
        <AntdCard
          className="main-panel-card"
          title={
            <div className="main-panel-header">
              <h2>Kinh Nghiệm</h2>
              <Button className="icon-btn" type="text" icon={<PlusOutlined />} />
            </div>
          }
          children={
            <div className="main-panel-info">
              <div className="main-panel-info-logo">
                <img src={exp.logo} alt={"Logo of " + exp.name} />
              </div>
              <div className="main-panel-info-center">
                <h3>{exp.name}</h3>
                <div>
                  <b>Thời gian làm việc:</b>
                  <span>{" " + exp.year}</span>
                </div>
                <div>
                  <b>Vai trò:</b>
                  <span>{" " + exp.role}</span>
                </div>
                <div>
                  <b>Địa điểm:</b>
                  <span>{" " + exp.location}</span>
                </div>
              </div>
              <div>
                <Button className="icon-btn" type="text" icon={<EditOutlined />} />
              </div>
            </div>
          }
        />
      </section>
      <section className="sticky-panel sticky-panel-job">
        <div className="sticky-panel-job-section">
          <Link href="/students/jobs">Jobs Applied</Link>
          <InfoCard info={info} />
        </div>
        <div className="sticky-panel-job-section">
          <Link href="/students/jobs">Jobs Saved</Link>
          <InfoCard info={info} />
        </div>
      </section>
    </main>
  );
};

export default StudentProfile;