import request from './apiService'

export const getCompanyList = async () => {
  const response = await request.get(`/companies/`)
  return response.data
}