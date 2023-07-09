import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FootnoteForm, LogInForm } from "@components/forms";
import { setCookie, getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "react-query";
import { studentLogin } from "services/apiStudent";
import { userLogIn } from "@services/apiUser";
import { RootState } from "@redux/reducers";
import { useSelector } from "react-redux";
// import { advisorLogin } from "@services/apiAdvisor";
// import { recruiterLogin } from "@services/apiRecruiter";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signIn, useSession } from "next-auth/react";

//create a next page for the student home page, code below
const Login: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);
  const mutation = useMutation({
    // queryKey: ["login"],
    mutationFn: userLogIn,
    onSuccess: async (data) => {
      // Invalidate and refetch
      setCookie("access_token", data.token);
      router
        .push({
          pathname: state.role.isStudent
          ? "/student"
          : state.role.isAdvisor
          ? "/advisor"
          : "/recruiter"
        })
        .then(() => {
          router.reload();
        });
      // queryClient.invalidateQueries({ queryKey: ["login"] });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      setErrorMessage("Sai tên đăng nhập hoặc mật khẩu");
      // queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
  const { data: session, status } = useSession();
  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    router.push("/student");
  }
  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <h1>Đăng nhập</h1>
          <h1>{state.school || state.company}</h1>
          <LogInForm
            onSubmit={(item: { email: any; password: any }) => {
              return mutation.mutate({
                email:  item.email,
                password: item.password,
              });
            }}
            isLoading={mutation.isLoading}
          />
          {errorMessage && (
            <p className="register-content-error">{errorMessage}</p>
          )}
          <Button icon={<GoogleOutlined />} onClick={() => signIn("google")}>
            {" "}
            Đăng nhập với Google{" "}
          </Button>
          <FootnoteForm />
        </div>
      </div>
    </div>
  );
};

export default Login;