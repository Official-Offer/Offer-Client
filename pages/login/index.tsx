import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FootnoteForm, OrgForm } from "@components/forms";
import { deleteCookie, setCookie } from "cookies-next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  setRoleAndOrgToken,
  socialAuth,
  userLogIn,
} from "@services/apiUser";
import { useDispatch } from "react-redux";
import { Button, Segmented } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { AuthForm } from "@components/forms/AuthForm";
import { LoadingPage } from "@components/loading/LoadingPage";
import { setCompany, setCompanyId, setID, setRole } from "@redux/actions";

//create a next page for the student home page, code below
const Login: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [rol, setRol] = useState<string>("student");
  const [selectRole, setSelectRole] = useState<boolean>(false);
  const [org, setOrg] = useState<any>();
  const [tok, setToken] = useState<string>("");
  const [r, setR] = useState<any>({
    isStudent: true,
    isAdvisor: false,
    isRecruiter: false,
  });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: userLogIn,
    onSuccess: async (data) => {
      console.log(data);
      setCookie("cookieToken", data.access_token ? data.access_token : data.access ? data.access : data.token);
      setCookie("id", data.pk ? data.pk : data.id);
      setCookie("avatar", data.avatar)
      // dispatch(setID(data.id));
      if (data.role == "guest") {
        setSelectRole(true);
      } else {
        setCookie("role", data.role);
        setCookie("orgName", data.organization?.name ? data.organization?.name : "Name");
        setCookie("orgId", data.organization?.id ? data.organization?.id : "1");
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
      console.log(error.response.data.message);
      setErrorMessage("Sai tên đăng nhập hoặc mật khẩu");
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  const socialMutation = useMutation(["login"], {
    mutationFn: socialAuth,
    onSuccess: async (data) => {
      console.log("social login", data);
      // Invalidate and refetch
      setCookie("cookieToken", data.access_token ? data.access_token : data.access ? data.access : data.token);
      setToken(data.access_token ? data.access_token : data.access ? data.access : data.token);
      setCookie("id",  data.pk ? data.pk : data.id);
      setCookie("avatar", data.avatar)
      // dispatch(setID( data.pk ? data.pk : data.id));
      if (data.role == "guest") {
        setSelectRole(true);
      } else {
        setCookie("role", data.role);
        setCookie("orgName", data.organization?.name ? data.organization?.name : "Name");
        setCookie("orgId", data.organization?.id ? data.organization?.id : "1");
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
      console.log(error.response.data.message);
      // setErrorMessage(error.response.data.message);
      setErrorMessage("Email đã tồn tại hoặc lỗi đăng ký");
    },
  });

  const orgMutation = useMutation({
    mutationKey: ["roleAndOrg"],
    mutationFn: setRoleAndOrgToken,
    onSuccess: async (data) => {
      console.log(data);
      router
        .push({
          pathname:
            rol == "student"
              ? "/student"
              : rol == "advisor"
                ? "/advisor/jobs"
                : "/recruiter/jobs",
        })
        .then(() => {
          router.reload();
        });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      setErrorMessage("Lỗi chọn tổ chức");
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") { 
      //@ts-ignore
      const accessToken = session?.user?.accessToken;
      console.log("authenticated", accessToken);
      socialMutation.mutate({
        auth_token: accessToken,
      });
      // router.push("/student");
    }
  }, [status]);

  if (status === "loading") return <LoadingPage />;

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {!selectRole ? (
            <>
              <h1>Đăng nhập</h1>
              <br />
              <Button
                icon={<GoogleOutlined />}
                onClick={() => {
                  deleteCookie("cookieToken");
                  signIn("google");
                }}
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
                  console.log("org", org);
                  if (!org) {
                    setErrorMessage("Vui lòng điền thông tin cần thiết");
                    return;
                  }
                  setErrorMessage("");
                  setOrg(org);
                  setCookie("orgName", org.label);
                  setCookie("orgId", org.key);
                  dispatch(setCompany(org.label));
                  dispatch(setCompanyId(org.key));
                  setCookie("role", rol);
                  // dispatch(setRole(r));
                  orgMutation.mutate({
                    token: tok,
                    content: {
                      role: rol,
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
                    setRol(
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
                    setR(role);
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
          {errorMessage && (
            <p className="register-content-error">{errorMessage}</p>
          )}
          <FootnoteForm embedLogin={true} type={""} />
        </div>
      </div>
    </div>
  );
};

export default Login;
