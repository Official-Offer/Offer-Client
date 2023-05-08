import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { getCookie } from "cookies-next";
import { Card as AntdCard, Button } from "antd";
import { InfoCard, ProfileCard } from "@components/card";
import { CardTray, ResumePanel } from "@components";
import { ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { 
  getStudentDetails,
  getStudentEducations,
  editStudentEducation,
  addStudentEducation,
  deleteStudentEducation,
  getStudentExperiences,
  editStudentExperience,
  addStudentExperience,
  deleteStudentExperience,
} from "@services/apiStudent";
import { getSchoolList } from "@services/apiSchool";
import { getCompanyList } from "@services/apiCompany";
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

const eduFieldItems = {
  itemTitle: "Trường",
  dataIDLabel: "school",
  dataName: "schoolName",
  disableEndDate: false,
  layout: [
    "study_fields",
    "gpa"
  ],
  labelToAPI: {
    "itemTitle": "schoolName",
    "GPA": "gpa",
    "Ngành học": "study_fields",
    "Ngày bắt đầu": "start_date",
    "Ngày tốt nghiệp": "end_date",
    "Tôi đang học trường này": "is_current",
  },
  APIToLabel: {
    "schoolName": "itemTitle",
    "gpa": "GPA",
    "study_fields": "Ngành học",
    "start_date": "Ngày bắt đầu",
    "end_date": "Ngày tốt nghiệp",
    "is_current": "Tôi đang học trường này",
  },
  itemType: {
    "study_fields": "object",
    "gpa": "number",
  },
  isRequired: {
    "schoolName": true
  }
};

const expFieldItems = {
  itemTitle: "Vị Trí",
  dataIDLabel: "company",
  dataName: "companyName",
  disableEndDate: true,
  layout: [
    "companyName",
    "location"
  ],
  labelToAPI: {
    "itemTitle": "title",
    "Công ty": "companyName",
    "Địa điểm": "location",
    "Ngày bắt đầu": "start_date",
    "Ngày kết thúc": "end_date",
    "Tôi đang làm công việc này": "is_current",
  },
  APIToLabel: {
    "title": "itemTitle",
    "companyName": "Công ty",
    "location": "Địa điểm",
    "start_date": "Ngày bắt đầu",
    "end_date": "Ngày kết thúc",
    "is_current": "Tôi đang làm công việc này",
  },
  itemType: {
    "location": "string",
  },
  isRequired: {
    "title": true,
    "companyName": true,
  }
}

const StudentProfile: NextPage = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const studentQuery = useQuery({
    queryKey: "students/me",
    queryFn: getStudentDetails,
    onSuccess: (res) => setStudentDetails(res),
    onError: (err) => console.log(`Error: ${err}`)
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
                  (studentDetails?.school?.length === 0) 
                  ? <h4>Trường không xác định</h4>
                  : studentDetails?.school.map((eachSchool) => <h4>{eachSchool.name}</h4>)
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
        <ProfileCard
          fieldTitle="Giáo Dục"
          fieldItemProps={eduFieldItems}
          getFunction={getStudentEducations}
          addFunction={addStudentEducation}
          editFunction={editStudentEducation}
          deleteFunction={deleteStudentEducation}
          dataFunction={getSchoolList}
        />
        <ProfileCard
          fieldTitle="Kinh Nghiệm"
          fieldItemProps={expFieldItems}
          getFunction={getStudentExperiences}
          addFunction={addStudentExperience}
          editFunction={editStudentExperience}
          deleteFunction={deleteStudentExperience}
          dataFunction={getCompanyList}
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