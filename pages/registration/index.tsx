import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FootnoteForm } from "@components/forms";
import { setCookie } from "cookies-next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, userLogIn } from "@services/apiUser";
import { RootState } from "@redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { setLoggedIn } from "@redux/actions";
import { AuthForm } from "@components/forms/AuthForm";
import { setCompany, setRole, setSchool } from "@redux/slices/account";
import { Form, Input, Segmented } from "antd";
import { SubmitButton } from "@components/button/SubmitButton";

//create a next page for the student home page, code below
const Registration: NextPage = () => {
  const router = useRouter();
  const [pwScreen, setScreen] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<any>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [r, setR] = useState<any>({});
  const dispatch = useDispatch();
  // const queryClient = useQueryClient();
  // const state = useSelector((state: RootState) => state.account);
  const [rol, setRol] = useState<string>("Học sinh");
  const { data: session, status } = useSession();
  const mutation = useMutation({
    // queryKey: ["register"],
    mutationFn: registerUser,
    onSuccess: async (data) => {
      // Invalidate and refetch
      setCookie("access_token", data.token);
      dispatch(setLoggedIn(true));
      router.push("/registration/basicInfo").then(() => {
        router.reload();
      });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      // setErrorMessage("Sai tên đăng nhập hoặc mật khẩu");
    },
  });
  if (status === "loading") return <h1> Đang tải ... </h1>;
  // if (status === "authenticated") {
  //   console.log("logged in with gg");
    // setEmail(session?.user?.email);
    // setPassword("google");
    // router.push("/registration/basicInfo");
  // }
  // useEffect(() => {
  //   if (status === "authenticated") {
  //   setScreen(false);
  //   }
  // }, [status]);
  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {pwScreen && status !== "authenticated" ? (
            <>
              <h1>Đăng ký</h1>
              <br />
              <Button
                icon={<GoogleOutlined />}
                onClick={() => signIn("google")}
              >
                {" "}
                Đăng ký với Google{" "}
              </Button>
              <AuthForm
                onSubmit={(item: { email: any; password: any }) => {
                  setPassword(item.password);
                  setEmail(item.email);
                  setScreen(false);
                }}
                isLoading={mutation.isLoading}
                embedSignup={true}
              />
            </>
          ) : (
            <>
              <div>
                <h1>Thông tin cơ bản</h1>
              </div>
              <Form className="form" onSubmit={() => {}} layout="vertical">
                <div className="form-grid">
                  <Form.Item required label="Họ" className="form-input">
                    <Input
                      required
                      className="form-item"
                      onChange={(value) => {
                        setFirstName(value.toString());
                      }}
                    />
                  </Form.Item>
                  <Form.Item required label="Tên" className="form-input">
                    <Input
                      required
                      className="form-item"
                      onChange={(value) => {
                        setLastName(value.toString());
                      }}
                    />
                  </Form.Item>
                </div>
                <Form.Item required label="Chọn vai trò" className="form-input">
                  <Segmented
                    options={["Học sinh", "Nhà tuyển dụng", "Trường"]}
                    onResize={undefined}
                    size={"large"}
                    onResizeCapture={undefined}
                    onChange={(value) => {
                      setRol(value.toString());
                      const role = {
                        isStudent: value.toString() == "Học sinh",
                        isAdvisor: value.toString() == "Trường",
                        isRecruiter: value.toString() == "Nhà tuyển dụng",
                      };
                      setR(role);
                      // dispatch(setRole(role));
                    }}
                  />
                </Form.Item>
                <SubmitButton
                  isLoading={mutation.isLoading}
                  text={"Tiếp tục"}
                  onClick={() => {
                    const role =
                      rol == "Học sinh"
                        ? "student"
                        : rol == "Trường"
                        ? "advisor"
                        : "recruiter";
                    dispatch(setRole(r));
                    mutation.mutate({
                      email,
                      password,
                      firstName,
                      lastName,
                      role,
                    });
                  }}
                />
                {/* <SubmitButton onClick={()=>{
                  //logout google nextjs
                  signOut();
                }} text={"Log out"}/> */}
              </Form>
            </>
          )}
          {errorMessage && (
            <p className="register-content-error">{errorMessage}</p>
          )}
          <FootnoteForm />
        </div>
      </div>
    </div>
  );
};

export default Registration;
