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

export const getRecruitersForSchool = async () => {
  const response = await request.get(`/recruiters/`);
  const recruiterList = response.data;
  var res = [];
  for (const recruiter of recruiterList) {
    res.push({
      key: recruiter.id,
      ID: recruiter.id,
      name: recruiter.name,
      company: recruiter.company,
      role: "chief",
      jobs_posted: 10,
      email: "ktto@umass.edu",
      contacted: "Đã liên hệ",
    });
  }
  return res;
};

export const getRecruitersForCompany = async () => {
  const response = await request.get(`/recruiters/`);
  const recruiterList = response.data;
  var res = [];
  for (const recruiter of recruiterList) {
    res.push({
      key: recruiter.id,
      ID: recruiter.id,
      name: recruiter.name,
      role: "chief",
      email_verified: true,
      role_verified: true,
      jobs_posted: 15
    });
  }
  return res;
};