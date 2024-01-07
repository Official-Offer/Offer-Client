import { getCookie, setCookie } from "cookies-next";
import { getSchool } from "./apiSchool";
import { getCompany } from "./apiCompany";
import request from "./apiService";
import { majorDict } from "@public/static/list/majorList";

// Auth
export const registerStudent = async (body: any) => {
  const response = await request.post(`/students/register/`, body);
  return response.data;
};

export const updateStudent = async (body: any) => {
  const response = await request.put(`/students/me/`, body);
  return response.data;
};

export const getStudentDetails = async () => {
  const id = getCookie("id");
  const response = (await request.get(`/students/${id}/`)).data;
  return response;
};

export const getStudentDetailsFromID = async (id: number) => {
  const response = (await request.get(`/students/${id}/`)).data;
  return response;
};

export const getApplicantsFromJobs = async (id: number) => {
  const jobs = (await request.get(`/jobs/${id}`)).data;
  const studentList: any[] = [];
  for (const applicant_id of jobs.applicants) {
    const student = (await request.get(`/students/${applicant_id}`)).data;
    studentList.push({
      key: student.user.id,
      ID: student.user.id,
      name: student.name || "No name",
      school: student.default_school?.name || "No School",
      major: student.major,
      expected_graduation: student.expected_graduation,
      compatibility: "80%",
      tag: "Vòng đơn",
    });
  }
  return studentList;
};

export const getStudentsFromSchool = async (school: any) => {
  const response = (
    await request.get(`/students/`, {
      params: {
        page_size: 1000,
        school,
      },
    })
  ).data.results;
  // map majorList to a dict with id: {name, industries}
  return response.map((student: any) => ({
    key: student.account.id,
    name: student.account.first_name + " " + student.account.last_name,
    email: student.account.email,
    major: student.majors.map((major: any) => (majorDict as Record<string, { name: string; industries: never[] }>)[major].name).join(", "), //wtf copilot so smart
    resume: student.active_resume?.resume,
    expected_graduation: student.expected_graduation_date || "N/A",
  }));
};

export const studentLogin = async (body: any) => {
  const response = await request.post(`/students/login/`, body);
  return response.data;
};

// Resume
export const getStudentResume = async () => {
  const response = await request.get(`/students/resume/`);
  return response.data;
};

export const addStudentResume = async (input: any) => {
  const response = await request.post(`/students/resume/`, input);
  return response.data;
};

export const updateStudentActiveResume = async (id: number) => {
  const formData = new FormData();
  formData.append("is_active", "true");
  const response = await request.patch(`/students/resume/${id}/`, formData);
  return response.data;
};

export const deleteStudentResume = async (id: number) => {
  const response = await request.delete(`/students/resume/${id}/`);
  return response.data;
};

// Educations
// export const getStudentEducations = async (id: number) => {
//   const response = await request.get(`/students/education/${id}/`);
//   return response.data;
// };

export const editStudentEducation = async (
  id: number,
  input: Record<string, unknown>,
) => {
  const response = await request.patch(`/students/education/${id}/`, input);
  return response.data;
};

export const addStudentEducation = async (input: Record<string, unknown>) => {
  const response = await request.post(`/students/education/`, input);
  return response.data;
};

export const deleteStudentEducation = async (id: number) => {
  const response = await request.delete(`/students/education/${id}/`);
  return response.data;
};

// Experiences
// export const getStudentExperiences = async (id: number) => {
//   const response = await request.get(`/students/experiences/`);
//   const experiences = response.data;
//   // If company's id exists, fetch its name
//   for (const experience of experiences) {
//     experience.companyName = (await getCompany(experience.company)).name;
//   }
//   return experiences;
// };

export const editStudentExperience = async (
  id: number,
  input: Record<string, unknown>,
) => {
  const response = await request.patch(`/students/experience/${id}/`, input);
  return response.data;
};

export const addStudentExperience = async (input: Record<string, unknown>) => {
  const response = await request.post(`/students/experience/`, input);
  return response.data;
};

export const deleteStudentExperience = async (id: number) => {
  const response = await request.delete(`/students/experience/${id}/`);
  return response.data;
};

export const postContactEmail = async(email: string)=>{
  const response = await request.post(`/contacts/email/`, {email});
  return response.data;
}