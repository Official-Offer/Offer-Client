import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { SubmitButton } from "@components/button/SubmitButton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

//create a next page for the student home page, code below
const VerifyPassword: NextPage = () => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  const { token } = router.query;

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <h1 style={{ color: "Purple" }}>Email đã được xác nhận.</h1>
          <br />
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
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;
