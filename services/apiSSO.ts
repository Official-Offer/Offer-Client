import { TOKEN_BEARER, URL_API_SSO } from '@config/index';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get("accessToken");
// const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheU5hbWUiOiJTdGV2ZSBOZ3V5ZW4iLCJ1c2VyQXBpSWQiOjE2LCJpYXQiOjE2NTU3MDg3NDAsImV4cCI6MTY1NTc5NTE0MH0.vr6mNJKmVBFLrcurG9kOQjz0qmZlv4NSKMEvzEKN-OA'
export default axios.create({
    baseURL: URL_API_SSO,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
