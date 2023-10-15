import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

//create a next page for the student home page, code below
const Profile: NextPage = () => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  return (
    <div className="">
        <h2>Hồ sơ</h2>
    </div>
  );
};

export default Profile;
