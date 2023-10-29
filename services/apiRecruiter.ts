import { getCookie, setCookie } from "cookies-next";
import request from "./apiService";

export const registerRecruiter = async (body: any) => {
  const response = await request.post(`/recruiters/register/`, body);
  return response.data;
};

export const updateRecruiter = async (body: any) => {
  const response = await request.put(`/recruiters/me/`, body);
  return response.data;
};

export const getRecruiter = async () => {
  const id = getCookie("id");
  const response = (await request.get(`/recruiters/${id}/`)).data;
  return response;
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
      jobs_posted: 15,
    });
  }
  return res;
};

export const getApplicantsForJob = async (id: any) => {
  const response = await request.get(`/jobs/${id}/applications/`);
  const applicantList = response.data.message;

  const applicants = [
    {
      name: "Kien",
      school: "Umass",
      job: "Ke Toan",
      resume: "resume_link",
      compatibility: "90%",
    },
    {
      name: "Thuan",
      school: "AT&T",
      job: "Dev",
      resume: "resume_link",
      compatibility: "10%",
    },
    {
      name: "Bao Dang",
      school: "Umass",
      job: "FE Dev",
      resume: "resume_link",
      compatibility: "40%",
    },
  ];
  // return applicants.map((app) => ({
  //   name: app.name,
  //   school: app.school,
  //   job: app.job,
  //   resume: app.resume,
  //   compatibility: app.compatibility,
  // }));
  console.log(applicantList);
  return applicantList.map((app: any) => ({
    key: app.id,
    applied_at: app.created_at,
    name: app.student,
    school: app.student.school,
    job: app.job.title,
    resume: app.resume,
    // compatibility: app.compatibility,
  }));
};