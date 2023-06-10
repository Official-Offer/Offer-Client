import request from "./apiService";
import { getCompany } from "./apiCompany";
import { URL_API_ADMIN, TOKEN_BEARER } from 'config/index';

export const getJobList = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  // Fetch company name for each job
  for (const job of jobList) {
    job.company_name = (await getCompany(job.company)).name;
    console.log(job.company_name);
  }
  return jobList;
};

export const getJob = async (id: number) => {
  const response = await request.get(`/jobs/${id}/`);
  const job = response.data;
  job.company_name = (await getCompany(job.company)).name;
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
}

export const checkBookmarked = async (id: number) => {
  const response = await request.get(`/jobs/bookmark/${id}/`);
  return response.data;
}

export const deleteBookmarkedJob = async (id: number) => {
  const response = await request.delete(`/jobs/bookmark/${id}/`);
  return response.data;
}