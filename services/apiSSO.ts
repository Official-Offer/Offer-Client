import { TOKEN_BEARER, URL_API_SSO } from '@config/index';
import axios from 'axios';
import Cookies from 'js-cookie';

// const token = Cookies.get("accessToken");
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJTdGV2ZSBIYXdraW5nIiwidXNlckFwaUlkIjo0LCJpYXQiOjE2NTQ1ODY1MTgsImV4cCI6MTY1NDY3MjkxOH0.mnw6EYvwrPFPCoJEl70s7lkeBohxM22Pw36zmohBc9Y'
export default axios.create({
    baseURL: URL_API_SSO,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
