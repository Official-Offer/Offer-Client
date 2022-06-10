import { URL_API_DAPPVERSE } from '@config/index';
import axios from 'axios';
import Cookies from 'js-cookie';

// const token = Cookies.get("accessToken");
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImRpc3BsYXlOYW1lIjoiVMO0IFRydW5nIEtpw6puIiwidXNlckFwaUlkIjozLCJpYXQiOjE2NTQ3NDA3ODQsImV4cCI6MTY1NDgyNzE4NH0.RS8i4y8WKNrU6dg3vR3j01cdSsYeq3HzFYgJ0bcgsfM'

export default axios.create({
    baseURL: URL_API_DAPPVERSE,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
 