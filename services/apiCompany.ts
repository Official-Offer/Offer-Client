import request from './apiService'

export const getCompanyList = async () => {
  const response = await request.get(`/companies/`);
  return response.data;
}

export const getCompany = async (id: number) => {
  const response = await request.get(`/companies/${id}`);
  return response.data.message;
}

export const getCompaniesForAdvisor = async (id: number) => {
  const companies = (await request.get(`/companies/`)).data;
  var res = [];
  for (const company of companies) {
    res.push({
      key: company.id,
      ID: company.id,
      name: company.name,
      recruiters: 3,
      unapproved_jobs: 200,
      approved_jobs: 10000,
      student_employees: 20,
      compatibility: "70%",
    });
  }
  return res;
}