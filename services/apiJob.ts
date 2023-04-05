import api from "./apiService";
import { URL_API_ADMIN, TOKEN_BEARER } from 'config/index';

export const getJobList = () => api.get("/jobs").then((response) => response.data);
