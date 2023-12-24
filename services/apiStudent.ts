import { getCookie, setCookie } from "cookies-next";
import { getSchool } from "./apiSchool";
import { getCompany } from "./apiCompany";
import request from "./apiService";

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
  console.log("Student details", response);
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
  // console.log(response);
  // const schoolApplicants = ["1", "2", "3", "4"];
  return response.map((student: any) => ({
    key: student.account.id,
    name: student.account.first_name + " " + student.account.last_name,
    email: student.account.email,
    major: "Biology",
    resume: student.active_resume,
    expected_graduation: student.expected_graduation || "2025",
    // transcript: student.transcript,
  }));
};

export const studentLogin = async (body: any) => {
  const response = await request.post(`/students/login/`, body);
  return response.data;
};

// Resume
export const getStudentResume = async () => {
  const response = await request.get(`/students/resume/`);
  return response.data.Response;
};

export const updateStudentResume = async (file: FormData) => {
  const id = getCookie("id");
  const response = await request.patch(`/students/${id}/files/`, file);
  return response.data;
};

export const deleteStudentResume = async (pk: number) => {
  const response = await request.delete(`/students/resume/${pk}`);
  return response.data;
};

// Educations
export const getStudentEducations = async () => {
  const response = await request.get(`/students/educations/`);

  const educations = response.data;
  // If school's id exists, fetch its name
  for (const education of educations) {
    education.schoolName = (await getSchool(education.school)).name;
  }
  return educations;
};

export const editStudentEducation = async (
  id: number,
  input: Record<string, unknown>,
) => {
  const response = await request.put(`/students/educations/${id}/`, input);
  return response.data;
};

export const addStudentEducation = async (input: Record<string, unknown>) => {
  const response = await request.post(`/students/educations/`, input);
  return response.data;
};

export const deleteStudentEducation = async (id: number) => {
  const response = await request.delete(`/students/educations/${id}/`);
  return response.data;
};

// Experiences
export const getStudentExperiences = async () => {
  const response = await request.get(`/students/experiences/`);
  const experiences = response.data;
  // If company's id exists, fetch its name
  for (const experience of experiences) {
    experience.companyName = (await getCompany(experience.company)).name;
  }
  return experiences;
};

export const editStudentExperience = async (
  id: number,
  input: Record<string, unknown>,
) => {
  const response = await request.put(`/students/experiences/${id}/`, input);
  return response.data;
};

export const addStudentExperience = async (input: Record<string, unknown>) => {
  const response = await request.post(`/students/experiences/`, input);
  return response.data;
};

export const deleteStudentExperience = async (id: number) => {
  console.log(id, `/students/experiences/${id}/`);
  const response = await request.delete(`/students/experiences/${id}/`);
  return response.data;
};
