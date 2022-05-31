import {AvatarContainer, AvatarName, AvatarWrapper} from '@styles/styled-components/styledUser';
import { Divider } from 'antd';
const Avatar = () => {
  return (
    <AvatarWrapper>
      <AvatarContainer className="row">
        <img className="avatar-img" src="/img/logo.png"></img>
      </AvatarContainer>
      <AvatarName className="profile-avatar profile-avatar-name">Nguyen Hong Anh</AvatarName>
      <Divider style={{background: 'rgba(29, 187, 189, 0.5)'}}/>
      <div> {"<3"} Favorite Dapp</div>
      <div>
          Profile Setting
      </div>
    </AvatarWrapper>
  );
};

export default Avatar;
