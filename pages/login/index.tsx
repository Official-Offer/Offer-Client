import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FootnoteForm, OrgForm } from "@components/forms";
import { deleteCookie, setCookie } from "cookies-next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setRoleAndOrgToken, socialAuth, userLogIn } from "@services/apiUser";
import { useDispatch } from "react-redux";
import { Alert, Button, Segmented, notification } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { AuthForm } from "@components/forms/AuthForm";
import { LoadingPage } from "@components/loading/LoadingPage";
import { setCompany, setCompanyId, setID, setRole } from "@redux/actions";
type NotificationType = "success" | "info" | "warning" | "error";

//create a next page for the student home page, code below
const Login: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [roleStr, setRoleStr] = useState<string>("student");
  const [selectRole, setSelectRole] = useState<boolean>(false);
  const [org, setOrg] = useState<any>();
  const [tok, setToken] = useState<string>("");
  const [roleBool, setRoleBool] = useState<any>({
    isStudent: true,
    isAdvisor: false,
    isRecruiter: false,
  });
  const openNotification = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message,
      description,
    });
  };
  const [api, contextHolder] = notification.useNotification();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: userLogIn,
    onSuccess: async (data) => {
      // console.log(data);
      setCookie(
        "cookieToken",
        data.access_token ? data.access_token : data.access ? data.access : data.token
      );
      setCookie("id", data.pk ? data.pk : data.id);
      setCookie("avatar", data.avatar);
      // dispatch(setID(data.id));
      if (data.role == "guest") {
        setSelectRole(true);
      } else {
        setCookie("role", data.role);
        setCookie("orgName", data.organization?.name ? data.organization?.name : "Name");
        setCookie("orgId", data.organization?.id ? data.organization?.id : "1");
        setCookie("orgLogo", data.organization?.logo);
        dispatch(setCompany(data.organization?.name ? data.organization?.name : "Name"));
        dispatch(setCompanyId(data.organization?.id ? data.organization?.id : "1"));
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
      }
    },
    onError: (error: any) => {
      // console.log(error.response.data.message);
      setErrorMessage("Sai tên đăng nhập hoặc mật khẩu");
      openNotification("error", "Lỗi đăng nhập", "Sai tên đăng nhập hoặc mật khẩu");
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  const socialMutation = useMutation(["login"], {
    mutationFn: socialAuth,
    onSuccess: async (data) => {
      // console.log("social login", data);
      // Invalidate and refetch
      setCookie(
        "cookieToken",
        data.access_token ? data.access_token : data.access ? data.access : data.token
      );
      setToken(data.access_token ? data.access_token : data.access ? data.access : data.token);
      setCookie("id", data.pk ? data.pk : data.id);
      // dispatch(setID( data.pk ? data.pk : data.id));
      if (data.role == "guest") {
        setSelectRole(true);
      } else {
        setCookie("role", data.role);
        setCookie("orgName", data.organization?.name ? data.organization?.name : "Name");
        setCookie("orgId", data.organization?.id ? data.organization?.id : "1");
        setCookie("orgLogo", data.organization?.logo);
        dispatch(setCompany(data.organization?.name ? data.organization?.name : "Name"));
        dispatch(setCompanyId(data.organization?.id ? data.organization?.id : "1"));
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
      }
    },
    onError: (error: any) => {
      setErrorMessage("Email đã tồn tại hoặc lỗi đăng ký google");
      openNotification("error", "Lỗi đăng nhập", "Email đã tồn tại hoặc lỗi đăng ký google");
      // console.log(error.response.data.message);
      // setErrorMessage(error.response.data.message);
    },
  });

  const orgMutation = useMutation({
    mutationKey: ["roleAndOrg"],
    mutationFn: setRoleAndOrgToken,
    onSuccess: async (data) => {
      // console.log(data);
      router
        .push({
          pathname:
            roleStr == "student" ? "/student" : roleStr == "advisor" ? "/advisor/jobs" : "/recruiter/jobs",
        })
        .then(() => {
          router.reload();
        });
    },
    onError: (error: any) => {
      setErrorMessage("Lỗi chọn tổ chức");
      openNotification("error", "Lỗi chọn tổ chức", "Vui lòng chọn tổ chức");
      // console.log(error.response.data.message);
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      //@ts-ignore
      const accessToken = session?.user?.accessToken;
      // console.log("authenticated", accessToken);
      socialMutation.mutate({
        auth_token: accessToken,
      });
      // router.push("/student");
    }
  }, [status]);

  console.log(status, errorMessage, selectRole);
  if (status === "loading") return <LoadingPage />;
  return status == "authenticated" && !errorMessage && !selectRole ? (
    <LoadingPage />
  ) : (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {!selectRole ? (
            <>
              <h1>Đăng nhập</h1>
              <Button
                icon={<GoogleOutlined />}
                onClick={() => {
                  deleteCookie("cookieToken");
                  signIn("google");
                }}
                className="sso-btn"
              >
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
            </>
          ) : (
            <>
              <h1>Chọn tổ chức và vai trò</h1>
              <OrgForm
                onSubmit={(org: any) => {
                  // console.log("org", org);
                  if (!org) {
                    openNotification("error", "Lỗi chọn tổ chức", "Vui lòng chọn tổ chức");
                    return;
                  }
                  setErrorMessage("");
                  setOrg(org);
                  setCookie("orgName", org.label);
                  setCookie("orgId", org.key);

                  dispatch(setCompany(org.label));
                  dispatch(setCompanyId(org.key));
                  setCookie("role", roleStr);
                  // dispatch(setRole(roleBool));
                  orgMutation.mutate({
                    token: tok,
                    content: {
                      role: roleStr,
                      org_id: Number(org.key),
                    },
                  });
                  // setScreen(true);
                }}
                isLoading={orgMutation.isLoading}
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
                  size={"large"}
                  onChange={(value) => {
                    setRoleStr(
                      value.toString() == "Học sinh"
                        ? "student"
                        : value.toString() == "Nhà tuyển dụng"
                          ? "recruiter"
                          : "advisor"
                    );
                    const role = {
                      isStudent: value.toString() == "Học sinh",
                      isAdvisor: value.toString() == "Trường",
                      isRecruiter: value.toString() == "Nhà tuyển dụng",
                    };
                    setRoleBool(role);
                    dispatch(setRole(role));
                  }}
                />
              )}
            </>
          )}
          {/* <Button
            onClick={() => {
              signOut();
            }}
          >
            Dang Xuat
          </Button> */}
          {/* {errorMessage && status !== "authenticated" && (
            <Alert message={errorMessage} type="error" />
            // <p className="register-content-error">{errorMessage}</p>
          )} */}
          {contextHolder}
          <FootnoteForm embedLogin={true} type={""} />
        </div>
      </div>
    </div>
  );
};

export default Login;
