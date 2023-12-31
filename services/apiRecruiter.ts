import { getCookie, setCookie } from "cookies-next";
import request from "./apiService";
import { formatDate } from "@utils/formatters/numberFormat";

export const registerRecruiter = async (body: any) => {
  const response = await request.post(`/recruiters/register/`, body);
  return response.data;
};

export const updateRecruiter = async (body: any) => {
  const id = getCookie("id");
  const response = await request.patch(`/recruiters/${id}/`, body);
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
  const role = getCookie("role");
  const res = await request.get(`/jobs/${role}/${id}/`);
  const response = await request.get(`/job-applications/?job=${id}`);
  const applicantList = response.data.results;
  console.log("applicantList", applicantList);
  return {
    job: res.data.title,
    applicants: applicantList.map((app: any) => ({
      // key: app.id,
      // ID: app.id,
      // name: app.name,
      // school: app.school,
      // job: app.job,
      // resume: app.resume,
      // compatibility: app.compatibility,
      key: app.id,
      applied_at: formatDate(app.created_at, "D/M/YYYY"),
      name: app.student.account.first_name + " " + app.student.account.last_name,
      school: app.student.school || "Không tìm thấy",
      job: app.job.title || "Không tìm thấy",
      resume: app.resume,
    })),
  };
};

