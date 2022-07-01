import { URL_API_DAPPVERSE } from "@config/index";
import axios from "axios";
import Cookies from "js-cookie";

// const token = Cookies.get("accessToken");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJOZ3V5ZW4gSG9uZyBBbmgiLCJ1c2VyQXBpSWQiOjQsImlhdCI6MTY1NjY1MTE3MSwiZXhwIjoxNjU2NzM3NTcxfQ.6gXUQx_zqRcbppG8FF2_EQVP47FC7dI9SE85KO_ELSY";

export default axios.create({
  baseURL: URL_API_DAPPVERSE,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
