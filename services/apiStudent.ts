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
  response.school &&= await Promise.all(response.school.map(async (id) => (await getSchool(id)).title)); // If school's id exists, fetch its name
  return response;
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

export const editStudentEducation = async (id: number, input: Record<string, unknown>) => {
  const response = await request.put(`/students/educations/${id}`, input);
  return response.data;
};

export const addStudentEducations = async (input: Record<string, unknown>) => {
  const response = await request.post(`/students/educations/`, input);
  return response.data;
};

export const deleteStudentEducations = async (input: Record<string, unknown>) => {
  const response = await request.delete(`/students/educations/`, input);
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
}

export const editStudentExperience = async (id: number, input: Record<string, unknown>) => {
  const response = await request.put(`/students/experiences/${id}`, input);
  return response.data;
}

export const addStudentExperiences = async (input: Record<string, unknown>) => {
  const response = await request.post(`/students/experiences/`, input);
  return response.data;
}

export const deleteStudentExperiences = async (input: Record<string, unknown>) => {
  const response = await request.delete(`/students/experiences/`, input);
  return response.data;
}