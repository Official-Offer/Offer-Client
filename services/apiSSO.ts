import { TOKEN_BEARER, URL_API_SSO } from '@config/index';
import axios from 'axios';
import Cookies from 'js-cookie';

// const token = Cookies.get("accessToken");
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheU5hbWUiOiJTdGV2ZSBOZ3V5ZW4iLCJ1c2VyQXBpSWQiOjE2LCJpYXQiOjE2NTU3OTUxMDgsImV4cCI6MTY1NTg4MTUwOH0.koD1WHaFAwIw6fk3raTB6vITxN1pPHepj8iP3nU0FZw'
export default axios.create({
    baseURL: URL_API_SSO,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
