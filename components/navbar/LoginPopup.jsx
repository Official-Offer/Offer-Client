import { useState } from "react";
import { Modal } from "antd";
import {
  BoxBlueBold,
  SocialLoginBox,
} from "@styles/styled-components/styledBox";
import { URL_API_SSO, URL_NFTs } from "@config/index";
import { useRouter } from "next/router";
const LoginPopup = ({ isVisible, setVisible, setUser }) => {
  const loginMethods = [
    { name: "Google", icon: "login_gg_icon.png" },
    { name: "Facebook", icon: "login_fb_icon.png" },
    { name: "Twitter", icon: "login_tw_icon.png" },
  ];
  const onCancel = () => setVisible(false);
  const pathName = useRouter().pathname;
  const onLogin = async (meth) => {
    const falseURL = `${window.location.origin}${pathName}%2F%3Flogin%3Dfalse`;
    const successURL = `${window.location.origin}${pathName}%2F%3Flogin%3Dsuccess`;
    location.href = `${URL_API_SSO}/login/${meth.name.toLowerCase()}?redirectFalse=${falseURL}&redirectSuccess=${successURL}`;
  };
  return (
    <Modal title="Login" visible={isVisible} onCancel={onCancel}>
      {loginMethods.map((meth, i) => (
        <SocialLoginBox key={i} onClick={() => onLogin(meth)}>
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
