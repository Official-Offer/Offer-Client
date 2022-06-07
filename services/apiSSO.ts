import { TOKEN_BEARER, URL_API_SSO } from '@config/index';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get("accessToken");
//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU0NTEwNjQwLCJleHAiOjE2NTcxMDI2NDB9.-iN2XyX70tpGadnUJsGcozdIuF17BfkXOjoMaooRzRE'
// const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImRpc3BsYXlOYW1lIjoiVMO0IFRydW5nIEtpw6puIiwidXNlckFwaUlkIjozLCJpYXQiOjE2NTQ1NzQ0OTcsImV4cCI6MTY1NDY2MDg5N30.dVMsJdw4ut1sxuRvYvqlrrMHH0XHP9k_C7vh2IrpVqU'
// const token = TOKEN_BEARER;
export default axios.create({
    baseURL: URL_API_SSO,
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
