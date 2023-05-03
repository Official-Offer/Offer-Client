import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setRole } from "@redux/actions";
import { NextPage } from "next";
import {
  CenterPanel,
  LeftPanel,
  RightPanel,
} from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import {
  ContinueButton,
} from "@styles/styled-components/styledButton";
const Home: NextPage = () => {
  // console.log(schools);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="login">
      <div className="login-left">
        {/* <div className="login-left-text">Bạn là học sinh?</div> */}
        <div className="login-left-button">
          <ContinueButton
            onClick={() => {
              const role = {
                isStudent: true,
                isAdvisor: false,
                isRecruiter: false,
              };
              dispatch(setRole(role))
              router.push("/auth");
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
              const role = {
                isStudent: false,
                isAdvisor: false,
                isRecruiter: true,
              };
              dispatch(setRole(role))
              router.push("/auth");
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
              const role = {
                isStudent: false,
                isAdvisor: true,
                isRecruiter: false,
              };
              dispatch(setRole(role))
              router.push("/auth");
            }}
          >
            Cố vấn
          </ContinueButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
