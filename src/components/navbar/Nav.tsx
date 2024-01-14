import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  DesktopOutlined,
  LockOutlined,
  PlusOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import router, { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import Image from "next/image";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { signOut, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { userLogOut } from "@services/apiUser";
import { IconButton } from "@styles/styled-components/styledButton";
import { get, set } from "lodash";
import { FastAverageColor } from "fast-average-color";
const { Sider } = Layout;

export const Nav: React.FC = (props: any): ReactElement => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  const r = getCookie("role");
  const isRecruiter = r == "recruiter" || router.pathname.includes("recruiter");

  const isAdvisor = r == "advisor" || router.pathname.includes("advisor");

  const conflict =
    (router.pathname.includes("recruiter") && r == "advisor") ||
    (router.pathname.includes("advisor") && r == "recruiter") ||
    (router.pathname.includes("student") && r == "recruiter") ||
    (router.pathname.includes("student") && r == "advisor");
  const { data: session, status } = useSession();
  const loggedIn = (!!getCookie("cookieToken") || status == "authenticated") && !conflict;
  const role = isRecruiter ? "recruiter" : "advisor";
  const Navbar = dynamic(() => import("@components").then((mod: any) => mod.Navbar)) as any;
  const [collapsed, setCollapsed] = useState(false);
  const titles = [
    "Công việc",
    "Học sinh",
    isRecruiter ? "Trường" : "Công ty",
    "Tài khoản",
    loggedIn ? "Đăng xuất" : "Đăng nhập",
  ];
  const path = [
    "/jobs",
    "/studs",
    isRecruiter ? "/schools" : "/companies",
    "/profile",
    loggedIn ? "/logout" : "/login",
  ];
  const items: MenuProps["items"] = [
    SnippetsOutlined,
    TeamOutlined,
    DesktopOutlined,
    UserOutlined,
    loggedIn ? UnlockOutlined : LockOutlined,
  ].map((icon, index) => ({
    key: `/${role}${path[index]}`,
    icon: React.createElement(icon),
    label: titles[index],
    onClick: (e) => {
      if (index == 4) {
        if (status == "authenticated") {
          deleteCookie("cookieToken");
          deleteCookie("role");
          deleteCookie("id");
          router.push("/login").then(() => {
            signOut();
          });
        } else {
          deleteCookie("cookieToken");
          deleteCookie("role");
          deleteCookie("id");
          router.push("/login").then(() => {
            router.reload();
          });
        }
      } else {
        router.push(`/${role}${path[index]}`);
      }
    },
  }));
  const [orgLogoColor, setOrgLogoColor] = useState("#FFF");
  const orgLogo = getCookie("orgLogo")?.toString() || "";

  const fac = new FastAverageColor();
  const orgLogoRef = useRef(null);
  useEffect(() => {
    if (orgLogoRef.current) {
      fac
        .getColorAsync(orgLogoRef.current, { algorithm: "dominant" })
        .then((color) => {
          setOrgLogoColor(color.hex);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [orgLogoRef.current]);

  
  if (router.pathname.includes("recruiter") || router.pathname.includes("advisor")) {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider className="navbar-sider">
            <div className="navbar-sider-logo">
              <Image
                src={orgLogo || "/images/logo.png"}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", maxWidth: "100px", maxHeight: "120px" }}
                alt="logo"
                ref={orgLogoRef}
              />
            </div>
            {isRecruiter ? (
              <IconButton
                round
                className="table-add-btn"
                backgroundColor={"#D30B81"}
                style={{ margin: "auto", width: "150px", marginBottom: "10px" }}
                onClick={() => {
                  router.push(`/${role}/postJobs/orgSelect`);
                }}
              >
                <div className="table-add-btn-body">
                  <span>Tạo công việc</span>
                  <span>
                    <PlusOutlined />
                  </span>
                </div>
              </IconButton>
            ) : (
              // Create an instance of FastAverageColor

              // Use the orgLogoColor as the background color
              <IconButton
                round
                className="table-add-btn"
                backgroundColor={orgLogoColor}
                style={{
                  margin: "auto",
                  width: "fit-content",
                  marginBottom: "10px",
                  borderRadius: "10px",
                }}
              >
                <div className="table-add-btn-body">
                  <span>Profile</span>
                </div>
              </IconButton>
            )}
            <Menu
              defaultSelectedKeys={[`/${role}`]}
              // defaultOpenKeys={[isAdvisor ? `/${role}/jobs` : ``]}
              selectedKeys={[router.pathname]}
              mode="inline"
              inlineCollapsed={collapsed}
              items={items}
            />
          </Sider>
          <Layout className="navbar-with-sider">
            {loggedIn ? (
              <div>{props.children}</div>
            ) : (
              <div style={{ margin: "auto", marginTop: "100px" }}>
                Bạn cần đăng nhập để sử dụng chức năng này{" "}
                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Đăng nhập
                </Button>
              </div>
            )}
          </Layout>
        </Layout>
      </div>
    );
  }
  // else if (
  //   router.pathname !== "/student" &&
  //   router.pathname !== "/student/contact" &&
  //   !router.pathname.includes("login") &&
  //   !router.pathname.includes("registration") &&
  //   !loggedIn
  // ) {
  //   router.push("/login");
  //   <div style={{ margin: "auto", marginTop: "100px" }}>
  //     Bạn cần đăng nhập để sử dụng chức năng này{" "}
  //     <Button
  //       onClick={() => {
  //         router.push("/login");
  //       }}
  //     >
  //       Đăng nhập
  //     </Button>
  //   </div>;
  // }
  return (
    <>
      <Navbar
        searchBarHidden={
          router.pathname.includes("/student/jobs") ||
          router.pathname.includes("/student/events/[id]")
        }
      />
      <div>{props.children}</div>
    </>
  );
};
