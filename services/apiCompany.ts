import request from './apiService'

export const getCompanyList = async () => {
  const response = await request.get(`/companies/`);
  return response.data;
}

export const getCompany = async (id: number) => {
  const response = await request.get(`/companies/${id}`);
  return response.data.message;
}