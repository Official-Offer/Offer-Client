import Avatar from "@components/main/profile/Avatar";
import { ContentWrapper } from "@styles/styled-components/styledUser";
import type { NextPage } from "next";
import Form from "../../components/main/profile/Form";
const UserProfile: NextPage = () => {
  return (
    <ContentWrapper className="row">
      <div className="col-lg-4 col-12">
        <Avatar />
      </div>
      <div className="col-lg-8 col-12">
        <Form />
      </div>
    </ContentWrapper>
  );
};
export default UserProfile;
