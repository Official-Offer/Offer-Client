import { URL_API_DAPPVERSE } from '@config/index';
import axios from 'axios';

//const token = Cookies.get("accessToken");
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImRpc3BsYXlOYW1lIjoiVMO0IFRydW5nIEtpw6puIiwidXNlckFwaUlkIjozLCJpYXQiOjE2NTQ1NzQ0OTcsImV4cCI6MTY1NDY2MDg5N30.dVMsJdw4ut1sxuRvYvqlrrMHH0XHP9k_C7vh2IrpVqU'

export default axios.create({
    baseURL: URL_API_DAPPVERSE,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
 