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

//create a next page for the student home page, code below
const RegisterPassword: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);
  const [errorMessage, setErrorMessage] = useState("");
  const mutation = useMutation({
    mutationFn: registerStudent,
    onSuccess: async (data) => {
      setCookie("access_token", data.token);
      console.log('first')
      router
        .push("/student/registration/basic-information")
        .then(() => router.reload());
      // queryClient.invalidateQueries({ queryKey: ["register"] });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      setErrorMessage("Mật khẩu quá ngắn (ít nhất 6 ký tự)");
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
          <h1>{state.school || state.company}</h1>
          <PasswordForm
            onSubmit={(password: string) => {
              mutation.mutate({
                email: state.email,
                password: password,
              });
              // if (!mutation.isLoading)
              // router.push("/student/email/verify");
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

export default RegisterPassword;
