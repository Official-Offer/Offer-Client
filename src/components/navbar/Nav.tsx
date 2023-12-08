import React, { ReactElement, useRef, useState } from "react";
import {
  DesktopOutlined,
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
import { deleteCookie, removeCookies } from "cookies-next";
import { signOut, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { userLogOut } from "@services/apiUser";
import { IconButton } from "@styles/styled-components/styledButton";

const { Sider } = Layout;

export const Nav: React.FC = (props: any): ReactElement => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  const isRecruiter =
    state.role.isRecruiter || router.pathname.includes("recruiter");
  const isAdvisor = state.role.isAdvisor || router.pathname.includes("advisor");
  const role = isRecruiter ? "recruiter" : "advisor";
  const { data: session, status } = useSession();
  const Navbar = dynamic(() =>
    import("@components").then((mod: any) => mod.Navbar),
  ) as any;
  const [collapsed, setCollapsed] = useState(false);
  const titles = [
    "Công việc",
    "Học sinh",
    isRecruiter ? "Trường" : "Công ty",
    "Tài khoản",
    "Đăng xuất",
  ];
  const path = [
    "/jobs",
    "/students",
    isRecruiter ? "/schools" : "/companies",
    "/profile",
    "/logout",
  ];
  const items: MenuProps["items"] = [
    SnippetsOutlined,
    TeamOutlined,
    DesktopOutlined,
    UserOutlined,
    UnlockOutlined,
  ].map((icon, index) => ({
    key: `/${role}${path[index]}`,
    icon: React.createElement(icon),
    label: titles[index],
    onClick: (e) => {
      if (index == 4) {
        if (status == "authenticated") {
          signOut().then(() => {
            router.push("/login");
          });
        } else {
          deleteCookie("cookieToken");
          deleteCookie("role");
          deleteCookie("id");
          router.push("/login").then(() => {
            // router.reload();
          });
        }
      } else {
        router.push(`/${role}${path[index]}`);
      }
    },
  }));

  console.log(router.pathname);

  if (
    router.pathname.includes("recruiter") ||
    router.pathname.includes("advisor")
  ) {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider className="navbar-sider">
            <div className="navbar-sider-logo">
              <Image src="/images/logo.png" width={40} height={40} alt="logo" />
            </div>
            <IconButton
              round
              className="table-add-btn"
              backgroundColor={"#D30B81"}
              style={{ margin: "auto", width: "150px", marginBottom: "10px" }}
              onClick={() => {
                router.push(`/${role}/postJobs/jobForm`);
              }}
            >
              <div className="table-add-btn-body">
                <span>Tạo công việc</span>
                <span>
                  <PlusOutlined />
                </span>
              </div>
            </IconButton>
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
            <div>{props.children}</div>
          </Layout>
        </Layout>
      </div>
    );
  }
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
