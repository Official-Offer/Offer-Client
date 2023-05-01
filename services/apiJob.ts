import request from "./apiService";
import { URL_API_ADMIN, TOKEN_BEARER } from 'config/index';

export const getJobList = async () => {
  const response = await request.get(`/jobs/`);
  return response.data;
};

export const getJob = async (id: number) => {
  const response = await request.get(`/jobs/${id}/`);
  return response.data;
};
