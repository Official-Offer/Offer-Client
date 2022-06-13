import { URL_API_DAPPVERSE } from '@config/index';
import axios from 'axios';
import Cookies from 'js-cookie';

// const token = Cookies.get("accessToken");
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImRpc3BsYXlOYW1lIjoiVMO0IFRydW5nIEtpw6puIiwidXNlckFwaUlkIjozLCJpYXQiOjE2NTUwOTgzNzQsImV4cCI6MTY1NTE4NDc3NH0.KURMKTIPP566p7qOeI76UJsyU3PLWMOjRYf2-3QldwM'
export default axios.create({
    baseURL: URL_API_DAPPVERSE,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
 