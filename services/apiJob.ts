import request from "./apiService";
import { getCompany } from "./apiCompany";
// import { URL_API_ADMIN, TOKEN_BEARER } from "config/index";
import { OpenAI } from "langchain/llms/openai";
import { formatDate } from "@utils/formatters";
import moment from "moment";

export const getJobs = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  return jobList;
};

export const generateJobDescription = async (inputDescription: any) => {
  const apiKey = "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"; // Replace with your OpenAI API key
  const prompt = `
    Lấy những thông tin sau và trả kết quả ở dạng JSON với 
    những trường sau đây: salary (string), level (Thực tập//Nhân viên chính thức), 
    requirements (string), benefits (string), location (string), 
    type (Full-time, Part-time), majors (most related majors), requiredExperience (Ít hơn 1 năm, 1-3 năm, Hơn 3 năm), howTo (cách ứng tuyển)
    Hãy chỉnh sữa format chữ sao cho chữ đầu luôn được viết hoa và tất cả chữ khác được viết đúng tiêu chuẩn cho tất cả các trường trong JSON.
    Đoạn thông tin cần được chỉnh sửa được đặt ở sau đây: 
    ${inputDescription}
  `;
  console.log(prompt)
  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: apiKey,
  });

  try {
    const response = await llm.call(prompt);
    console.log(response)
    return response;
  } catch (error: any) {
    console.error("Error generating job description:", error.message);
    throw error;
  }
};

