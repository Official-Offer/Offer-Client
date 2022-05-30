import Avatar from "@components/main/profile/Avatar";
import type { NextPage } from "next";
import Form from "../../components/main/profile/Form";
const UserProfile: NextPage = () => {
  return (
    <div className="row">
      <div className="col-lg-4 col-12">
        <Avatar />
      </div>
      <div className="col-lg-8 col-12">
        
        <Form />
      </div>
    </div>
  );
};
export default UserProfile;
