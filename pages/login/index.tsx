import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FootnoteForm, LoginForm } from "@components/forms";
import { setCookie, getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "react-query";
import { studentLogin } from "services/apiStudent";
import { userLogIn } from "@services/apiUser";
import { RootState } from "@redux/reducers";
import { useSelector } from "react-redux";
import { advisorLogin } from "@services/apiAdvisor";
import { recruiterLogin } from "@services/apiRecruiter";

//create a next page for the student home page, code below
const LoginStudent: NextPage = () => {
  const router = useRouter();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [loginFunc, setLoginFunc] = useState(studentLogin);
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);
  // useEffect(() => {
  //   setLoginFunc(state.role.isStudent? studentLogin: state.role.isAdvisor? advisorLogin: recruiterLogIn)
  // }, [state.role.isStudent, state.role.isAdvisor, state.role.isRecruiter])
  const mutation = useMutation({
    // queryKey: ["login"],
    mutationFn: state.role.isStudent? studentLogin: state.role.isAdvisor? advisorLogin: recruiterLogin,
    onSuccess: async (data) => {
      // Invalidate and refetch
      setCookie("access_token", data.token);
      router
        .push({
          pathname: "/student",
        })
        .then(() => {
          router.reload();
        });
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
    onError: (error: any) => {
      console.log(error.response.data.message)
      setErrorMessage("Sai tên đăng nhập hoặc mật khẩu");
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          <h1>{state.school || state.company}</h1>
          <LoginForm
            onSubmit={(item: { email: any; password: any; }) => {
              mutation.mutate({
                email: item.email,
                password: item.password,
              });
            }}
          />
          {errorMessage && (
            <p className="register-student-content-error">{errorMessage}</p>
          )}
          <FootnoteForm />
        </div>
      </div>
    </div>
  );
};

export default LoginStudent;
function recruiterLogIn(variables: void): Promise<unknown> {
  throw new Error("Function not implemented.");
}

