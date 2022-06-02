import Avatar from "@components/main/profile/Avatar";
import { ContentWrapper } from "@styles/styled-components/styledUser";
import FavoriteDapps from "@components/main/profile/FavoriteDapps";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Form from "../../components/main/profile/Form";
import { URL_API_SSO } from "@config/dev.config";
import Cookies from "js-cookie";
import request from "@services/apiSSO";
const UserProfile: NextPage = () => {
  const [showFavDapps, setShowFavDapps] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: 1,
    address: "1 Hacker Way",
    displayName: "Steve Nguyen",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, aut earum! Tempora maiores iure nulla debitis, numquam unde laborum quo at fugiat corporis amet et excepturi, beatae modi, itaque enim!",
    avatar: '',
    website: '',
    twitter: '',
    telegram: '',
    instagram: '',
    facebook:'',
  });
  useEffect(() => {
    (async () => {
      // await request.get(`/users/me`).then((res: any) => {
      //   console.log(res.data);
      //   setUserInfo(res.data.data);
      // }); uncomment when deployed on dev since localhost can't access cookie
    })();
  }, []);

  return (
    <ContentWrapper className="row">
      <div className="col-lg-4 col-12">
        <Avatar data={userInfo} showFavDapp={showFavDapps} setShowFavDapp={setShowFavDapps}/>
      </div>
      <div className="col-lg-8 col-12">
        {showFavDapps ? <FavoriteDapps /> : <Form />}
      </div>
    </ContentWrapper>
  );
};
export default UserProfile;
