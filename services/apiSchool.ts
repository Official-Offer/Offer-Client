import { URL_API_ADMIN } from '@config';
import request from './apiService'
import axios from 'axios';

export const getSchoolList = async () => {
  const response = await request.get(`/schools/`);
  return response.data;
}

export const getSchool = async (id: number) => {
  const response = await request.get(`/schools/${id}/`);
  return response.data.message; // For some reasons the data is in the message field
}

export const updateEducation = async (body: any) => {
  const request = axios.create({
    baseURL: URL_API_ADMIN,
    headers: body.token &&
        {
          Authorization: `Bearer ${body.token}`,
        },
  });
  const response = await request.post(`/students/educations/`, body.content);
  return response.data;
}


export const getSchoolsForRecruiter = async (id: number) => {
  // const response = (await request.get(`/schools/`)).data;
  const schools = [
    { name: "Bach Khoa", desc: "trường đại học kỹ thuật" },
    { name: "Ngoai Thuong", desc: "trường đại học kỹ thuật" },
    { name: "Kinh Te Quoc Dan", desc: "trường đại học kỹ thuật" },
    { name: "UMass", desc: "trường đại học kỹ thuật" },
    { name: "HSGS", desc: "trường đại học kỹ thuật" },
  ];
  return schools.map((school)=>({
    key: "1",
    ID: "1",
    name: school.name,
    description: school.desc,
    advisors: 200,
    no_students: 10000,
    students_applicants: 2000,
    unapproved_jobs: 100,
    approved_jobs: 150,
    compatibility: "60%",
  }));
}

