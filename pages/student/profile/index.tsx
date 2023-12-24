/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { Card as AntdCard, Button } from "antd";
import { InfoCard, ProfileCard, ResumeCard } from "@components/card";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  EditOutlined,
  LoadingOutlined
} from "@ant-design/icons";
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
import { getSchoolList, getMajorList } from "@services/apiSchool";
import { getCompanyList } from "@services/apiCompany";
import { getJob } from "@services/apiJob";
import { formatDate } from "@utils/formatters/numberFormat";
import { BuildingOfficeIcon, BookOpenIcon, AcademicCapIcon, HeartIcon, UserIcon } from "@heroicons/react/24/solid";
import Skeleton from "react-loading-skeleton";

const profile = {
  cover:
    "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  avatar: "/images/avatar.png",
  name: "Kien To",
  year: "2021-2024",
  school: "MIT at Amherst",
  major: "Công Nghệ Thông Tin",
  jobs: ["SWE", "Sales"],
};

const info = {
  id: 0,
  name: "Thực tập sinh Kỹ sư Phần Mềm",
  institution: "Samsung",
  location: "TP. Hồ Chí Minh",
  attribute: "Full-Time/Part-Time/Remote",
  commonSchool: [
    { name: "Tom Ngo", avatar: "/images/avatar.png" },
    { name: "Kien To", avatar: "/images/avatar.png" },
  ],
  date: new Date("2023-2-27"),
  cover:
    "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
};

const eduFieldItems = {
  itemTitle: "Trường",
  dataIDLabel: "school",
  dataName: ["name", "majors"],
  disableEndDate: false,
  layout: ["majors", "gpa"],
  labelToAPI: {
    itemTitle: "school",
    nestedItemTitle: "name",
    GPA: "gpa",
    "Ngành học": "majors",
    "Ngày bắt đầu": "start_date",
    "Ngày tốt nghiệp": "end_date",
    "Tôi đang học trường này": "is_current",
  },
  APIToLabel: {
    school: "itemTitle",
    name: "nestedItemTitle",
    gpa: "GPA",
    majors: "Ngành học",
    start_date: "Ngày bắt đầu",
    end_date: "Ngày tốt nghiệp",
    is_current: "Tôi đang học trường này",
  },
  itemType: {
    study_fields: "object",
    gpa: "number",
  },
  isRequired: {
    schoolName: true,
  },
};

const expFieldItems = {
  itemTitle: "Vị Trí",
  dataIDLabel: "company",
  dataName: ["companyName", "skills"],
  disableEndDate: true,
  layout: ["companyName", "location"],
  labelToAPI: {
    itemTitle: "title",
    "Công ty": "companyName",
    "Địa điểm": "location",
    "Ngày bắt đầu": "start_date",
    "Ngày kết thúc": "end_date",
    "Tôi đang làm công việc này": "is_current",
  },
  APIToLabel: {
    title: "itemTitle",
    companyName: "Công ty",
    location: "Địa điểm",
    start_date: "Ngày bắt đầu",
    end_date: "Ngày kết thúc",
    is_current: "Tôi đang làm công việc này",
  },
  itemType: {
    location: "string",
  },
  isRequired: {
    title: true,
    companyName: true,
  },
};

