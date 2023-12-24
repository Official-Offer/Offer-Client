import React from "react";
import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { FootnoteForm, OrgForm } from "@components/forms";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { BackwardOutlined } from "@ant-design/icons";
import { updateEducation } from "@services/apiSchool";
import { updateCompany } from "@services/apiCompany";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@services/apiUser";
import RichTextEditor from "@components/text/textEditor";

const BasicInformation: NextPage = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.account);
  const mutation = useMutation({
    // queryKey: ["register"],
    mutationFn: state.role.isStudent ? updateEducation : updateCompany,
    onSuccess: async () => {
      // console.log("updated");
      setSubmitted(true);
    },
    onError: (error: any) => {
      // console.log(error);
    },
  });

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <>
            <h3>
              Link xác nhận đã được gửi đến email của bạn, vui lòng check email
              để kích hoạt tài khoản.{" "}
            </h3>
            <br />
            Không nhận được email?{" "}
            <p>
              <a style={{ color: "blue" }}>Nhấn vào đây để gửi lại email.</a>
            </p>
          </>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
