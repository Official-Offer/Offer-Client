import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
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
} from "@ant-design/icons";
import {
  getStudentDetailsFromID,
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

const eduFieldItems = {
  itemTitle: "Trường",
  dataIDLabel: "school",
  dataName: ["schoolName"],
  disableEndDate: false,
  layout: ["study_fields", "gpa"],
  labelToAPI: {
    itemTitle: "schoolName",
    GPA: "gpa",
    "Ngành học": "study_fields",
    "Ngày bắt đầu": "start_date",
    "Ngày tốt nghiệp": "end_date",
    "Tôi đang học trường này": "is_current",
  },
  APIToLabel: {
    schoolName: "itemTitle",
    gpa: "GPA",
    study_fields: "Ngành học",
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
  dataName: ["companyName"],
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

const StudentIDProfile: NextPage = () => {
  const [studentDetails, setStudentDetails] = useState<Record<
    string,
    any
  > | null>(null);

  const router = useRouter();
  const studentID =
    router?.query?.id && !Array.isArray(router.query.id)
      ? parseInt(router.query.id)
      : 0;

  const getSchoolAndMajorList = async () => {
    const schoolList = await getSchoolList();
    const majorList = await getMajorList();
    return [schoolList, majorList];
  };

  const studentQuery = useQuery({
    queryKey: [`students/${studentID}`],
    queryFn: () => getStudentDetailsFromID(studentID),
    onSuccess: (res) => setStudentDetails(res),
    onError: (err) => console.log(`Error: ${err}`),
  });

  return (
    <main className="split-layout">
      <section className="split-layout-sticky student-profile">
        <AntdCard
          loading={studentQuery.isLoading}
          cover={<img src={profile.cover} />}
          children={
            <div>
              <img className="student-profile-avatar" src={profile.avatar} />
              <div className="student-profile-header">
                <h2>{studentDetails?.name}</h2>
                <span>
                  {studentDetails?.expected_graduation === undefined
                    ? "Ngày không xác định"
                    : new Date(
                        studentDetails?.expected_graduation,
                      ).toDateString()}
                </span>
              </div>
              <div className="student-profile-info">
                {studentDetails?.school?.length === 0 ? (
                  <h4>Trường không xác định</h4>
                ) : (
                  studentDetails?.school?.map(
                    (eachSchool: Record<string, string>) => (
                      <h4>{eachSchool.name}</h4>
                    ),
                  )
                )}
                <h4>{studentDetails?.major ?? "Ngành không xác định"}</h4>
                <h4>Đang tìm kiếm công việc:</h4>
                <h4>{studentDetails?.desired_job ?? "Không xác định"}</h4>
              </div>
            </div>
          }
        />
      </section>
      <section className="split-layout-item flex-md">
        <ResumeCard refetchFunction={studentQuery.refetch} />
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
      <section className="split-layout-sticky"></section>
    </main>
  );
};

export default StudentIDProfile;
