import axios from 'axios'
import { URL_API_ADMIN, TOKEN_BEARER } from 'config/index';

export const getSchoolList = async () => {
  const response = await axios.get(`${URL_API_ADMIN}/api/schools`)
  return response.data
}