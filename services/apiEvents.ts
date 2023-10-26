import request from "./apiService";
import { formatDate } from "@utils/formatters";

export const getAdvisorEvents = async () => {
  const response = await request.get(`/events/`);
  const eventList = response.data;
  const companies = [
    // "Chưa tạo danh sách",
    "VinAI",
    "FB",
    "Amz"
  ];
  const tags = [
    // "Chưa tạo danh sách",
    "Peding",
    "unapproved",
    "approved"
  ];
  var res = [];
  for (const event of eventList) {
    res.push({
      key: event.id,
      ID: event.id,
      posted_date: formatDate(event.timestamp, "D/M/YYYY"),
      title: event.title || "Không tìm thấy",
      company: companies[Math.floor(Math.random()*companies.length)],
      no_attendants: 10,
      compatibility: "70%",
      tag: tags[Math.floor(Math.random()*tags.length)],
    });
  }
  return res;
};

export const getRecruiterEvents = async () => {
  const response = await request.get(`/events/`);
  const eventList = response.data;
  const schools = [
    // "Chưa tạo danh sách",
    "VinUni",
    "FBUni",
    "UMass"
  ];
  const tags = [
    // "Chưa tạo danh sách",
    "Peding",
    "unapproved",
    "approved"
  ];
  var res = [];
  for (const event of eventList) {
    res.push({
      key: event.id,
      ID: event.id,
      posted_date: formatDate(event.timestamp, "D/M/YYYY"),
      title: event.title || "Không tìm thấy",
      school: schools[Math.floor(Math.random()*schools.length)],
      no_attendants: 10,
      compatibility: "70%",
      tag: tags[Math.floor(Math.random()*tags.length)],
    });
  }
  return res;
};

