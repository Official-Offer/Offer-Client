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

export const advisorLogin = async (body: any) => {
  const response = await request.post(`/advisors/login/`, body);
  return response.data;
};
