import axios from "axios";
import request from "./apiService";
import { URL_API_ADMIN } from "@config";

export const getCompanyList = async () => {
  const response = await request.get(
    '/companies'
  );
  return response.data;
};

export const getCompany = async (id: number) => {
  const response = await request.get(`/companies/${id}`);
  return response.data.results;
};

export const updateCompany = async (body: any) => {
  const request = axios.create({
    baseURL: URL_API_ADMIN,
    headers: body.token && {
      Authorization: `Bearer ${body.token}`,
    },
  });
  const response = await request.patch(
    `/recruiters/${body.content.account}/`,
    body.content.org,
  );
  return response.data;
};

export const getCompaniesForAdvisor = async (id: number) => {
  const companies = (await request.get(`/companies/`)).data;
  // const companies = [
  //   { name: "VinGroup", desc: "rac" },
  //   { name: "Vinamilk", desc: "rac" },
  //   { name: "VNG", desc: "rac" },
  //   { name: "Garena", desc: "rac" },
  //   { name: "Shoppee", desc: "rac" },
  // ];
  return companies.map((company: any) => ({
    key: "1",
    ID: "2",
    name: company.name,
    description: company.description,
    recruiters: 3,
    unapproved_jobs: 200,
    approved_jobs: 10000,
    student_employees: 20,
    compatibility: "70%",
  }));
};
