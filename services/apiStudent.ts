import { setCookie } from "cookies-next";
import { getSchool } from "./apiSchool";
import { getCompany } from "./apiCompany";
import { getJob } from "./apiJob";
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
  const response = (await request.get(`/students/me/`)).data.Response;
  // If school's id exists, fetch its name
  return response;
};

export const getApplicants = async (id: number) => {
  const response = (await request.get(`/jobs/${id}`));
  const studentList: any[] = [];
  response.data.applicants.forEach(async (applicant_id: string) => {
    const student = (await request.get(`/students/${applicant_id}`));
    studentList.push(student);
  });
  return studentList;
};

export const studentLogin = async (body: any) => {
  const response = await request.post(`/students/login/`, body);
  return response.data;
};

// Resume
export const getStudentResume = async () => {
  console.log("resume called");
  const response = await request.get(`/students/resume/`);
  return response.data.Response;
};

export const updateStudentResume = async (file: FormData) => {
  const response = await request.post(`/students/resume/`, file);
  return response.data;
};

export const deleteStudentResume = async () => {
  const response = await request.delete(`/students/resume/`);
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
  input: Record<string, unknown>
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
  input: Record<string, unknown>
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
