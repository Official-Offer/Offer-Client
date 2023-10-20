import React from "react";
import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { FootnoteForm, OrgForm } from "@components/forms";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getCookie } from "cookies-next";
import { BackwardOutlined } from "@ant-design/icons";
import { updateEducation } from "@services/apiSchool";
import { updateCompany } from "@services/apiCompany";

const BasicInformation: NextPage = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.account);
  const mutation = useMutation({
    // queryKey: ["register"],
    mutationFn: state.role.isStudent ? updateEducation : updateCompany,
    onSuccess: async (data) => {
      console.log("updated");
      setSubmitted(true);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {/* {submitted ? ( */}
            <>
              <h3>
                Link xác nhận đã được gửi đến email của bạn, vui lòng check
                email để kích hoạt tài khoản.{" "}
              </h3>
              <br />
              Không nhận được email?{" "}
              <p>
                <a style={{ color: "blue" }}>Nhấn vào đây để gửi lại email.</a>
              </p>
            </>
          {/* ) : (
            <>
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push("/registration");
                }}
              >
                <BackwardOutlined /> Quay lại
              </p>
              <div>
                <h1>Thông tin cơ bản</h1>
              </div>
              <OrgForm
                onSubmit={(org) => {
                  if (state.role.isStudent || state.role.isAdvisor) {
                    mutation.mutate({
                      title: "string",
                      description: "string",
                      school: org,
                    });
                  } else {
                    mutation.mutate({
                      account: id,
                      content: {
                        company: org,
                      },
                    });
                  }
                }}
                isLoading={mutation.isLoading}
              />
              <FootnoteForm />
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
