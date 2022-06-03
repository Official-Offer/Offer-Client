import { TOKEN_BEARER, URL_API_SSO } from '@config/index';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get("accessToken");
// const token = TOKEN_BEARER;
export default axios.create({
    baseURL: URL_API_SSO,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
