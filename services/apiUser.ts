import axios from 'axios'
import { URL_API_ADMIN, TOKEN_BEARER } from 'config/index';

// export const createUser = async (body: any) => {
//   const response = await axios.post(`${URL_API_ADMIN}/account/list/users`, body)
//   return response.data
// }
export const getUserList = async () => {
  const response = await axios.get(`${URL_API_ADMIN}/api/accounts/list/users`)
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