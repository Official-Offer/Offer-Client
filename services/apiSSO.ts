import { TOKEN_BEARER, URL_API_SSO } from "@config/index";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");
// const token =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJOZ3V5ZW4gSG9uZyBBbmgiLCJ1c2VyQXBpSWQiOjQsImlhdCI6MTY1NzA4MjIwNCwiZXhwIjoxNjU3MTY4NjA0fQ.wL7uERK5Mz2jPx0TU6Wznvgl1CJAYdv9dBu8zs7OI6o"
export default axios.create({
  baseURL: URL_API_SSO,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
