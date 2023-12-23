import request from "./apiService";
import { getCompany } from "./apiCompany";
// import { URL_API_ADMIN, TOKEN_BEARER } from "config/index";
import { OpenAI } from "langchain/llms/openai";
import { formatDate } from "@utils/formatters/numberFormat";
import { getCookie } from "cookies-next";
import parse from "html-react-parser";

export const getJobs = async () => {
  const response = await request.get(`/jobs`, {
    params: {
      ordered_by: "created_at",
    },
  });
  const jobList = response.data;
  return jobList;
};

export const getJobsPerPage = async (page: number, pageSize: number) => {
  const response = await request.get(`/jobs`, {
    params: {
      page,
      page_size: pageSize,
      ordered_by: "created_at",
    },
  });
  const jobList = response.data;
  return jobList;
};

export const generateJobDescription = async (inputDescription: string) => {
  const apiKey = "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"; // Replace with your OpenAI API key
  const prompt = `
    Lấy những thông tin sau và trả kết quả ở dạng JSON với 
    những trường sau đây: location (string), requirements (string), benefits (string), type(choose among "fulltime", "parttime", "contract"), requiredExperience (Ít hơn 1 năm, 1-3 năm, Hơn 3 năm). 
    Hãy chỉnh sữa format chữ sao cho chữ đầu luôn được viết hoa và tất cả chữ khác được viết đúng tiêu chuẩn cho tất cả các trường trong JSON. Tất cả string được giữ nguyên format. (không bỏ dấu cách)
    Đoạn thông tin cần được chỉnh sửa được đặt ở sau đây: 
    ${inputDescription}
  `;
  // salary (tiếng việt), level (internship/newgrad/experienced), location (tiếng việt), job_type (fulltime/parttime/contract), discipline (tiếng việt), work_type(onsite/hybrid/remote), howTo (cách ứng tuyển),
  // requiredExperience (Ít hơn 1 năm, 1-3 năm, Hơn 3 năm)
  // Thực tập//Nhân viên chính thức
  // salary (tiếng việt), level (internship/newgrad/experienced),
  //  requirements (tiếng việt), benefits (tiếng việt), location (tiếng việt),
  //  job_type (fulltime/parttime/contract), discipline (tiếng việt), work_type(onsite/hybrid/remote), howTo (cách ứng tuyển)
  console.log(prompt);
  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: apiKey,
  });

  try {
    const response = await llm.call(prompt);
    console.log(response);
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
    posted_date: formatDate(job.updated_at, "D/M/YYYY"),
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
  const recruiter = parseInt(getCookie("id") as string);
  const response = await request.get(`/jobs/`, {
    params: {
      created_by: recruiter,
    },
  });
  console.log(response.data.message);

  const jobs = response.data.results || [
    {
      created_at: "",
      title: "SWE Intern",
    },
    {
      created_at: "",
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
    posted_date: formatDate(job.updated_at, "D/M/YYYY"),
    // moment(job.created_at).format("DD/MM/YYYY"),
    title: job.title || "Không tìm thấy",
    // unapproved_schools: unapprovedSchoolString,
    // approved_schools: approvedSchoolString,
    applicants: 20,
  }));
  return res;
};

export const getAdvisorJobs = async () => {
  const school = parseInt(getCookie("orgId") as string);
  console.log(school);
  const response = await request.get(`/jobs/`, {
    params: {
      school,
    },
  });
  const jobs = response.data.results;

  console.log("jobs", jobs);
  const res = jobs.map((job: any) => ({
    key: job,
    posted_date: formatDate(job.updated_at, "D/M/YYYY"),
    // moment(job.created_at).format("DD/MM/YYYY"),
    title: job.title || "Không tìm thấy",
    company: job.company.name,
    recruiter:
      job.created_by.last_name + " " + job.created_by.first_name ||
      "Không tìm thấy", // job.contact_person.first_name + " " + job.contact_person.last_name
    applicants: 20,
    verified: job.is_approved_by
      ? job.is_approved_by.filter((id: any) => id === school).length > 0
      : false,
  }));
  // console.log("res", res)
  return res;
};

export const getApprovedJobs = async () => {
  // const response = await request.get(`/jobs/`);
  // const jobList = response.data;
  const jobList = ["1", "2", "3", "4"];
  const companies = ["VinAI", "FB", "Amz"];
  const recruiters = ["vvnguyen@umass.edu", "ktto@umass.edu", "hto@umass.edu"];
  return jobList.map((job: any) => ({
    key: job,
    posted_date: formatDate(job.updated_at, "D/M/YYYY") || "09/05/2002",
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
  const response = await request.get(`/jobs/${id}/`);
  const job = response.data;
  job.company_data = await getCompany(job.company);
  return job;
};

export const verifyJobs = async (body: any) => {
  const response = await request.post(`/jobs/${body.id}/approve/`, {
    approve: body.is_approved,
  });
  return response.data;
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

export const getAppliedJobs = async (id: number) => {
  const response = await request.get(`/job-applications/`, {
    params: {
      applied_by: id,
    },
  });
  return response.data;
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
  console.log(getCookie("cookieToken"));
  const response = await request.post(`/jobs/`, body);
  return response.data;
};

export const addSchoolsToJob = async (body: any) => {
  // const response = await request.patch(`/jobs/${body.id}/`, body.content);
  const response = await request.post(
    `/jobs/${body.id}/request_approval/`,
    body.content,
  );
  return response.data;
};

export const unbookmarkJob = async (id: number | string) => {
  const response = await request.delete(`/jobs/bookmark/${id}/`);
  return response.data;
};

export const deleteJob = async (id: any) => {
  const response = await request.delete(`/jobs/${id}/`);
  return response.data;
};

export const postJobApp = async (data: any) => {
  const response = await request.post(`/job-applications/`, data);
  return response.data;
};
