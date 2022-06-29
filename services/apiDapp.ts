import { URL_API_DAPPVERSE } from '@config/index';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get("accessToken");
// const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImRpc3BsYXlOYW1lIjoiVMO0IFRydW5nIEtpw6puIiwidXNlckFwaUlkIjozLCJpYXQiOjE2NTY1MDA2NzksImV4cCI6MTY1NjU4NzA3OX0.5wARpZEqxDKdNKb8DpXPc3ET3p6gzUlfsIfZq-wjXUg'

export default axios.create({
    baseURL: URL_API_DAPPVERSE,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
 