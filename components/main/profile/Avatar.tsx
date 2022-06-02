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
const Avatar = ({ data, showFavDapp, setShowFavDapp }) => {
  return (
    <AvatarWrapper>
      <AvatarContainer className="row">
        <AvatarImg className="avatar-img" src="/img/ys.jpg"></AvatarImg>
      </AvatarContainer>
      <AvatarName>{data.displayName}</AvatarName>
      <Divider style={{ background: "rgba(29, 187, 189, 0.5)", margin: 0 }} />
      <div
        className={`avatar-button${showFavDapp ? "-active" : ""}`}
        onClick={() => setShowFavDapp(!showFavDapp)}
      >
        <Heart
          color={!showFavDapp ? "#1DBBBD" : "white"}
          size={20}
          strokeWidth="2.7px"
          style={{ marginRight: 20 }}
        />
        Favorite Dapps
      </div>
      <div
        className={`avatar-button${!showFavDapp ? "-active" : ""}`}
        onClick={() => setShowFavDapp(!showFavDapp)}
      >
        <Settings
          color={!showFavDapp ? "white" : "#1DBBBD"}
          size={20}
          strokeWidth="2.7px"
          style={{ marginRight: 20 }}
        />
        Profile Settings
      </div>
    </AvatarWrapper>
  );
};

export default Avatar;
