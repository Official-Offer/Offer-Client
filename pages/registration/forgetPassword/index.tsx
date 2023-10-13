import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { FootnoteForm, PasswordForm } from "@components/forms";
import { useMutation, useQueryClient } from "react-query";
import { setCookie } from "cookies-next";
import { registerStudent } from "services/apiStudent";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { useState } from "react";
import { registerAdvisor } from "@services/apiAdvisor";
import { registerRecruiter } from "@services/apiRecruiter";
import { SubmitButtonAntd } from "@styles/styled-components/styledButton";

//create a next page for the student home page, code below
const ForgetPassword: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [screen, setScreen] = useState("pw");
  const state = useSelector((state: RootState) => state.account);
  const [errorMessage, setErrorMessage] = useState("");
  const mutation = useMutation({
    mutationFn: state.role.isStudent
      ? registerStudent
      : state.role.isAdvisor
      ? registerAdvisor
      : registerRecruiter,
    onSuccess: async (data) => {
      setCookie("access_token", data.token);
      console.log("first");
      router
        .push("/registration/basic-information")
        .then(() => router.reload());
      // queryClient.invalidateQueries({ queryKey: ["register"] });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
      // queryClient.invalidateQueries({ queryKey: ["register"] });
    },
  });

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {/* <Image src="..;/"/> */}
          <h1>Mật khẩu</h1>
          {/* <h1>{state.school || state.company}</h1> */}
          <PasswordForm
            isLoading={mutation.isLoading}
            onSubmit={(password: string) => {
              console.log(state.email, password);
              mutation.mutate({
                email: state.email,
                password: password,
              });
            }}
          />
          {errorMessage && (
            <p className="register-content-error">{errorMessage}</p>
          )}
          <br />
          <FootnoteForm />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
