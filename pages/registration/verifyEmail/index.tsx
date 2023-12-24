import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { SubmitButton } from "@components/button/SubmitButton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { useMutation } from "@tanstack/react-query";
import { resendEmail, verifyEmail } from "@services/apiUser";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Alert } from "antd";

//create a next page for the student home page, code below
const VerifyPassword: NextPage = () => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  const { otp } = router.query;
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const mutation = useMutation(["verifyEmail"], {
    mutationFn: verifyEmail,
    onSuccess: async (data) => {
      setSubmitted(true);
      return;
    },
    onError: (error: any) => {
      // console.log(error.response.data.message);
      setSubmitted(true);
      setErrorMessage("Xác nhận email không thành công.");
      // setErrorMessage(error.response.data.message);
    },
  });

  const resendMutation = useMutation(["resendVerifyEmail"], {
    mutationFn: resendEmail,
    onSuccess: async (data) => {
      setSubmitted(true);
      return;
    },
    onError: (error: any) => {
      // console.log(error.response.data.message);
      setSubmitted(true);
      setErrorMessage("Gửi lại email không thành công.");
      // setErrorMessage(error.response.data.message);
    },
  });

  useEffect(() => {
    // console.log(otp);
    if (otp) {
      mutation.mutate({ otp });
    }
  }, [otp]);

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <h1 style={{ color: "Purple" }}>
            {submitted ? (
              errorMessage ? (
                <Alert message={errorMessage} type="error" showIcon />
              ) : (
                <Alert
                  message="Xác nhận email thành công"
                  type="success"
                  showIcon
                />
              )
            ) : (
              <Alert
                message="Link xác nhận đã được gửi đến email của bạn"
                type="info"
                showIcon
              />
            )}
          </h1>
          <br />
          {submitted && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {errorMessage ? (
                <SubmitButton
                  text="Gửi lại link xác nhận"
                  onClick={() => {
                    resendMutation.mutate({});
                    setErrorMessage("");
                    setSubmitted(false);
                  }}
                />
              ) : (
                <SubmitButton
                  text="Quay lại trang chủ"
                  isLoading={false}
                  onClick={() => {
                    // router.push("/login");
                    const role = getCookie("role");
                    role === "student"
                      ? router.push("/student")
                      : role === "advisor"
                        ? router.push("/advisor/jobs")
                        : router.push("/recruiter/jobs");
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;
