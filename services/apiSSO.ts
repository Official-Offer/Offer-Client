import { TOKEN_BEARER, URL_API_SSO } from '@config/index';
import axios from 'axios';
import Cookies from 'js-cookie';

// const token = Cookies.get("accessToken");
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJOZ3V5ZW4gSG9uZyBBbmgiLCJ1c2VyQXBpSWQiOjQsImlhdCI6MTY1NDc2MzEyNCwiZXhwIjoxNjU0ODQ5NTI0fQ.UKuNo60e9AR1ExntW_DjBPw0TzpM5qcowDORxKJlGnc'
export default axios.create({
    baseURL: URL_API_SSO,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
