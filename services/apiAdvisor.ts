import { setCookie } from "cookies-next";
import request from "./apiService";
import axios from "axios";
import { URL_API_ADMIN } from "@config";

export const registerAdvisor = async (body: any) => {
  const response = await request.post(`/advisors/register/`, body);
  return response.data;
};

export const updateSchoolForAdvisor = async (body: any) => {
  const request = axios.create({
    baseURL: URL_API_ADMIN,
    headers: body.token &&
        {
          Authorization: `Bearer ${body.token}`,
        },
  });
  const response = await request.patch(`/advisors/${body.content.account}/`, body.content.org);
  return response.data;
}

export const updateAdvisor = async (body: any) => {
  const response = await request.put(`/advisors/me/`, body);
  return response.data;
};

export const getAdvisorDetails = async () => {
  const response = await request.get(`/advisors/me/`);
  return response.data.Response;
};

export const getAdvisorsForSchool = async () => {
  const response = await request.get(`/advisors/`);
  const advisorList = response.data;
  var res = [];
  for (const advisor of advisorList) {
    res.push({
      key: advisor.id,
      ID: advisor.id,
      name: advisor.name,
      role: "chief",
      email_verified: false,
      role_verified: true,
      managed_students: ["stud1", "stud2"],
    });
  }
  return res;
};

export const getAdvisorsForCompany = async () => {
  const response = await request.get(`/advisors/`);
  const advisorList = response.data;
  var res = [];
  for (const advisor of advisorList) {
    res.push({
      key: advisor.id,
      ID: advisor.id,
      name: advisor.name,
      school: advisor.school,
      role: "chief",
      email: "lklkl@garena.com",
      contacted: "Đã liên lạc",
    });
  }
  return res;
};

export const advisorLogin = async (body: any) => {
  const response = await request.post(`/advisors/login/`, body);
  return response.data;
};
