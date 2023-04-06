import { setCookie } from "cookies-next";
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
  const response = await request.get(`/students/me/`);
  return response.data;
};

export const studentLogIn = async (body: any) => {
  const response = await request.post(`/students/login`, body);
  return response.data;
};
