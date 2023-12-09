import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { SubmitButton } from "@components/button/SubmitButton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@services/apiUser";
import { useEffect, useState } from "react";

//create a next page for the student home page, code below
const VerifyPassword: NextPage = () => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  const { otp } = router.query;
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const mutation = useMutation(["verifyEmail"], {
    mutationFn: () => verifyEmail(otp),
    onSuccess: async (data) => {
      setSubmitted(true);
      return;
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      setSubmitted(true);
      setErrorMessage("Xác nhận email không thành công.");
      // setErrorMessage(error.response.data.message);
    },
  });

  useEffect(() => {
    if (otp) {
      mutation.mutate();
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
            {submitted
              ? errorMessage
                ? `Xác nhận email không thành công.`
                : `Email đã được xác nhận.`
              : `Link xác nhận đã được gửi đến email của bạn `}
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
              <SubmitButton
                text="Quay lại trang chủ"
                // isLoading={isLoading}
                onClick={() => {
                  state.role.isStudent
                    ? router.push("/student")
                    : state.role.isAdvisor
                      ? router.push("/advisor/jobs")
                      : router.push("/recruiter/jobs");
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;
