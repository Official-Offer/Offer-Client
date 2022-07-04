import { URL_API_DAPPVERSE } from "@config/index";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");
// const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJOZ3V5ZW4gSG9uZyBBbmgiLCJ1c2VyQXBpSWQiOjQsImlhdCI6MTY1NjkyNjMwNSwiZXhwIjoxNjU3MDEyNzA1fQ.sfo-RX4ykb-nmB6CJdWJUGfNy49RWMVtnNxnoYeEex8";

export default axios.create({
  baseURL: URL_API_DAPPVERSE,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
