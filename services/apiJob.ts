import request from "./apiService";
import { getCompany } from "./apiCompany";
import { URL_API_ADMIN, TOKEN_BEARER } from "config/index";
import moment from "moment";

export const getJobList = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  // Fetch company name for each job
  for (const job of jobList) {
    job.company_data = await getCompany(job.company);
    job.is_bookmarked = (await checkIsBookmarked(job.id).catch(() => ({status: false}))).status;
  }
  return jobList;
};

export const getJobs = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  // Fetch company name for each job
  // for (const job of jobList) {
  //   job.company_name = (await getCompany(job.company)).name;
  //   job.is_bookmarked = (await checkIsBookmarked(job.id)).status;
  // }
  return jobList;
};

export const getUnapprovedJobs = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  const tags = [
    // "Chưa tạo danh sách",
    "Chưa tuyển",
    "Đã tuyển",
  ];
  // Fetch company name for each job
  var res = [];
  for (const job of jobList) {
    res.push({
      key: job.id,
      ID: job.id,
      date: moment(job.timestamp).format("D/M/YYYY"),
      title: job.title || "Không tìm thấy",
      address: job.location || "Không tìm thấy",
      schools: job.schools.length || "Không tìm thấy",
      applicants: job.applicants.length,
      tag: tags[Math.floor(Math.random()*tags.length)],
    });
  }
  return res;
};

export const approvedJobsAdvisors = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  // Fetch company name for each job
  var res = [];
  for (const job of jobList) {
    res.push({
      key: job.id,
      ID: job.id,
      date: moment(job.timestamp).format("D/M/YYYY"),
      title: job.title || "Không tìm thấy",
      address: job.location || "Không tìm thấy",
      company: job.company|| "Không tìm thấy",
      applicants: "5/100",
      accepted: "1/2"
    });
  }
  return res;
};

export const getJobListWithApplicant = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  // Fetch company name for each job
  for (const job of jobList) {
    // job.applicants.append(await getStudentDetails());
    // job.is_bookmarked = (await checkIsBookmarked(job.id)).status;
  }
  return jobList;
};

export const getJob = async (id: number) => {
  const response = await request.get(`/jobs/${id}/`);
  const job = response.data;
  job.company_data = await getCompany(job.company);
  return job;
};

export const getBookmarkedList = async () => {
  const response = await request.get(`/jobs/bookmark/`);
  const bookmarkedList = response.data;
  // Fetch job info for each bookmarked job
  for (const job of bookmarkedList) {
    job.job_info = await getJob(job.job_id);
  }
  return bookmarkedList;
};

export const checkIsBookmarked = async (id: number) => {
  const response = await request.get(`/jobs/bookmark/${id}/`);
  return response.data;
};

export const bookmarkJob = async (id: number) => {
  const response = await request.post(`/jobs/bookmark/`, {
    job_id: id,
    created_by: 0,
  });
  return response.data;
};

export const postJob = async (body: any) => {
  console.log("job posted");
  const response = await request.post(`/jobs/`, body);
  return response.data;
};

export const deleteJob = async (id: any) => {
  console.log ("job deleted");
  const response = await request.delete(`/jobs/`, id);
  return response.data;
};

export const deleteBookmarkedJob = async (id: number) => {
  const response = await request.delete(`/jobs/bookmark/${id}/`);
  return response.data;
};
