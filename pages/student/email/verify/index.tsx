import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import PinInput from "react-pin-input";
import { Typography } from "antd";
import FootnoteForm from "@components/forms/FootnoteForm";
import AppContext from "@components/AppContext";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { verifyEmail } from "services/apiUser";


const EmailVerify: NextPage = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [success, setSuccess] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      // Invalidate and refetch
      setSuccess(data.success)
      queryClient.invalidateQueries({ queryKey: ["verify-email"] });
    },
  });

  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          <h1>Bách Khoa Hà Nội</h1>
          <p>
            Mã xác nhận đã được gửi tới email <b>{context.registerEmail}</b>
          </p>
          <div className="register-student-content-form-pincode">
              <PinInput
                length={5}
                initialValue=""
                onChange={(value, index) => {

                }}
                type="numeric"
                inputMode="number"
                style={{ padding: "20px 0px" }}
                inputStyle={{
                  borderColor: "#7277F1",
                  fontSize: "20px",
                  width: "50px",
                }}
                inputFocusStyle={{ borderColor: "#D30B81" }}
                onComplete={(value, index) => {
                  if (success) router.push("/student/registration/basic-information");
                  else console.log("Verification failed");
                }}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
              <Typography.Text type="secondary">
                Không nhận được? <u>Gửi lại mã xác nhận</u>
              </Typography.Text>
              <br />
              <br />
              <FootnoteForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
