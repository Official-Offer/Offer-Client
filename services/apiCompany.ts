import request from './apiService'

export const getCompanyList = async () => {
  const response = await request.get(`/companies/`);
  return response.data;
}

export const getCompany = async (id: number) => {
  const response = await request.get(`/companies/${id}`);
  return response.data.message;
}

export const getCompaniesForAdvisor = async () => {
  // const companies = (await request.get(`/companies/`)).data;
  const companies = [
    { name: "VinGroup", desc: "rac" },
    { name: "Vinamilk", desc: "rac" },
    { name: "VNG", desc: "rac" },
    { name: "Garena", desc: "rac" },
    { name: "Shoppee", desc: "rac" },
  ];
  return companies.map((company)=>({
      key: "1",
      ID: "2",
      name: company.name,
      description: company.desc,
      recruiters: 3,
      unapproved_jobs: 200,
      approved_jobs: 10000,
      student_employees: 20,
      compatibility: "70%",
    }));
  }