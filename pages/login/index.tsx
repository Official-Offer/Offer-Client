import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FootnoteForm } from "@components/forms";
import { setCookie, getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentLogin } from "services/apiStudent";
import { socialLogIn, userLogIn } from "@services/apiUser";
import { RootState } from "@redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { AuthForm } from "@components/forms/AuthForm";
import { SubmitButton } from "@components/button/SubmitButton";
import { LoadingPage } from "@components/loading/LoadingPage";

//create a next page for the student home page, code below
const Login: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [socialToken, setSocialToken] = useState<string>("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: userLogIn,
    onSuccess: async (data) => {
      // Invalidate and refetch
      setCookie("cookieToken", data.access);
      setCookie("id", data.pk);
      setCookie("role", data.role);
      // dispatch(setLoggedIn(true));
      router
        .push({
          pathname:
            data.role == "student"
              ? "/student"
              : data.role == "advisor"
                ? "/advisor/jobs"
                : "/recruiter/jobs",
        })
        .then(() => {
          router.reload();
        });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      setErrorMessage("Sai tên đăng nhập hoặc mật khẩu");
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  // const socialQuery = useQuery({
  //   queryKey: ["socialLogin"],
  //   queryFn: () => socialLogIn(session && session?.accessToken),
  //   onSuccess: async (data) => {
  //     console.log(data);
  //   },
  //   onError: () => {},
  // });

  const { data: session, status } = useSession();
  if (status === "loading") return <LoadingPage />;
  if (status === "authenticated") {
    // console.log(session.accessToken);
    // setSocialToken(session?.accessToken);
    // socialMutation.mutate({
    //   code: session?.accessToken
    // });
    // router.push("/student");
  }
  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          <h1>Đăng nhập</h1>
          <br />
          <Button icon={<GoogleOutlined />} onClick={() => signIn("google")}>
            {" "}
            Đăng nhập với Google{" "}
          </Button>
          <AuthForm
            onSubmit={(item: { email: string; password: string }) => {
              return mutation.mutate({
                email: item.email,
                password: item.password,
              });
            }}
            isLoading={mutation.isLoading}
          />
          {errorMessage && (
            <p className="register-content-error">{errorMessage}</p>
          )}
          {/* <SubmitButton text="sign out" onClick={()=>{signOut()}}/> */}
          <FootnoteForm embedLogin={true} type={""} />
        </div>
      </div>
    </div>
  );
};

export default Login;
