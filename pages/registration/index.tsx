import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useState } from "react";
import { FootnoteForm, LogInForm, OrgForm } from "@components/forms";
import { setCookie } from "cookies-next";
import { useMutation, useQueryClient } from "react-query";
import { registerUser, userLogIn } from "@services/apiUser";
import { RootState } from "@redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signIn, useSession } from "next-auth/react";
import { setLoggedIn } from "@redux/actions";
import { AuthForm } from "@components/forms/AuthForm";
import { setCompany, setRole, setSchool } from "@redux/slices/account";
import { Form, Input, Segmented } from "antd";
import { set } from "lodash";

//create a next page for the student home page, code below
const Registration: NextPage = () => {
  const router = useRouter();
  const [pwScreen, setScreen] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);
  const [role, setRol] = useState<string>("Học sinh");
  const { data: session, status } = useSession();
  const mutation = useMutation({
    // queryKey: ["login"],
    mutationFn: registerUser,
    onSuccess: async (data) => {
      // Invalidate and refetch
      setCookie("access_token", data.token);
      // dispatch({
      //   type: "SET_LOGIN",
      //   payload: data.user,
      // });
      dispatch(setLoggedIn(true));
      router
        .push({
          pathname: state.role.isStudent
            ? "/student"
            : state.role.isAdvisor
            ? "/advisor"
            : "/recruiter",
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
  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    router.push("/registration/basicInfo");
  }
  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {pwScreen ? (
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
                  // return mutation.mutate({
                  //   email: item.email,
                  //   password: item.password,
                  // });
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
                    <Input required className="form-item" onChange={() => {}} />
                  </Form.Item>
                  <Form.Item required label="Tên" className="form-input">
                    <Input required className="form-item" onChange={() => {}} />
                  </Form.Item>
                </div>
                <Form.Item required label="Chọn vai trò" className="form-input">
                  <Segmented
                    options={["Học sinh", "Nhà tuyển dụng", "Trường" ]}
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
                      dispatch(setRole(role));
                    }}
                  />
                </Form.Item>
              </Form>

              <OrgForm
                onSubmit={(org) => {
                  if (role == "student" || role == "advisor") {
                    dispatch(setSchool(org));
                  } else {
                    dispatch(setCompany(org));
                  }
                  setScreen(true);
                }}
                isLoading={false}
              />
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
