import { TOKEN_BEARER, URL_API_SSO } from '@config/index';
import axios from 'axios';
import Cookies from 'js-cookie';

// const token = Cookies.get("accessToken");
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJOZ3V5ZW4gSG9uZyBBbmgiLCJ1c2VyQXBpSWQiOjQsImlhdCI6MTY1NTM2NDEwNSwiZXhwIjoxNjU1NDUwNTA1fQ.wxA0WsR8qcMtVGYr1E6XcoXvHVs4YZq7eNtVB8otcws'
export default axios.create({
    baseURL: URL_API_SSO,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
