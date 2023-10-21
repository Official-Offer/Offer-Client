import { URL_API_ADMIN } from "config/index";
import axios from "axios";
import { getCookie } from 'cookies-next';

const TOKEN_BEARER = getCookie("cookieToken");
console.log(TOKEN_BEARER);

export default axios.create({
  baseURL: URL_API_ADMIN,
  headers: TOKEN_BEARER ?
      {
        Authorization: `Bearer ${TOKEN_BEARER}`,
      } : {},
});
