import { useState } from "react";
import { Modal } from "antd";
import { BoxBlueBold, SocialLoginBox } from "@styles/styled-components/styledBox";

const LoginPopup = ({isVisible, setVisible, onChooseLogin}) => {
    const onCancel = () => setVisible(false);
    return (
        <Modal title='Login' visible={isVisible} onOk={onChooseLogin} onCancel={onCancel}>
            <SocialLoginBox> <i className="bi bi-facebook"/>Login with Facebook</SocialLoginBox>
            <SocialLoginBox>Login with Google</SocialLoginBox>
        </Modal>
        
    )
}
export default LoginPopup;