import request from "services/apiService";

export const registerUser = async (body: any) => {
  const response = await request.post(`/accounts/register`, body)
  return response.data
}

export const getUserList = async () => {
  const response = await request.get(`/accounts/list/users`)
  return response.data
}
// export const getUserDetails = async (userId: any) => {
//   const response = await axios.get(`${URL_API_ADMIN}/users/${userId}`)
//   return response.data
// }
// export const updateUser = async (body: any) => {
//   const response = await axios.put(`${URL_API_ADMIN}/users`, body)
//   return response.data
// }
// export const deleteUser = async (userId: any) => {
//   const response = await axios.delete(`${URL_API_ADMIN}/users/${userId}`)
//   return response.data
// }