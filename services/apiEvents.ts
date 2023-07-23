import request from "./apiService";
import { getCompany } from "./apiCompany";
import { URL_API_ADMIN, TOKEN_BEARER } from "config/index";
import moment from "moment";

export const getEventsAdvisors = async () => {
  const response = await request.get(`/events/`);
  const jobList = response.data;
  const companies = [
    // "Chưa tạo danh sách",
    "VinAI",
    "FB",
    "Amz"
  ];
  const tags = [
    // "Chưa tạo danh sách",
    "Đang tạo danh sách",
    "bao deng",
    "ktwo"
  ];
  // Fetch company name for each job
  var res = [];
  for (const job of jobList) {
    res.push({
      key: job.id,
      ID: job.id,
      posted_date: moment(job.timestamp).format("D/M/YYYY"),
      title: job.title || "Không tìm thấy",
      company: companies[Math.floor(Math.random()*companies.length)],
      compatibility: "70%",
      tag: tags[Math.floor(Math.random()*tags.length)],
    });
  }
};

