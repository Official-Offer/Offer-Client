import { URL_API_ADMIN, TOKEN_BEARER } from 'config/index';
import axios from 'axios';

export default axios.create({
    baseURL: URL_API_ADMIN,
    // headers: {
    //     'Authorization': `Bearer ${TOKEN_BEARER}`
    // },
});
 