import { setCookie } from "cookies-next";
import { getSchool } from "./apiSchool";
import { getJob } from "./apiJob"; 
import request from "./apiService";

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
  response.school &&= (await getSchool(response.school)).name; // If school's id exists, fetch its name
  response.desired_job &&= (await getJob(response.desired_job)).title; // If job's id exists, fetch its name
  return response;
};

export const studentLogin = async (body: any) => {
  const response = await request.post(`/students/login/`, body);
  return response.data;
};

export const getStudentResume = async () => {
  const response = await request.get(`/students/resume/`);
  return response.data;
};

export const updateStudentResume = async (file: FormData) => {
  const response = await request.post(`/students/resume/`, file);
  return response.data;
};
