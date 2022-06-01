import Avatar from "@components/main/profile/Avatar";
import {
  ContentWrapper,
  FavoriteDapps,
} from "@styles/styled-components/styledUser";
import type { NextPage } from "next";
import { useState } from "react";
import Form from "../../components/main/profile/Form";
const UserProfile: NextPage = () => {
  const [showFavDapps, setShowFavDapps] = useState(false);
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
