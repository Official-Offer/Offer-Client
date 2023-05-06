import request from './apiService'

export const getSchoolList = async () => {
  const response = await request.get(`/schools/`);
  return response.data;
}

export const getSchool = async (id: number) => {
  const response = await request.get(`/schools/${id}/`);
  return response.data.message; // For some reasons the data is in the message field
}