export const getUnapprovedJobs = async () => {
  // const response = await request.get(`/jobs/`);
  const jobList = ["1", "2", "3", "4"];
  const jobID = ["1", "2", "3", "4"];
  const companies = [
    // "Chưa tạo danh sách",
    "VinAI",
    "FB",
    "Amz",
  ];
  const recruiters = [
    // "Chưa tạo danh sách",
    "vvnguyen@umass.edu",
    "ktto@umass.edu",
    "hto@umass.edu",
  ];
  const title = ["SWE Intern", "Sales Intern", "SWE Full-time"];
  return jobList.map((job: any) => ({
    key: job,
    // ID: jobID[Math.floor(Math.random() * jobID.length)],
    posted_date: moment(job.timestamp).format("DD/MM/YYYY") || "09/05/2002",
    title: title[Math.floor(Math.random() * title.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    recruiter: recruiters[Math.floor(Math.random() * recruiters.length)],
    // expected: 5,
    reputation: "70% (cao)",
    compatibility: "70%",
    // tag: tags[Math.floor(Math.random()*tags.length)],
  }));
};

export const getJobsForRecruiter = async () => {
  const response = await request.get(`/jobs/`);
  const jobs = response.data;
  const jobList = [
    {
      timestamp: "",
      title: "SWE Intern",
    },
    {
      timestamp: "",
      title: "Sales Intern",
    },
  ];
  const unapprovedSchools = ["Vin Uni", "UMass", "MIT"];
  const unapprovedSchoolString = unapprovedSchools.reduce((acc, cur, index) => {
    if (index < 2) {
      if (index == unapprovedSchools.length - 1) {
        return acc + cur;
      }
      return acc + cur + ", ";
    } else if (index == 2) {
      if (index == unapprovedSchools.length - 1) {
        return acc + cur;
      }
      return acc + cur + "..." + "(" + unapprovedSchools.length + ") ";
    } else {
      return acc + "";
    }
  }, "");
  const approvedSchools = [
    "Amherst",
    "Harvard",
    "Bach Khoa",
    "NEU",
    "FTU",
    "UMass",
  ];
  const approvedSchoolString = approvedSchools.reduce((acc, cur, index) => {
    if (index < 2) {
      if (index == approvedSchools.length - 1) {
        return acc + cur;
      }
      return acc + cur + ", ";
    } else if (index == 2) {
      if (index == approvedSchools.length - 1) {
        return acc + cur;
      }
      return acc + cur + "..." + "(" + approvedSchools.length + ") ";
    } else {
      return acc + "";
    }
  }, "");
  const res = jobs.map((job: any) => ({
    key: job,
    // ID: job.id,
    posted_date: moment(job.created_at).format("DD/MM/YYYY"),
    title: job.title || "Không tìm thấy",
    // unapproved_schools: unapprovedSchoolString,
    // approved_schools: approvedSchoolString,
    applicants: 20,
  }));
  return res;
};

export const getApprovedJobs = async () => {
  // const response = await request.get(`/jobs/`);
  // const jobList = response.data;
  const jobList = ["1", "2", "3", "4"];
  const companies = [
    "VinAI",
    "FB",
    "Amz",
  ];
  const recruiters = [
    "vvnguyen@umass.edu",
    "ktto@umass.edu",
    "hto@umass.edu",
  ];
  return jobList.map((job: any) => ({
    key: job,
    posted_date: formatDate(job.timestamp, "D/M/YYYY") || "09/05/2002",
    title: job.title || "Không tìm thấy",
    company: companies[Math.floor(Math.random() * companies.length)],
    recruiter: recruiters[Math.floor(Math.random() * recruiters.length)],
    applicants: "3 (tổng 100)",
  }));
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
  console.log("what")
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

export const bookmarkJob = async (id: number | string) => {
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

export const unbookmarkJob = async (id: number | string) => {
  const response = await request.delete(`/jobs/bookmark/${id}/`);
  return response.data;
};

export const deleteJob = async (id: any) => {
  console.log("job deleted");
  const response = await request.delete(`/jobs/`, id);
  return response.data;
};

const majorList = [
  "Ngành Khoa học máy tính",
  "Ngành Kinh tế",
  "Ngành Quản lý",
  "Ngành Luật",
  "Ngành Y học",
  "Ngành Kỹ thuật điện tử",
  "Ngành Nghệ thuật",
  "Ngành Khoa học môi trường",
  "Ngành Ngôn ngữ học",
  "Ngành Toán học",
  "Ngành Thông tin - truyền thông",
  "Ngành Kỹ thuật xây dựng",
  "Ngành Khoa học xã hội",
  "Ngành Quản trị kinh doanh",
  "Ngành Quản lý công nghiệp",
  "Ngành Thú y",
  "Ngành Kiến trúc",
  "Ngành Công nghệ thực phẩm",
  "Ngành Quan hệ quốc tế",
  "Ngành Quản lý tài chính",
  "Ngành Khoa học nông nghiệp",
  "Ngành Quản trị nhân lực",
  "Ngành Quản trị dự án",
  "Ngành Ngôn ngữ và văn hóa",
  "Ngành Điện tử - Viễn thông",
  "Ngành Kỹ thuật máy tính",
  "Ngành Khoa học đất",
  "Ngành Nghệ thuật biểu diễn",
  "Ngành Y học cổ truyền",
  "Ngành Khoa học thể thao",
  "Ngành Nghiên cứu thị trường",
  "Ngành Kỹ thuật môi trường",
  "Ngành Quản lý khách sạn",
  "Ngành Báo chí và truyền hình",
  "Ngành Thiết kế đồ họa",
  "Ngành Điện tử - Viễn thông",
  "Ngành Quản trị nhà hàng",
  "Ngành Kỹ thuật xây dựng",
  "Ngành Quản lý dự án",
  "Ngành Thương mại",
  "Ngành Quản lý chuỗi cung ứng",
  "Ngành Khoa học dữ liệu",
  "Ngành Công nghệ thông tin",
  "Ngành Kỹ thuật điện",
  "Ngành Kỹ thuật cơ khí",
  "Ngành Quản trị văn phòng",
  "Ngành Tài chính - Ngân hàng",
  "Ngành Marketing",
  "Ngành Kỹ thuật hóa học",
  "Ngành Kỹ thuật công nghiệp"
];