const StudentProfile: NextPage = () => {
  const [studentDetails, setStudentDetails] = useState<Record<string, any> | null>(null);
  const id = getCookie("id");
  const studentQuery = useQuery({
    queryKey: [`students/${id}`],
    queryFn: getStudentDetails,
    onSuccess: (res) => {
      setStudentDetails(res);
    },
    onError: (err) => console.log(`Error: ${err}`),
    refetchOnWindowFocus: false
  });

  const getSchoolAndMajorList = async () => {
    const schoolList = await getSchoolList();
    const majorList = await getMajorList();
    return [schoolList, majorList];
  };

  return (
    <main className="split-layout">
      <section className="split-layout-sticky student-profile split-layout-item flex-sm">
        <AntdCard
          cover={
            studentDetails?.account.cover_photo ? (
              <img src={studentDetails?.account.cover_photo} />
            ) : (
              <div className="gradient"></div>
            )}
          children={
            <div>
              {
                studentDetails?.account.avatar ? (
                  <img className="student-profile-avatar" src={studentDetails?.account.avatar} />
                ) : (
                  <div className="student-profile-avatar">
                    {studentQuery.isLoading ? <LoadingOutlined /> : <UserIcon />}
                  </div>
                )
              }
              <div className="student-profile-header">
                {
                  studentQuery.isLoading ? <Skeleton height="1.25rem" width="50%" /> :
                    <h1>
                      {
                        studentDetails?.account?.first_name && studentDetails?.account?.last_name ? (
                          studentDetails?.account.first_name +
                          " " +
                          studentDetails?.account.last_name
                        ) : (
                          "Họ Tên"
                        )
                      }
                    </h1>
                }
              </div>
              <div className="student-profile-info">
                <div className="student-profile-info-item">
                  <BuildingOfficeIcon />
                  <span>{
                    studentQuery.isLoading ? <Skeleton height="1rem" /> :
                      studentDetails?.school?.name ?? "Trường không xác định"
                  }</span>
                </div>
                <div className="student-profile-info-item">
                  <AcademicCapIcon />
                  <span>
                    {
                      studentQuery.isLoading ? <Skeleton height="1rem" /> :
                        studentDetails?.expected_graduation_date
                          ? formatDate(studentDetails.expected_graduation_date,"D/M/YYYY")
                          : "Không có ngày tốt nghiệp"
                    }
                  </span>
                </div>
                <div className="student-profile-info-item">
                  <BookOpenIcon />
                    <span>
                      {
                        studentQuery.isLoading ? <Skeleton height="1rem" /> :
                          studentDetails?.majors?.length > 0 ?
                            studentDetails?.majors?.map((major: { name: string }) => major.name)
                            .join(", ") : "Ngành chưa xác định"
                      }
                    </span>
                  </div>
                  <div className="student-profile-info-item">
                    <HeartIcon />
                    <span>
                      {
                        studentQuery.isLoading ? <Skeleton height="1rem" /> :
                          studentDetails?.desired_industries?.length > 0 ?
                            studentDetails?.desired_industries?.map((industry: { name: string }) => industry.name)
                            .join(", ") : "Chưa có nghề mong muốn"
                      }
                    </span>
                </div>
              </div>
            </div>
          }
        />
      </section>
      <section className="split-layout-item flex-md">
        <ResumeCard
          isEditable
          resumes={studentDetails?.resumes}
          isError={studentQuery.isError}
          isLoading={studentQuery.isLoading}
          isRefetching={studentQuery.isRefetching}
          refetchFunction={studentQuery.refetch}
        />
        <ProfileCard
          isEditable
          fieldTitle="Học Vấn"
          fieldItemProps={eduFieldItems}
          isLoading={studentQuery.isLoading}
          isError={studentQuery.isError}
          refetchFunction={studentQuery.refetch}
          data={studentDetails?.educations}
          addFunction={addStudentEducation}
          editFunction={editStudentEducation}
          deleteFunction={deleteStudentEducation}
          dataFunction={getSchoolAndMajorList}
        />
        <ProfileCard
          isEditable
          fieldTitle="Kinh Nghiệm"
          fieldItemProps={expFieldItems}
          isLoading={studentQuery.isLoading}
          isError={studentQuery.isError}
          refetchFunction={studentQuery.refetch}
          data={studentDetails?.experiences}
          addFunction={addStudentExperience}
          editFunction={editStudentExperience}
          deleteFunction={deleteStudentExperience}
          dataFunction={getSchoolAndMajorList}
        />
      </section>
      <section className="split-layout-sticky flex-sm"></section>
    </main>
  );
};

export default StudentProfile;
