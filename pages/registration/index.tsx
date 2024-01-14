import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { OrgForm } from "@components/forms";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { FootnoteForm } from "@components/forms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, socialAuth, userLogIn } from "@services/apiUser";
import { RootState } from "@redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { BackwardOutlined, GoogleOutlined } from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { setCompanyId, setLoggedIn } from "@redux/actions";
import { AuthForm } from "@components/forms/AuthForm";
import { setCompany, setRole, setSchool } from "@redux/slices/account";
import { Alert, Button, Form, Input, Segmented, Space, notification } from "antd";
import { LoadingPage } from "@components/loading/LoadingPage";
type NotificationType = "success" | "info" | "warning" | "error";

//create a next page for the student home page, code below
const Registration: NextPage = () => {
  const router = useRouter();
  const [pwScreen, setScreen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [org, setOrg] = useState<any>();
  const [roleBool, setRoleBool] = useState<any>({
    isStudent: true,
    isAdvisor: false,
    isRecruiter: false,
  });
  const dispatch = useDispatch();
  const [roleStr, setRoleStr] = useState<string>("Học sinh");
  const [selectRole, setSelectRole] = useState<boolean>(false);
  // const state = useSelector((state: RootState) => state.account);
  const [api, contextHolder] = notification.useNotification();
  const { data: session, status } = useSession();
  // console.log("data", session);
  // console.log("status", status);
  const openNotification = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message,
      description,
    });
  };

  useEffect(() => {
    if (errorMessage !== "") {
      openNotification("error", "Đăng ký thất bại", errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

  const socialMutation = useMutation(["socialLogin"], {
    mutationFn: socialAuth,
    onSuccess: async (data: any) => {
      // console.log(data);
      // Invalidate and refetch
      setCookie(
        "cookieToken",
        data.access_token
          ? data.access_token
          : data.access
            ? data.access
            : data.token,
      );
      // console.log(data.access);
      setCookie("id", data.pk ? data.pk : data.id);
      setCookie("role", data.role);
      setCookie("orgLogo", data.organization?.logo);
      setCookie("orgName", data.organization?.name);
      dispatch(setLoggedIn(true));
      // openNotification("success", "Đăng nhập thành công", "");
      router
        .push(
          data.role == "student"
            ? "/student"
            : data.role == "advisor"
              ? "/advisor/jobs"
              : "/recruiter/jobs",
        )
        .then(() => {
          router.reload();
        });
    },
    onError: (error: any) => {
      setErrorMessage("Email đã tồn tại hoặc lỗi đăng ký");

      openNotification(
        "error",
        "Đăng ký thất bại",
        "Email đã tồn tại hoặc lỗi đăng ký",
      );
      // console.log(error.response.data.message);
      // setErrorMessage(error.response.data.message);
    },
  });

  const mutation = useMutation(["register"], registerUser, {
    onSuccess: async (data) => {
      // Invalidate and refetch
      setCookie(
        "cookieToken",
        data.message.access_token
          ? data.message.access_token
          : data.message.access
            ? data.message.access
            : data.message.token,
      );
      setCookie("id", data.message.pk ? data.message.pk : data.message.id);
      setCookie("role", data.message.role);
      setCookie("orgLogo", data.message.organization?.logo);
      setCookie("orgId", org.key);
      setCookie("orgName", org.label);
      dispatch(setCompanyId(org.key));
      dispatch(setCompany(org.label));
      if (status !== "authenticated") {
        router.push("/registration/verifyEmail").then(() => {
          router.reload();
        });
      } else {
        router.push(
          roleBool.isStudent
            ? "/student"
            : roleBool.isAdvisor
              ? "/advisor/jobs"
              : "/recruiter/jobs",
        );
      }
    },
    onError: (error: any) => {
      openNotification(
        "error",
        "Đăng ký thất bại",
        "Email đã tồn tại hoặc lỗi đăng ký",
      );
      // console.log(error.response.data.message);
      // setErrorMessage(error.response.data.message);
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      const role = getCookie("role");
      const orgId = Number(getCookie("orgId"));
      socialMutation.mutate({
        //@ts-ignore
        auth_token: session?.user?.accessToken,
        role,
        org_id: orgId,
      });
      // router.push("/student");
    }
  }, [status]);

  if (status === "loading") return <LoadingPage />;

  return status == "authenticated" && !errorMessage && !pwScreen ? (
    <LoadingPage />
  ) : (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {pwScreen ? (
            // && status !== "authenticated"
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
                  setErrorMessage("");
                }}
              >
                <BackwardOutlined /> Quay lại
              </p>
              {/* Add google sign in button below */}
              <Button
                className="sso-btn"
                icon={<GoogleOutlined />}
                onClick={() => {
                  const role =
                    roleStr == "Học sinh"
                      ? "student"
                      : roleStr == "Trường"
                        ? "advisor"
                        : "recruiter";
                  setCookie("role", role);
                  setCookie("orgName", org.label);
                  dispatch(setCompany(org.label));
                  dispatch(setCompanyId(org.key));
                  setCookie("orgId", org.key);
                  deleteCookie("cookieToken");
                  signIn("google");
                }}
              >
                {" "}
                Đăng ký với Google{" "}
              </Button>
              <Form className="form form-margin" layout="vertical">
                <Form.Item required label="Họ Tên" className="form-input">
                  <Input
                    required
                    className="form-item"
                    onChange={(event) => {
                      const name = event.target.value.split(" ")
                      const lname = name.pop() || " "
                      const fname = name.join(" ") || " "
                      setFirstName(fname);
                      setLastName(lname);
                    }}
                    status={errorMessage === "Vui lòng điền tên đầy đủ" ? "error" : ""}
                  />
                </Form.Item>
              </Form>
              <AuthForm
                onSubmit={(item: { email: any; password: any; error: any }) => {
                  if (!item) {
                    setErrorMessage("Vui lòng điền thông tin cần thiết");
                    return;
                  }
                  if (!firstName && !lastName) {
                    setErrorMessage("Vui lòng điền tên đầy đủ");
                    return;
                  }
                  if (item.error) {
                    setErrorMessage(item.error);
                    return;
                  }
                  const role =
                    roleStr == "Học sinh"
                      ? "student"
                      : roleStr == "Trường"
                        ? "advisor"
                        : "recruiter";
                        // console.log(roleBool);
                        dispatch(setRole(roleBool));
                        mutation.mutate({
                          email: item.email,
                          password: item.password,
                          first_name: firstName,
                          last_name: lastName,
                          role,
                          org_id: Number(org.key),
                        });
                }}
                isLoading={mutation.isLoading}
                embedSignup={true}
              />
            </>
          ) : (
            <>
              <h1>Đăng ký</h1>
              <p>Bạn là</p>
              <Segmented
                options={["Học sinh", "Nhà tuyển dụng", "Trường"]}
                size={"large"}
                onChange={(value) => {
                  // console.log("value", value)
                  setRoleStr(value.toString());
                  const role = {
                    isStudent: value.toString() == "Học sinh",
                    isAdvisor: value.toString() == "Trường",
                    isRecruiter: value.toString() == "Nhà tuyển dụng",
                  };
                  setRoleBool(role);
                  dispatch(setRole(role));
                }}
              />
              <OrgForm
                onSubmit={(org) => {
                  // console.log("org", org);
                  if (!org) {
                    setErrorMessage("Vui lòng điền thông tin cần thiết");
                    return;
                  }
                  setErrorMessage("");
                  setOrg(org);
                  setScreen(true);
                }}
                isLoading={mutation.isLoading}
              />
              {/* <p
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
              )} */}
            </>
          )}
          {/* {errorMessage && status !== "authenticated" && (
            <Alert message={errorMessage} type="error" />
            // <p className="register-content-error">{errorMessage}</p>
          )} */}
          {contextHolder}
          {/* <Button
            onClick={() => {
              signOut();
            }}
          >
            Dang Xuat
          </Button> */}
          <FootnoteForm type={""} />
        </div>
      </div>
    </div>
  );
};

export default Registration;
