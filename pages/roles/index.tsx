import { NextPage } from "next";
import {
  CenterPanel,
  LeftPanel,
  RightPanel,
} from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import {
  ContinueButton,
  SubmitButton,
} from "@styles/styled-components/styledButton";
//create a next page for the student home page, code below
const Login: NextPage = () => {
  const router = useRouter();

  return (
    <div className="login">
      <div className="login-left">
        {/* <div className="login-left-text">Bạn là học sinh?</div> */}
        <div className="login-left-button">
          <ContinueButton
            onClick={() => {
              router.push("/student/email");
            }}
          >
            Học sinh
          </ContinueButton>
        </div>
      </div>
      <div className="login-center">
        {/* <div className="login-left-text">Bạn là nhà tuyển dụng?</div> */}
        <div className="login-center-button">
          <ContinueButton
            backgroundColor="#2980B9"
            onClick={() => {
              router.push("/recruiter/email");
            }}
          >
            Nhà tuyển dụng
          </ContinueButton>
        </div>
      </div>
      <div className="login-right">
        {/* <div className="login-left-text">Bạn là cố vấn tuyển sinh?</div> */}
        <div className="login-right-button">
          <ContinueButton
            backgroundColor="#f12711"
            onClick={() => {
              router.push("/advisor/email");
            }}
          >
            Cố vấn
          </ContinueButton>
        </div>
      </div>
    </div>
  );
};

export default Login;