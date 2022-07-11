import { URL_API_DAPPVERSE } from "@config/index";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");
// const token =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJOZ3V5ZW4gSG9uZyBBbmgiLCJ1c2VyQXBpSWQiOjQsImlhdCI6MTY1NzE1NjE4MSwiZXhwIjoxNjU3MjQyNTgxfQ.QLmMN1bIMhssvYwFtvXdB6lbZMuUWbvLggrjM4F_HvY";

export default axios.create({
  baseURL: URL_API_DAPPVERSE,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
