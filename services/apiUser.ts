import { setCookie } from "cookies-next";
import request from "./apiService";

export const registerUser = async (body: any) => {
  const response = await request.post(`/accounts/register/`, body);
  return response.data;
};

export const getUserList = async () => {
  const response = await request.get(`/accounts/list/users/`);
  return response.data;
};

export const getUserDetails = async (userId: any) => {
  const response = await request.get(`/accounts/me/`);
  return response.data;
};

export const userLogIn = async (body: any) => {
  const response = await request.post(`/accounts/login/`, body);
  return response.data;
};

export const socialLogIn = async (body: any) => {
  const response = await request.get(`/accounts/auth/google/${body}`);
  return response.data;
};

export const userLogOut = async () => {
  const response = await request.post(`/accounts/logout/`);
  return response.data;
};

export const verifyEmail = async (otp: any) => {
  const response = await request.post(`/accounts/verifyEmail/`, {
    otp,
  });
  return response.data;
};

export const updateUser = async (body: any) => {
  const response = await request.delete(`/accounts/me/`, body);
  return response.data;
};

export const forgetPassword = async (body: any) => {
  const response = await request.post(`/accounts/forgot_password/`, body);
  return response.data;
};

export const resetPassword = async (body: any) => {
  const response = await request.put(`/accounts/reset_password/`, body);
  return response.data;
};

export const changePassword = async (body: Record<string, string> | void) => {
  const response = await request.put(`/accounts/change_password/`, body);
  return response.data;
};

export const getOrgList = async () => {
  const schools = (await request.get(`/schools/`)).data;
  const companies = (await request.get(`/companies/`)).data;
  return {
    schools,
    companies,
  };
};
