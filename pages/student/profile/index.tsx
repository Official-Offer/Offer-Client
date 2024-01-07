/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { Card as AntdCard, Button } from "antd";
import { BioCard, InfoCard, ProfileCard, ResumeCard } from "@components/card";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  getStudentDetails,
  getStudentResume,
  // getStudentEducations,
  editStudentEducation,
  addStudentEducation,
  deleteStudentEducation,
  // getStudentExperiences,
  editStudentExperience,
  addStudentExperience,
  deleteStudentExperience,
} from "@services/apiStudent";
import { getSchoolList, getMajorList } from "@services/apiSchool";


const eduFieldItems = {
  itemTitle: "Trường",
  queryLabel: "school",
  dataIdMap: ["itemTitle", "majors"],
  // dataName: ["schoolName", "majors"],
  disableEndDate: false,
  layout: ["majors", "gpa"],
  labelToAPI: {
    itemTitle: "schoolName",
    GPA: "gpa",
    "Ngành học": "majors",
    "Ngày bắt đầu": "start_date",
    "Ngày tốt nghiệp": "end_date",
    "Tôi đang học trường này": "is_current",
  },
  APIToLabel: {
    schoolName: "Trường",
    gpa: "GPA",
    majors: "Ngành học",
    start_date: "Ngày bắt đầu",
    end_date: "Ngày tốt nghiệp",
    is_current: "Tôi đang học trường này",
  },
  itemType: {
    itemTitle: "object",
    majors: "object-multi",
    gpa: "number",
  },
  isRequired: {
    schoolName: true,
  },
};

const expFieldItems = {
  itemTitle: "Vị Trí",
  queryLabel: "company",
  dataIdMap: ["companyName", "skills"],
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
  const [studentDetails, setStudentDetails] = useState<Record<
    string,
    any
  >>({});
  const id = getCookie("id");
  const studentQuery = useQuery({
    queryKey: [`students/${id}`],
    queryFn: getStudentDetails,
    onSuccess: (res) => {
      setStudentDetails(res);
    },
    onError: (err) => console.log(`Error: ${err}`),
    refetchOnWindowFocus: false,
  });

  const resumeQuery = useQuery({
    queryKey: [`students/${id}/resumes`],
    queryFn: getStudentResume,
    onSuccess: (res) => {
      setStudentDetails((studentDetails) => ({ ...studentDetails, resumes: res }));
    },
    onError: (err) => console.log(`Error: ${err}`),
    enabled: false,
  });

  const getSchoolAndMajorList = async () => {
    const schoolList = await getSchoolList();
    const majorList = await getMajorList();
    return [schoolList, majorList];
  };

  return (
    <main className="split-layout">
      <section className="split-layout-sticky student-bio split-layout-item flex-sm">
        <BioCard data={studentDetails} isLoading={studentQuery.isLoading} />
      </section>
      <section className="split-layout-item flex-md">
        <ResumeCard
          isEditable
          resumes={studentDetails?.resumes}
          isError={studentQuery.isError || resumeQuery.isError}
          isLoading={studentQuery.isLoading}
          isRefetching={resumeQuery.isRefetching}
          refetchFunction={resumeQuery.refetch}
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
      <section className="split-layout-sticky flex-sm student-bio">
        <AntdCard>
          <h3>Advisor</h3>
        </AntdCard>
      </section>
    </main>
  );
};

export default StudentProfile;
