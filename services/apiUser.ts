import { setCookie } from "cookies-next";
import request from "./apiService";
import axios from "axios";
import { URL_API_ADMIN } from "@config";

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

export const socialAuth = async (body: any) => {
  const request = axios.create({
    baseURL: URL_API_ADMIN,
  });
  const response = await request.post(`/accounts/google/`, body);
  return response.data;
};

export const userLogOut = async () => {
  const response = await request.post(`/accounts/logout/`);
  return response.data;
};

export const verifyEmail = async (body: any) => {
  const response = await request.post(`/accounts/verify_email/`, body);
  return response.data;
};

export const resendEmail = async (body: any) => {
  const response = await request.post(`/accounts/resend_otp`);
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
    companies: companies.results,
  };
};

export const contact = async (body: any) => {
  const response = await request.post(`/contacts/`, body);
  return response.data;
}

// export const setRoleAndOrg = async (body: any) => {
//   const response = await request.put(`/accounts/change_role/`, body);
//   return response.data;
// }

export const setRoleAndOrgToken = async (body: any) => {
  console.log(body)
  const request = axios.create({
    baseURL: URL_API_ADMIN,
    headers: body.token && {
      Authorization: `Bearer ${body.token}`,
    },
  });
  const response = await request.put(`/accounts/change_role_org/`, body.content);
  return response.data;
};