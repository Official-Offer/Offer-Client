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
      // description: company.description || "Không tồn tại",
      advisors: 10000,
      unverifiedJobs: 10000,
      verifiedJobs: 10000,
      students: 10000,
      events: 10000,
      // tag: 'Whatever',
    });
  }
  return res;
}