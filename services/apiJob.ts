import request from "./apiService";
import { getCompany } from "./apiCompany";
// import { URL_API_ADMIN, TOKEN_BEARER } from "config/index";
import moment from "moment";
import { OpenAI } from "langchain/llms/openai";

export const getJobList = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  // Fetch company name for each job
  for (const job of jobList) {
    job.company_data = await getCompany(job.company);
    // job.is_bookmarked = (await checkIsBookmarked(job.id).catch(() => ({status: false}))).status;
  }
  return jobList;
};

export const getJobs = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  return jobList;
};

export const generateJobDescription = async (inputDescription: any) => {
  const apiKey = "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"; // Replace with your OpenAI API key
  const prompt = `Lấy những thông tin sau và trả kết quả ở dạng JSON với 
  những trường sau đây: salary (string), level (thực tập//nhân viên chính thức), 
  requirements (string), benefits (string), location (string), 
  type (full-time, part-time), requiredExperience (ít hơn 1 năm, 1-3 năm, hơn 3 năm) từ đoạn miêu tả sau đây: ${inputDescription}`;

  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: apiKey,
  });

  try {
    const response = await llm.call(prompt);
    return response;
  } catch (error) {
    console.error("Error generating job description:", error.message);
    throw error;
  }
};

export const getUnapprovedJobs = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  const companies = [
    // "Chưa tạo danh sách",
    "VinAI",
    "FB",
    "Amz",
  ];
  const recruiters = [
    // "Chưa tạo danh sách",
    "thuan cho",
    "bao deng",
    "ktwo",
  ];
  // Fetch company name for each job
  var res = [];
  for (const job of jobList) {
    res.push({
      key: job.id,
      ID: job.id,
      posted_date: moment(job.timestamp).format("D/M/YYYY"),
      title: job.title || "Không tìm thấy",
      company: companies[Math.floor(Math.random() * companies.length)],
      recruiter: recruiters[Math.floor(Math.random() * recruiters.length)],
      expected: 5,
      compatibility: "70%",
      // tag: tags[Math.floor(Math.random()*tags.length)],
    });
  }
  return res;
};

export const getJobsForRecruiter = async () => {
  // const response = await request.get(`/jobs/`);
  // const jobList = response.data;
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
  const res = jobList.map((job: any) => ({
    // key: job.id,
    // ID: job.id,
    posted_date: moment(job.timestamp).format("D/M/YYYY"),
    title: job.title || "Không tìm thấy",
    unapproved_schools: unapprovedSchoolString,
    approved_schools: approvedSchoolString,
    applicants: 20,
  }));
  return res;
};

export const getApprovedJobs = async () => {
  const response = await request.get(`/jobs/`);
  const jobList = response.data;
  const companies = [
    // "Chưa tạo danh sách",
    "VinAI",
    "FB",
    "Amz",
  ];
  const recruiters = [
    // "Chưa tạo danh sách",
    "thuan cho",
    "bao deng",
    "ktwo",
  ];
  // Fetch company name for each job
  var res = [];
  for (const job of jobList) {
    res.push({
      key: job.id,
      ID: job.id,
      posted_date: moment(job.timestamp).format("D/M/YYYY"),
      title: job.title || "Không tìm thấy",
      company: companies[Math.floor(Math.random() * companies.length)],
      recruiter: recruiters[Math.floor(Math.random() * recruiters.length)],
      applicants: "2/100",
      expected: 5,
      accepted: "1/2",
      // tag: tags[Math.floor(Math.random()*tags.length)],
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

export const unbookmarkJob = async (id: number) => {
  const response = await request.delete(`/jobs/bookmark/${id}/`);
  return response.data;
};

export const deleteJob = async (id: any) => {
  console.log("job deleted");
  const response = await request.delete(`/jobs/`, id);
  return response.data;
};
