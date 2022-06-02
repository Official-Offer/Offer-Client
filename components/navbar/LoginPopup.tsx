import { useState } from "react";
import { Modal } from "antd";
import {
  BoxBlueBold,
  SocialLoginBox,
} from "@styles/styled-components/styledBox";

const LoginPopup = ({ isVisible, setVisible, onChooseLogin }) => {
  const loginMethods = [
    { name: "Google", icon: "login_gg_icon.png" },
    { name: "Facebook", icon: "login_fb_icon.png" },
    { name: "Twitter", icon: "login_tw_icon.png" },
  ];

  const onCancel = () => setVisible(false);
  return (
    <Modal
      title="Login"
      visible={isVisible}
      onOk={onChooseLogin}
      onCancel={onCancel}
    >
      {loginMethods.map((meth, i) => (
        <SocialLoginBox key={i}>
          <img
            className="login-social-icon"
            src={`/img/icons/${meth.icon}`}
          ></img>
          Sign in with {meth.name}
        </SocialLoginBox>
      ))}

      <div className="login-popup-heart">
        <img src="/img/icons/heart.png"></img>
      </div>
    </Modal>
  );
};
export default LoginPopup;
