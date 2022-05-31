import {
  AvatarContainer,
  AvatarImg,
  AvatarName,
  AvatarWrapper,
  FavoriteDapps,
  ProfileSetting,
} from "@styles/styled-components/styledUser";
import { Divider } from "antd";
import { Heart, Settings } from "react-feather";
const Avatar = () => {
  return (
    <AvatarWrapper>
      <AvatarContainer className="row">
        <AvatarImg className="avatar-img" src="/img/ys.jpg"></AvatarImg>
      </AvatarContainer>
      <AvatarName>Nguyen Hong Anh</AvatarName>
      <Divider style={{ background: "rgba(29, 187, 189, 0.5)", margin: 0 }} />
      <FavoriteDapps>
        {" "}
        <Heart color="#1DBBBD" size={20} strokeWidth="2.7px" style={{marginRight:20}}/>
        Favorite Dapps
      </FavoriteDapps>
      <ProfileSetting>
        {" "}
        <Settings color="white" size={20} strokeWidth="2.7px" style={{marginRight:20}}/>
        Profile Settings
      </ProfileSetting>
    </AvatarWrapper>
  );
};

export default Avatar;
