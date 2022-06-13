import Cookies from "js-cookie";
import request from '@services/apiSSO';
const getUserInfo = () => {
    const token = Cookies.get('accessToken');
    if (!token) return null; //no access_token, failed authentication
    return request.get(`/users/me`).then((res: any) => {
      return res.data.data;
    }).catch(()=>null);
  
}
export default getUserInfo;