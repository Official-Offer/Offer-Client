import Avatar from "@components/main/profile/Avatar";
import { ContentWrapper } from "@styles/styled-components/styledUser";
import FavoriteDapps from "@components/main/profile/FavoriteDapps";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../components/main/profile/Form";
import { URL_API_SSO } from "@config/index";
import Cookies from "js-cookie";
import request from "@services/apiSSO";

const UserProfile: NextPage = () => {
  const router = useRouter();
  const [showFavDapps, setShowFavDapps] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: null,
    address: "",
    displayName: "",
    bio: "",
    avatar: "",
    website: "",
    twitter: "",
    telegram: "",
    instagram: "",
    facebook: "",
  });
  const [login, setLogin] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    (async () => {
      //uncomment when deployed on dev since localhost can't access cookie
      await request
        .get(`/users/me`)
        .then((res: any) => {
          // console.log(res.data)
          setUserInfo(res.data);
          setLogin(true);
          if (!Cookies.get('accessToken')) {
            router.push('/');
          }
        })
        .catch(() => {
          setLogin(false);
          if (!Cookies.get('accessToken')) {
            router.push('/');
          }
        });
    })();
  }, [reload]);

  return (
    <>
      {login && (
        <ContentWrapper className="row">
          <div className="col-lg-4 col-12">
            <Avatar
              data={userInfo}
              showFavDapp={showFavDapps}
              setShowFavDapp={setShowFavDapps}
            />
          </div>
          <div className="col-lg-8 col-12">
            {showFavDapps ? (
              <FavoriteDapps data={userInfo} />
            ) : (
              <Form data={userInfo} reload={reload} setReload={setReload} />
            )}
          </div>
        </ContentWrapper>
      )}
    </>
  );
};
export default UserProfile;
