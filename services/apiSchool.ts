import request from "services/apiService";

export const getSchoolList = async () => {
  const response = await request.get(`/schools`)
  return response.data
}