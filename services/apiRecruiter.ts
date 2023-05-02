import { setCookie } from "cookies-next";
import request from "./apiService";

export const registerRecruiter = async (body: any) => {
  const response = await request.post(`/recruiters/register/`, body);
  return response.data;
};

export const updateRecruiter = async (body: any) => {
  const response = await request.put(`/recruiters/me/`, body);
  return response.data;
};

export const getRecruiterDetails = async () => {
  const response = await request.get(`/recruiters/me/`);
  return response.data.Response;
};

export const recruiterLogin = async (body: any) => {
  const response = await request.post(`/recruiters/login/`, body);
  return response.data;
};
