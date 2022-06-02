import { useState } from "react";
import { Modal } from "antd";
import {
  BoxBlueBold,
  SocialLoginBox,
} from "@styles/styled-components/styledBox";
import { URL_API_SSO } from "@config/dev.config";
import request from "@services/apiService";

const LoginPopup = ({ isVisible, setVisible }) => {
  const loginMethods = [
    { name: "Google", icon: "login_gg_icon.png" },
    { name: "Facebook", icon: "login_fb_icon.png" },
    { name: "Twitter", icon: "login_tw_icon.png" },
  ];

  const onCancel = () => setVisible(false);
  const onLogin = async (meth) => {
    const falseURL = 'http://localhost:8008';
    const successURL = 'http://localhost:8008';
    location.href=`${URL_API_SSO}/login/${meth.name.toLowerCase()}?redirectFalse=${falseURL}&redirectSuccess=${successURL}`
    // await request
    //   .get(
    //     `/login/${meth.name.toLowerCase()}?redirectFalse=${falseURL}&redirectSuccess=${successURL}`
    //   )
    //   .then((res) => {
    //       console.log(res);
    //   });
    // window.open(`${URL_API_SSO}/login/${meth.name.toLowerCase()}?redirectFalse=${falseURL}&redirectSuccess=${successURL}`)
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
