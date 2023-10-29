import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { OrgForm } from "@components/forms";
import { getCookie, setCookie } from "cookies-next";
import { FootnoteForm } from "@components/forms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, userLogIn } from "@services/apiUser";
import { RootState } from "@redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { BackwardOutlined, GoogleOutlined } from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { setLoggedIn } from "@redux/actions";
import { AuthForm } from "@components/forms/AuthForm";
import { setCompany, setRole, setSchool } from "@redux/slices/account";
import { Form, Input, Segmented } from "antd";
import { updateEducation } from "@services/apiSchool";
import { updateCompany } from "@services/apiCompany";
import { updateSchoolForAdvisor } from "@services/apiAdvisor";

//create a next page for the student home page, code below
const Registration: NextPage = () => {
  const router = useRouter();
  const [pwScreen, setScreen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<any>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [org, setOrg] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [r, setR] = useState<any>({
    isStudent: true,
    isAdvisor: false,
    isRecruiter: false,
  });
  const dispatch = useDispatch();
  const [rol, setRol] = useState<string>("Học sinh");
  const [selectRole, setSelectRole] = useState<boolean>(false);
  const state = useSelector((state: RootState) => state.account);

  const { data: session, status } = useSession();
  const mutation = useMutation({
    // queryKey: ["register"],
    mutationFn: registerUser,
    onSuccess: async (data) => {
      // Invalidate and refetch
      setCookie("cookieToken", data.message.token);
      setCookie("id", data.message.pk);
      setCookie("role", data.message.role);
      // localStorage.setItem("cookieToken", data.message.token);
      // localStorage.setItem("id", data.message.pk);
      // localStorage.setItem("role", data.message.role);
      if (r.isStudent) {
        mutationOrg.mutate({
          token: data.message.token,
          content: {
            title: "string",
            description: "string",
            school: org,
          },
        });
      } else {
        mutationOrg.mutate({
          token: data.message.token,
          content: {
            account: data.message.id,
            org: r.isRecruiter
              ? {
                  company: org,
                }
              : {
                  school: org,
                },
          },
        });
      }
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    },
  });
  const mutationOrg = useMutation({
    // queryKey: ["register"],
    mutationFn: r.isStudent
      ? updateEducation
      : r.isRecruiter
      ? updateCompany
      : updateSchoolForAdvisor,
    onSuccess: async (data) => {
      dispatch(setLoggedIn(true));
      const route = r.isStudent
        ? "/student"
        : r.isAdvisor
        ? "/advisor/jobs"
        : "/recruiter/jobs";
      router.replace(route).then(() => {
        router.reload();
      });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    },
  });
  if (status === "loading") return <h1> Đang tải ... </h1>;
  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {pwScreen && status !== "authenticated" ? (
            <>
              <div>
                <h1>Đăng ký</h1>
              </div>
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setScreen(false);
                }}
              >
                <BackwardOutlined /> Quay lại
              </p>
              <Form className="form" layout="vertical">
                {/* <div className="form-grid"> */}
                <Form.Item required label="Họ Tên" className="form-input">
                  <Input
                    required
                    className="form-item"
                    onChange={(event) => {
                      const fname = event.target.value.split(" ")[0];
                      const lname = event.target.value.split(" ")[1];
                      setFirstName(fname);
                      setLastName(lname);
                    }}
                  />
                </Form.Item>
              </Form>
              <AuthForm
                onSubmit={(item: { email: any; password: any }) => {
                  // setPassword(item.password);
                  // setEmail(item.email);
                  // setScreen(false);
                  const role =
                    rol == "Học sinh"
                      ? "student"
                      : rol == "Trường"
                      ? "advisor"
                      : "recruiter";
                  console.log(r);
                  dispatch(setRole(r));
                  mutation.mutate({
                    email: item.email,
                    password: item.password,
                    firstName,
                    lastName,
                    role,
                  });
                }}
                isLoading={mutation.isLoading}
                embedSignup={true}
              />
            </>
          ) : (
            <>
              <h1>Đăng ký</h1>
              <OrgForm
                onSubmit={(org) => {
                  setScreen(true);
                  setOrg(org);
                }}
                isLoading={mutation.isLoading || mutationOrg.isLoading}
              />
              <p
                style={{
                  cursor: "pointer",
                  color: "#1890ff",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  setSelectRole(true);
                }}
              >
                Là nhà tuyển dụng hoặc đại diện trường?
              </p>
              {selectRole && (
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
                    dispatch(setRole(role));
                  }}
                />
              )}
            </>
          )}
          {errorMessage && (
            <p className="register-content-error">{errorMessage}</p>
          )}
          <FootnoteForm type={""} />
        </div>
      </div>
    </div>
  );
};

export default Registration;

{
  /* <Button
                icon={<GoogleOutlined />}
                onClick={() => signIn("google")}
              >
                {" "}
                Đăng ký với Google{" "}
              </Button> */
}
{
  /* <SubmitButton onClick={()=>{
                  //logout google nextjs
                  signOut();
                }} text={"Log out"}/> */
}
