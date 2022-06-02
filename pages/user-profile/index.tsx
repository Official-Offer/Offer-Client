import Avatar from "@components/main/profile/Avatar";
import {
  ContentWrapper,
} from "@styles/styled-components/styledUser";
import FavoriteDapps from "@components/main/profile/FavoriteDapps";
import type { NextPage } from "next";
import { useState } from "react";
import Form from "../../components/main/profile/Form";
const UserProfile: NextPage = () => {
  const [showFavDapps, setShowFavDapps] = useState(true);
  return (
    <ContentWrapper className="row">
      <div className="col-lg-4 col-12">
        <Avatar />
      </div>
      <div className="col-lg-8 col-12">
        {showFavDapps ? <FavoriteDapps /> : <Form />}
      </div>
    </ContentWrapper>
  );
};
export default UserProfile;
