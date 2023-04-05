import Cookies from 'js-cookie'
import request from './apiService'

export const registerUser = async (body: any) => {
  const response = await request.post(`/accounts/register/`, body);
  Cookies.set("access_token", response.data.token);
  console.log(response.data.token);
  return response.data;
}

export const getUserList = async () => {
  const response = await request.get(`/accounts/list/users/`)
  return response.data;
}

export const getUserDetails = async (userId: any) => {
  const response = await request.get(`/accounts/me/`)
  return response.data;
}

export const userLogIn = async (body: any) => {
  const response = await request.post(`/accounts/login`, body);
  Cookies.set("access_token", response.data.token);
  return response.data;
}

export const verifyEmail = async (body: any) => {
  const response = await request.post(`/accounts/verifyEmail`, body);
  // Cookies.set("access_token", response.data.token);
  return response.data;
}
// export const deleteUser = async (userId: any) => {
//   const response = await axios.delete(`${URL_API_ADMIN}/users/${userId}`)
//   return response.data
// }