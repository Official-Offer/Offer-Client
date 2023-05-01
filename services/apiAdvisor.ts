import { setCookie } from "cookies-next";
import request from "./apiService";

export const registerAdvisor = async (body: any) => {
  const response = await request.post(`/advisors/register/`, body);
  return response.data;
};

export const updateAdvisor = async (body: any) => {
  const response = await request.put(`/advisors/me/`, body);
  return response.data;
};

export const getAdvisorDetails = async () => {
  const response = await request.get(`/advisors/me/`);
  return response.data.Response;
};

export const advisorLogin = async (body: any) => {
  const response = await request.post(`/advisors/login/`, body);
  return response.data;
};
