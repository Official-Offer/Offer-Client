import { URL_API_ADMIN } from "config/index";
import axios from "axios";
import Cookies from "js-cookie";

const TOKEN_BEARER = Cookies.get("access_token");

export default axios.create({
  baseURL: URL_API_ADMIN,
  headers: TOKEN_BEARER
    ? {
        Authorization: `Bearer ${TOKEN_BEARER}`,
      }
    : {},
});
