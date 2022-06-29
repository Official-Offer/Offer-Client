import { TOKEN_BEARER, URL_API_SSO } from "@config/index";
import axios from "axios";
import Cookies from "js-cookie";

// const token = Cookies.get("accessToken");
const token = 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheU5hbWUiOiJTdGV2ZSBOZ3V5ZW4iLCJ1c2VyQXBpSWQiOjE2LCJpYXQiOjE2NTY0ODk2NDUsImV4cCI6MTY1NjU3NjA0NX0.wY_IUNKtshzmyV9YNAyTmAxVbNufx-T_xg6wibTku6s";
export default axios.create({
  baseURL: URL_API_SSO,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
